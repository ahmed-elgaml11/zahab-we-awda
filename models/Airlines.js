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
    alt: {type : String}
  }
);

airlineSchema.index({ name: 1 });


module.exports = mongoose.model('Airline', airlineSchema);