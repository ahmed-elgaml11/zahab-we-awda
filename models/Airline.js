import mongoose from 'mongoose';

const airlineSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    alt: {type : String}
  }
);

airlineSchema.index({ name: 1 });


export default mongoose.model('Airline', airlineSchema);