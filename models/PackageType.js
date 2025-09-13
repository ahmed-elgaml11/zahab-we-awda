// models/PackageType.js
import mongoose from 'mongoose';

const packageTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: String,
    icon: String,
    color: {
        type: String,
        default: '#3B82F6'
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    sortOrder: {
        type: Number,
        default: 0
    },
    metaTitle: String,
    metaDescription: String
}, {
  timestamps: true
});

export default mongoose.model('PackageType', packageTypeSchema);