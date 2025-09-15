import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    descText: { type: String, trim: true },
    description: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    imageCover: { type: String }, 
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
