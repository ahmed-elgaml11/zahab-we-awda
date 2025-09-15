name, description, descText, city, country, includes, execludes, paths [name, duration ,description, descText]

import { z } from "zod";
const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

const pathSchema = z.object({
  title: z.string().trim().nonempty("Path name is required"),
  duration: z.string().trim().nonempty("Path duration is required"),
  description: z.string().trim().nonempty("Path description is required"),
  descText: z.string().trim().nonempty("Path descText is required"),
});

export const tourSchema = z.object({
  title: z.string().trim().nonempty("Name is required"),
  description: z.string().trim().nonempty("Description is required"),
  descText: z.string().trim().nonempty("descText is required"),
  city: objectIdString,
  country: objectIdString,
  includes: z.array(z.string().trim()).optional(),
  excludes: z.array(z.string().trim()).optional(),
  paths: z.array(pathSchema).optional(),
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
})

