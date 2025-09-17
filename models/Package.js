import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';

const headerSchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true, min: 1 },
  nights: { type: Number, required: true, min: 0 },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  }
});

const itinerarySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
    min: 1
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
});

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rate: { type: Number, default: 0 },
  header: headerSchema,
  packageType: { type: mongoose.Schema.Types.ObjectId, ref: 'PackageType', required: true },
  itinerary: [itinerarySchema],
  includes: [{
    type: String,
    trim: true
  }],
  excludes: [{
    type: String,
    trim: true
  }],
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  imageCover: String,
  images: [String],
  description: { type: String, required: true },
  descText: {
    type: String,
    trim: true
  },
  slug: { type: String, unique: true },
  alt: { type: String, trim: true },
  seo: {
    metaTitle: { type: String, trim: true, maxlength: 60 },
    metaDescription: { type: String, trim: true, maxlength: 160 },
    keywords: { type: String, trim: true },
    slugUrl: { type: String, trim: true, unique: true, sparse: true },
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
}, {
  timestamps: true
});

packageSchema.index({ country: 1, city: 1 });
packageSchema.index({ packageType: 1 });
packageSchema.index({ price: 1 });
packageSchema.index({ 'name': 'text', 'description': 'text' });

packageSchema.pre('save', async function (next) {
  if (this.isModified('name') && this.name) {
    this.slug = await generateSlug(this.name, this.constructor);
  }

  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }
  next();
});

export default mongoose.model('Package', packageSchema);