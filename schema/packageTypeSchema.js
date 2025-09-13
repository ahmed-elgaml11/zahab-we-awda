import { z } from 'zod';

export const packageTypeSchema = z.object({
  name: z.string().min(1).trim(),
  image: z.object({
    url: z.string().min(1),
    altText: z.string().optional()
  }),
  alt: z.string().optional(),
  description: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional()
});