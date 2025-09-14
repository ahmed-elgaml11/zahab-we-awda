import mongoose from 'mongoose';
import { imageSchema } from './Image.js';
const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true
    },
    rating: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    roomNumber: {
      type: Number,
    },
    roomType: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      min: {
        type: String,
        required: true,
      },
      max: {
        type: String,
        required: true,
      },
    },
    imageCover: {
      type: String,
    },
    images: [String]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Hotel', HotelSchema);
