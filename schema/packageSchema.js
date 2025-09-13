import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

// Sub-schemas
const itineraryDaySchema = z.object({
  dayNumber: z.number().min(1),
  nights: z.number().min(0),
  location: objectIdString
});

const packageDetailSchema = z.object({
  coverImage: z.object({
    url: z.string(),
    altText: z.string()
  }).optional(),
  description: z.string().optional(),
  images: z.array(z.object({
    url: z.string(),
    description: z.string().optional()
  })).optional()
});

// Main package schema
export const packageSchema = z.object({
  name: z.string().min(1),
  price: z.number(),
  rate: z.number().default(0),
  details: z.array(packageDetailSchema).optional(),
  itinerary: z.array(itineraryDaySchema).optional(),
  description: z.string().min(1),
  country: objectIdString,
  city: objectIdString,
  packageType: objectIdString,
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  slug: z.string().optional(),
  alt: z.string().optional(),
});