import mongoose from 'mongoose';

const packageTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: {
        url: { type: String, required: true },
        altText: { type: String }
    },
    description: String,
    metaTitle: String,
    metaDescription: String
}, {
  timestamps: true
});

export default mongoose.model('PackageType', packageTypeSchema);