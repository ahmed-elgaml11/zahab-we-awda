import { z } from 'zod';
import mongoose from 'mongoose';
import { imageSchema } from './imageSchema.js';

const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const serviceSchema = z.object({
  name: z.string().min(1).trim(),
  imageCover: z.url().optional(),
  description: z.string().optional(),
  descText: z.string().optional(),
  method: z.string().optional(),
  summary: z.string().optional(),
  seo: z.object({
    metaTitle: z.string().trim().max(60).optional(),
    metaDescription: z.string().trim().max(160).optional(),
    keywords: z.string().trim().optional(),
    slugUrl: z.string().trim().optional(),
    priority: z.number().optional(),
    changeFrequency: z.enum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']).default('monthly'),
    noIndex: z.boolean().default(false),
    noFollow: z.boolean().default(false),
    noArchive: z.boolean().default(false),
    noSnippet: z.boolean().default(false),
    ogTitle: z.string().trim().max(60).optional(),
    ogDescription: z.string().trim().max(160).optional(),
    ogImage: z.string().trim().optional(),
    alt: z.string().optional(),
  }).optional(),
  createdBy: objectIdString
});


export const serviceUpdateSchema = serviceSchema.optional()