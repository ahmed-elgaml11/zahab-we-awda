import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        maxlength: 3
    },
    description: String,
    currency: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    metaTitle: String,
    metaDescription: String
}, {
  timestamps: true
});

countrySchema.index({ 'name': 'text', 'description': 'text', });
countrySchema.index({ code: 1 });
countrySchema.index({ isActive: 1 });

export default mongoose.model('Country', countrySchema);