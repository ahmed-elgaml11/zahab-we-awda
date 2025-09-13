import mongoose from 'mongoose';
import { imageSchema } from './Image';

const airlineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: imageSchema,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

airlineSchema.index({ name: 1 });
airlineSchema.index({ nameAr: 1 });
airlineSchema.index({ iataCode: 1 });
airlineSchema.index({ icaoCode: 1 });
airlineSchema.index({ country: 1 });
airlineSchema.index({ isActive: 1 });


module.exports = mongoose.model('Airline', airlineSchema);