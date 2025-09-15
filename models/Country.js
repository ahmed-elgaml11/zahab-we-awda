import mongoose from 'mongoose';
import { imageSchema } from './Image.js';


import { monthOptions, timeOptions } from '../schema/countrySchema.js';

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    maxlength: 3
  },
  continent: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  imageCover: {
    type: String,
  },
  favTime: {
    type: [String],
    enum: timeOptions,
  },
  favMonth: {
    type: [String],
    enum: monthOptions,
  },
  images: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  packageType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PackageType',
  },
  metaTitle: String,
  metaDescription: String
}, {
  timestamps: true
});

countrySchema.index({ 'name': 'text', 'continent': 'text', 'language': 'text' });
countrySchema.index({ isActive: 1 });

export default mongoose.model('Country', countrySchema);