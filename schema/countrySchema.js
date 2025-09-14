import moongose from 'mongoose';
import { z } from 'zod';
import { imageSchema } from './imageSchema.js';

const objectIdString = z.string().refine(val => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const countrySchema = z.object({
  name: z.string().min(1, "Country name is required").trim(),
  code: z.string().min(1, "Country code is required")
              .max(3, "Country code must be 3 characters or less")
              .transform(val => val.toUpperCase()),
  continent: z.string().min(1, "Continent is required"),
  currency: z.string().min(1, "Currency is required"),
  language: z.string().min(1, "Language is required"),
  language: z.string().min(1, "Language is required"),
  description: z.string().min(1, "Description is required"),
  imageCover: imageSchema.optional(),
  images: z.array(imageSchema).optional(),
  isActive: z.boolean().default(true),
  packageType: objectIdString.optional(),
  alt: z.string(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional()
});
