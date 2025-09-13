import { z } from 'zod';
import mongoose from 'mongoose';
import { imageSchema } from './imageSchema.js';

const objectIdString = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

// Sub-schemas
const durationSchema = z.object({
  hours: z.number(),
  type: z.enum(['half_day', 'full_day', 'multi_day'])
});

const packageSchema = z.object({
  name: z.string().min(1).trim(),
  description: z.string().trim().optional(),
  price: z.number(),
  currency: z.string().max(3).default('USD'),
  maxGroupSize: z.number().min(1),
  minGroupSize: z.number().min(1).default(1),
  includes: z.array(z.string().trim()).optional(),
  excludes: z.array(z.string().trim()).optional(),
  isPopular: z.boolean().default(false)
});

const itineraryItemSchema = z.object({
  order: z.number().min(1),
  attraction: objectIdString.optional(),
  customLocation: z.object({
    name: z.string().optional(),
    coordinates: z.object({
      latitude: z.number(),
      longitude: z.number()
    }).optional()
  }).optional(),
  duration: z.number(),
  description: z.string().trim().optional(),
  activities: z.array(z.object({
    name: z.string(),
    duration: z.number()
  })).optional(),
  images: z.array(objectIdString).optional()
});

const meetingPointSchema = z.object({
  name: z.string().min(1).trim(),
  address: z.string().min(1).trim(),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number()
  }).optional(),
  instructions: z.string().trim().optional()
});

const timeSlotSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  maxBookings: z.number().default(1)
});

const seasonalAvailabilitySchema = z.object({
  season: z.enum(['spring', 'summer', 'autumn', 'winter', 'all_year']),
  available: z.boolean().default(true),
  notes: z.string().optional()
});

const requirementsSchema = z.object({
  ageLimit: z.object({
    min: z.number().optional(),
    max: z.number().optional()
  }).optional(),
  fitnessLevel: z.enum(['low', 'moderate', 'high', 'extreme']).default('low'),
  specialRequirements: z.array(z.string().trim()).optional(),
  restrictions: z.array(z.string().trim()).optional()
});

const reviewSchema = z.object({
  user: objectIdString,
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  date: z.date().default(new Date())
});

const guideSchema = z.object({
  name: z.string().trim().optional(),
  languages: z.array(z.string().trim()).optional(),
  experience: z.number().optional(),
  rating: z.number().optional(),
  bio: z.string().trim().optional(),
  avatar: objectIdString.optional()
});

const seoSchema = z.object({
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
  keywords: z.string().trim().optional(),
  slugUrl: z.string().trim().optional(),
  priority: z.string().default('0.7'),
  changeFrequency: z.enum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']).default('weekly'),
  noIndex: z.boolean().default(false),
  noFollow: z.boolean().default(false),
  ogTitle: z.string().trim().optional(),
  ogDescription: z.string().trim().optional(),
  ogImage: z.string().trim().optional()
});

// Main city tour schema
export const cityTourSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).trim(),
  city: objectIdString,
  duration: durationSchema,
  packages: z.array(packageSchema),
  itinerary: z.array(itineraryItemSchema).optional(),
  highlights: z.array(z.string().trim()).optional(),
  meetingPoint: meetingPointSchema,
  availability: z.object({
    daysOfWeek: z.array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])).optional(),
    timeSlots: z.array(timeSlotSchema).optional(),
    seasonalAvailability: z.array(seasonalAvailabilitySchema).optional()
  }).optional(),
  requirements: requirementsSchema.optional(),
  images: z.array(objectIdString).optional(),
  coverImage: objectIdString.optional(),
  gallery: z.array(objectIdString).optional(),
  reviews: z.array(reviewSchema).optional(),
  averageRating: z.number().default(0),
  totalReviews: z.number().default(0),
  guide: guideSchema.optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isPopular: z.boolean().default(false),
  tags: z.array(z.string().trim()).optional(),
  seo: seoSchema.optional(),
  createdBy: objectIdString,
  alt: z.string().optional(),
});