// countrySchema.ts
import { z } from 'zod';
import { imageSchema } from './imageSchema.js';

const objectIdString = z.string().refine(val => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const countrySchema = z.object({
  name: z.string().min(1).trim(),
  code: z.string().length(3).toUpperCase(),
  continent: z.string().min(1),
  currency: z.string().min(1),
  language: z.string().min(1),
  description: z.string().min(1),
  imageCover: imageSchema.optional(),
  images: z.array(imageSchema).optional(),
  isActive: z.boolean().default(true),
  packageType: objectIdString.optional(),
  alt: z.string()

});
