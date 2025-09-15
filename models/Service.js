import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true],
        trim: true,
    },
    imageCover: {type: String},
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
            type: Number,
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


export default mongoose.model('Service', serviceSchema);