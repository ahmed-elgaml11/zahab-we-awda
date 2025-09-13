import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    format: String,
    width: Number,
    height: Number,
    bytes: Number,
    caption: {
        en: String,
        ar: String
    },
    altText: {
        en: String,
        ar: String
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
  timestamps: true
});

export default mongoose.model('Image', imageSchema);