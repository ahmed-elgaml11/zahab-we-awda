import mongoose from 'mongoose';

import { monthOptions, timeOptions } from '../schema/countrySchema.js';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  favTime: {
    type: [String],
    enum: timeOptions,
    default: undefined, // Optional field
  },
  favMonth: {
    type: [String],
    enum: monthOptions,
    default: undefined,
  }, weather: {
    currentTemp: Number,
    condition: String,
    humididy: Number,
    windSpeed: Number,
    isAutoUpdate: { type: Boolean, default: true }
  },
  imageCover: String,
  images: [String],
}, {
  timestamps: true
});

citySchema.index({ country: 1, isActive: 1 });
citySchema.index({ isPopular: 1 });
citySchema.index({ 'name.en': 'text', 'name.ar': 'text' });
citySchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });

export default mongoose.model('City', citySchema);