// import WeatherService from '../services/weatherService.js';
// import { successResponse, errorResponse } from '../utils/responseHandler.js';

// export const getCityWeather = async (req, res) => {
//     try {
//         const { cityId } = req.params;
//         const { details } = req.query;

//         const weatherData = await WeatherService.getWeatherForCity(cityId);
        
//         if (!weatherData) {
//         return errorResponse(res, 'Weather data not available for this city', 404);
//         }

//         const formattedWeather = WeatherService.formatWeatherResponse(
//         weatherData, 
//         details === 'true'
//         );

//         successResponse(res, 'Weather data retrieved successfully', {
//         weather: formattedWeather,
//         city: weatherData.city
//         });
//     } catch (error) {
//         errorResponse(res, 'Error fetching weather data', 500);
//     }
// };

// export const getMultipleCitiesWeather = async (req, res) => {
//     try {
//         const { cityIds } = req.body;
//         const { details } = req.query;

//         if (!cityIds || !Array.isArray(cityIds) || cityIds.length === 0) {
//         return errorResponse(res, 'Please provide an array of city IDs', 400);
//         }

//         if (cityIds.length > 20) {
//         return errorResponse(res, 'Maximum 20 cities allowed per request', 400);
//         }

//         const weatherResults = await WeatherService.getWeatherForCities(cityIds);
        
//         const response = weatherResults.map(result => ({
//         cityId: result.cityId,
//         weather: result.weather ? 
//             WeatherService.formatWeatherResponse(result.weather, details === 'true') : 
//             null,
//         error: result.error
//         }));

//         successResponse(res, 'Weather data retrieved for multiple cities', response);
//     } catch (error) {
//         errorResponse(res, 'Error fetching weather data for multiple cities', 500);
//     }
// };

// export const forceWeatherUpdate = async (req, res) => {
//     try {
//         const { cityId } = req.params;

//         // Invalidate any existing weather data for this city
//         await Weather.deleteMany({ city: cityId });

//         const weatherData = await WeatherService.getWeatherForCity(cityId);
        
//         if (!weatherData) {
//         return errorResponse(res, 'Failed to fetch weather data', 500);
//         }

//         const formattedWeather = WeatherService.formatWeatherResponse(weatherData, true);
        
//         successResponse(res, 'Weather data force-updated successfully', {
//         weather: formattedWeather,
//         city: weatherData.city
//         });
//     } catch (error) {
//         errorResponse(res, 'Error force-updating weather data', 500);
//     }
// };