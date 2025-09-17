import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';


import { monthOptions, timeOptions } from '../schema/countrySchema.js';

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
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
  },
  language: {
    type: String,
  },
  description: {
    type: String,
  },
  descText: {
    type: String,
    trim: true
  },
  favTime: {
    type: [String],
    enum: timeOptions,
  },
  favMonth: {
    type: [String],
    enum: monthOptions,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  images: [String],
  imageCover: {
    type: String,
  },
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



countrySchema.virtual('cities', {
  ref: 'City',
  localField: '_id',
  foreignField: 'country'
});

countrySchema.pre('save', async function (next) {
  if (this.isModified('name') && this.name) {
    this.slug = await generateSlug(this.name, this.constructor);
  }

  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }
  next();
});

countrySchema.index({ 'name': 'text', 'continent': 'text', 'language': 'text' });
countrySchema.index({ isActive: 1 });

export default mongoose.model('Country', countrySchema);