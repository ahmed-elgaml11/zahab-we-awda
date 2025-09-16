// citySchema.ts
import { z } from 'zod';

const objectIdString = z.string().refine(val => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId ',
});

const timeOptions = ["morning", "afternoon", "evening", "night"];
const monthOptions = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const citySchema = z.object({
  name: z.string().min(1),
  country: objectIdString,
  description: z.string().min(1),
  descText: z.string().optional(),
  coordinates: z.object({
    lat: z.number().min(-90),
    lng: z.number().max(90)
  }).optional(),
  favTime: z.array(z.enum(timeOptions)).optional(),
  favMonth: z.array(z.enum(monthOptions)).optional(),
  weather: z.object({
    currentTemp: z.number().optional(),
    condition: z.string().optional(),
    humididy: z.number().optional(),
    windSpeed: z.number().optional(),
    isAutoUpdate: z.boolean().default(true)
  }).optional(),
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




export const cityUpdateSchema = citySchema.partial()