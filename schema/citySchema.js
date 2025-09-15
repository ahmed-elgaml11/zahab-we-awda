// citySchema.ts
import { z } from 'zod';
import { imageSchema } from './imageSchema.js';

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
  imageCover: imageSchema.optional(),
  images: z.array(imageSchema).optional(),
  alt: z.string()
});




export const cityUpdateSchema = citySchema.partial()