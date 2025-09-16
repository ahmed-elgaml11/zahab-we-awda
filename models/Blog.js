import mongoose from "mongoose";
import { generateSlug } from '../utils/slugifyHelper.js';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    descText: { type: String, trim: true },
    description: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    imageCover: { type: String },
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

blogSchema.pre('save', function (next) {
  if (this.isModified('name') && this.name) {
    this.slug = generateSlug(this.name);
  }

  if (!this.alt && this.name) {
    this.alt = `${this.name} - Package`;
  }
  next();
});


export default mongoose.model("Blog", blogSchema);
