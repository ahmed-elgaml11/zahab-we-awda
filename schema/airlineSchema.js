import { z } from 'zod';
import mongoose from 'mongoose';
import { imageSchema } from './imageSchema.js';

const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

z.objectIdString = () => objectIdString;

export const airlineSchema = z.object({
  name: z.string().min(1, "Airline name is required"),
  image: imageSchema.optional(),
  alt: z.string().optional()
});