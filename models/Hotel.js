import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true
    },
    rating: {
      type: Number,
    },
    category: {
      type: String,
    },
    roomNumber: {
      type: Number,
    },
    roomType: {
      type: String,
    },
    description: {
      type: String,
    },
    descText: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      min: {
        type: String,
        required: true,
      },
      max: {
        type: String,
        required: true,
      },
    },
    imageCover: {
      type: String,
    },
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



hotelSchema.pre('save', function (next) {
  if (this.isModified('name') && this.name) {
    this.slug = generateSlug(this.name);
  }

  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }
  next();
});

export default mongoose.model('Hotel', hotelSchema);
