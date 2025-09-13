import mongoose from 'mongoose';
import { imageSchema } from './Image';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true],
        trim: true,
    },
    icon: {type: imageSchema},
    description: {
        type: String,
        trim: true
    },
    method: {
        type: String,
        trim: true
    },
    seo: {
        metaTitle: {
            type: String,
            trim: true,
            maxlength: [60, 'Meta title cannot be more than 60 characters']
        },
        metaDescription: {
            type: String,
            trim: true,
            maxlength: [160, 'Meta description cannot be more than 160 characters']
        },
        keywords: {
            type: String,
            trim: true
        },
        slugUrl: {
            type: String,
            trim: true,
            unique: true,
            sparse: true
        },
        priority: {
            type: String,
            enum: ['0.1', '0.3', '0.5', '0.7', '0.9', '1.0'],
            default: '0.9'
        },
        changeFrequency: {
            type: String,
            enum: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'],
            default: 'monthly'
        },
        noIndex: {
            type: Boolean,
            default: false
        },
        noFollow: {
            type: Boolean,
            default: false
        },
        noArchive: {
            type: Boolean,
            default: false
        },
        noSnippet: {
            type: Boolean,
            default: false
        },
        ogTitle: {
            type: String,
            trim: true,
            maxlength: [60, 'OG title cannot be more than 60 characters']
        },
        ogDescription: {
            type: String,
            trim: true,
            maxlength: [160, 'OG description cannot be more than 160 characters']
        },
        ogImage: {
            type: String,
            trim: true
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

serviceSchema.index({ icon: 1 });
serviceSchema.index({ name: 1 });

serviceSchema.index({
  name: 'text',
  description: 'text',
  method: 'text',
  'seo.metaTitle': 'text',
  'seo.metaDescription': 'text',
  'seo.keywords': 'text'
});


module.exports = mongoose.model('Service', serviceSchema);