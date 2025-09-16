import { z } from 'zod';

export const packageTypeSchema = z.object({
  name: z.string().min(1).trim(),
  imageCover: z.string().optional(),
  description: z.string().optional(),
  descText: z.string().optional(),
  isActive: z.boolean().default(true),
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


export const packageTypeUpdateSchema = packageTypeSchema.optional()