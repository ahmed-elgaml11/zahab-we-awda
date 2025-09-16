import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
});


const headerSchema = z.object({
    dayNumber: z.number().min(1),
    nights: z.number().min(0),
    location: objectIdString
})



const itineraryItem = z.object({
    day: z
        .number()
        .int("day must be an integer")
        .min(1, "day must be >= 1"),

    title: z
        .string(),

    description: z
        .string()
});


// Main package schema
export const packageSchema = z.object({
    name: z.string().min(1),
    price: z.number(),
    rate: z.number().default(0),
    header: headerSchema,
    itinerary: z.array(itineraryItem).optional().refine((items) => {
        const days = items.map((i) => i.day);
        return new Set(days).size === days.length;
    }, { message: "itinerary days must be unique" }),
    includes: z.array(z.string().trim()).optional(),
    excludes: z.array(z.string().trim()).optional(),
    description: z.string().min(1),
    descText: z.string().optional(),
    country: objectIdString,
    city: objectIdString,
    packageType: objectIdString,
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
  }).optional(),});


  export const packageUpdateSchema = packageSchema.partial()