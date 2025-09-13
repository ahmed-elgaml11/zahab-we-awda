import { z } from 'zod';

export const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
});