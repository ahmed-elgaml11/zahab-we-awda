// hotelSchema.ts
import { z } from 'zod';

const objectIdString = z.string().refine(val => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const hotelSchema = z.object({
  name: z.string().min(1),
  country: objectIdString,
  city: objectIdString,
  rating: z.number().min(0).max(5),
  category: z.string().optional(),
  roomNumber: z.number().int().positive().optional(),
  roomType: z.string().optional(),
  description: z.string().min(1),
  descText: z.string().optional(),
  isActive: z.boolean().default(true),
  phone: z.string().optional(),
  email: z.email().optional(),
  website: z.url().optional(),
  address: z.string().min(1),
  price: z.object({
    min: z.string().min(1),
    max: z.string().min(1),
  }),
  imageCover: z.string().optional(),
  images: z.array(z.string()).optional(),
  alt: z.string().optional(),
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
  }).optional(),
});




export const hotelUpdateSchema = hotelSchema.partial();
