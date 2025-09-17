import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';

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
  descText: {
    type: String,
    trim: true
  },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  favTime: {
    type: [String],
    enum: timeOptions,
    default: undefined,
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
  slug: { type: String, unique: true },
  alt: { type: String, trim: true },
  seo: {
    metaTitle: { type: String, trim: true, maxlength: 60 },
    metaDescription: { type: String, trim: true, maxlength: 160 },
    keywords: { type: String, trim: true },
    slugUrl: { type: String, trim: true, sparse: true },
    priority: { type: Number },
    changeFrequency: {
      type: String,
      enum: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'],
      default: 'monthly'
    },
    noIndex: { type: Boolean, default: false },
    noFollow: { type: Boolean, default: false },
    noArchive: { type: Boolean, default: false },
    noSnippet: { type: Boolean, default: false },
    ogTitle: { type: String, trim: true, maxlength: 60 },
    ogDescription: { type: String, trim: true, maxlength: 160 },
    ogImage: { type: String, trim: true }
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},
  {
    timestamps: true,
  }
);





citySchema.index({ country: 1, isActive: 1 });
citySchema.index({ isPopular: 1 });




citySchema.pre('save', async function (next) {
  if (this.isModified('name') && this.name) {
    this.slug = await generateSlug(this.name, this.constructor);
  }

  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }
  next();
});

export default mongoose.model('City', citySchema);