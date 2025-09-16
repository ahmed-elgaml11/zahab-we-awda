// countrySchema.ts
import { z } from 'zod';
export const timeOptions = ["morning", "afternoon", "evening", "night"];
export const monthOptions = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const countrySchema = z.object({
  name: z.string().min(1).trim(),
  code: z.string().length(3).toUpperCase(),
  continent: z.string().min(1),
  currency: z.string().min(1),
  favTime: z.array(z.enum(timeOptions)).optional(),
  favMonth: z.array(z.enum(monthOptions)).optional(),
  language: z.string().min(1),
  description: z.string().min(1),
  descText: z.string().optional(),
  isActive: z.boolean().default(true),
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


export const countryUpdateSchema = countrySchema.partial()