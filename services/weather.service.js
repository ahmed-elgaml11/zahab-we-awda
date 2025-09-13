import axios from 'axios';
import Weather from '../models/Weather.js';
import City from '../models/City.js';

class WeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY;
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
  }

  async getWeatherForCity(cityId) {
    try {
      // Check if we have recent weather data (less than 1 hour old)
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const existingWeather = await Weather.findOne({
        city: cityId,
        lastUpdated: { $gte: oneHourAgo }
      }).sort({ lastUpdated: -1 });

      if (existingWeather) {
        return existingWeather;
      }

      // Fetch city data with coordinates
      const city = await City.findById(cityId);
      if (!city || !city.coordinates || !city.coordinates.lat || !city.coordinates.lng) {
        throw new Error('City coordinates not found');
      }

      // Fetch fresh weather data
      const weatherData = await this.fetchFromAPI(city.coordinates.lat, city.coordinates.lng);
      
      // Save to database
      const weather = new Weather({
        city: cityId,
        temperature: {
          current: Math.round(weatherData.main.temp - 273.15), // Convert Kelvin to Celsius
          feelsLike: Math.round(weatherData.main.feels_like - 273.15),
          min: Math.round(weatherData.main.temp_min - 273.15),
          max: Math.round(weatherData.main.temp_max - 273.15)
        },
        condition: {
          main: weatherData.weather[0].main,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon
        },
        humidity: weatherData.main.humidity,
        wind: {
          speed: weatherData.wind.speed,
          direction: weatherData.wind.deg
        },
        pressure: weatherData.main.pressure,
        visibility: weatherData.visibility,
        sunrise: new Date(weatherData.sys.sunrise * 1000),
        sunset: new Date(weatherData.sys.sunset * 1000),
        lastUpdated: new Date()
      });

      await weather.save();

      // Update city's lastFetched timestamp
      await City.findByIdAndUpdate(cityId, {
        'weather.lastFetched': new Date()
      });

      return weather;
    } catch (error) {
      console.error('Error fetching weather for city:', cityId, error);
      
      // Return stale data if available (less than 6 hours old)
      const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
      const staleWeather = await Weather.findOne({
        city: cityId,
        lastUpdated: { $gte: sixHoursAgo }
      }).sort({ lastUpdated: -1 });

      return staleWeather || null;
    }
  }

  async fetchFromAPI(lat, lng) {
    if (!this.apiKey) {
      throw new Error('OpenWeather API key not configured');
    }

    const response = await axios.get(`${this.baseURL}/weather`, {
      params: {
        lat,
        lon: lng,
        appid: this.apiKey,
        units: 'metric' // Get data in metric units
      }
    });

    return response.data;
  }

  async getWeatherForCities(cityIds) {
    const weatherPromises = cityIds.map(cityId => this.getWeatherForCity(cityId));
    const results = await Promise.allSettled(weatherPromises);
    
    return results.map((result, index) => ({
      cityId: cityIds[index],
      weather: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason.message : null
    }));
  }

  // Method to get weather icon URL
  getWeatherIconUrl(iconCode, size = '2x') {
    return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
  }

  // Method to format weather for response
  formatWeatherResponse(weatherData, includeDetails = false) {
    if (!weatherData) return null;

    const baseResponse = {
      temperature: {
        current: weatherData.temperature.current,
        feelsLike: weatherData.temperature.feelsLike,
        min: weatherData.temperature.min,
        max: weatherData.temperature.max
      },
      condition: {
        main: weatherData.condition.main,
        description: weatherData.condition.description,
        icon: this.getWeatherIconUrl(weatherData.condition.icon),
        iconUrl: this.getWeatherIconUrl(weatherData.condition.icon, '4x')
      },
      humidity: weatherData.humidity,
      wind: {
        speed: weatherData.wind.speed,
        direction: weatherData.wind.direction
      },
      lastUpdated: weatherData.lastUpdated
    };

    if (includeDetails) {
      baseResponse.pressure = weatherData.pressure;
      baseResponse.visibility = weatherData.visibility;
      baseResponse.sunrise = weatherData.sunrise;
      baseResponse.sunset = weatherData.sunset;
    }

    return baseResponse;
  }
}

export default new WeatherService();