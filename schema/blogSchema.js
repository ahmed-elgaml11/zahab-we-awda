import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().trim().nonempty("Title is required"),
  descText: z.string().trim().nonempty("descText is required"),
  description: z.string().trim().nonempty("Description is required"),
  tags: z.array(z.string().trim()).optional(), 
  imageCover: z.url("Must be a valid URL"), 
});

