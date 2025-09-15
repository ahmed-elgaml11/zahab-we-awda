import mongoose from 'mongoose';
import { generateSlug } from '../utils/slugifyHelper.js';

const headerSchema = new mongoose.Schema({
    dayNumber: { type: Number, required: true, min: 1 },
    nights: { type: Number, required: true, min: 0 },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    }
});


const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rate: { type: Number, default: 0 },
    header: headerSchema,
    packageType: { type: mongoose.Schema.Types.ObjectId, ref: 'PackageType', required: true },
    itinerary: [{
        day: {
            type: Number,
            required: true,
            min: 1
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
    }],
    includes: [{
        type: String,
        trim: true
    }],
    excludes: [{
        type: String,
        trim: true
    }],
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    imageCover: String,
    description: { type: String, required: true },
    metaTitle: String,
    metaDescription: String,
    slug: { type: String, unique: true },
    alt: { type: String }
}, {
    timestamps: true
});

packageSchema.index({ country: 1, city: 1 });
packageSchema.index({ packageType: 1 });
packageSchema.index({ price: 1 });
packageSchema.index({ 'name': 'text', 'description': 'text' });
packageSchema.index({ slug: 1 });

packageSchema.pre('save', function (next) {
    if (this.isModified('name') && this.name) {
        this.slug = generateSlug(this.name);
    }

    if (!this.alt && this.name) {
        this.alt = `${this.name} - Travel Package`;
    }

    if (this.details && !this.details.alt && this.name) {
        this.details.alt = `${this.name} - Package Details`;
    }

    next();
});

export default mongoose.model('Package', packageSchema);