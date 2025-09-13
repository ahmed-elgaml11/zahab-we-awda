import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true, trim: true },
    ar: { type: String, required: true, trim: true }
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  description: {
    en: String,
    ar: String
  },
  population: Number,
  timezone: String,
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  weather: {
    lastFetched: Date,
    isAutoUpdate: { type: Boolean, default: true }
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  metaTitle: {
    en: String,
    ar: String
  },
  metaDescription: {
    en: String,
    ar: String
  }
}, {
  timestamps: true
});

citySchema.index({ country: 1, isActive: 1 });
citySchema.index({ isPopular: 1 });
citySchema.index({ 'name.en': 'text', 'name.ar': 'text' });
citySchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });

export default mongoose.model('City', citySchema);