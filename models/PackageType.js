import mongoose from 'mongoose';
import imageSchema from './Image.js'
const packageTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: String,
    alt: { type: String },
    description: String,
    metaTitle: String,
    metaDescription: String
}, {
  timestamps: true
});

export default mongoose.model('PackageType', packageTypeSchema);