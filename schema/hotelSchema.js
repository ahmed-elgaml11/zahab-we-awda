// hotelSchema.ts
import { z } from 'zod';
import { imageSchema } from './imageSchema';

const objectIdString = z.string().refine(val => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const hotelSchema = z.object({
  name: z.string().min(1),
  image: z.string().url(),
  country: objectIdString, 
  city: objectIdString,
  rating: z.number().min(0).max(5),
  category: z.string().optional(),
  roomNumber: z.number().int().positive().optional(),
  roomType: z.string().optional(),
  description: z.string().min(1),
  isActive: z.boolean().default(true),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  address: z.string().min(1),
  price: z.object({
    min: z.string().min(1),
    max: z.string().min(1),
  }),
  imageCover: imageSchema.optional(),
  images: z.array(imageSchema).optional(),
  alt: z.string()
});


export const hotelUpdateSchema = hotelSchema.partial();
