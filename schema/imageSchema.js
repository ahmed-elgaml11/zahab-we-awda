import { z } from 'zod';

export const imageSchema = z.object({
  url: z.string().url(),
  description: z.string().optional(),
});