import mongoose from 'mongoose';
import { imageSchema } from './Image.js';
import { generateSlug } from '../utils/slugifyHelper.js';

const itineraryDaySchema = new mongoose.Schema({
    dayNumber: { type: Number, required: true, min: 1 },
    nights: { type: Number, required: true, min: 0 },
    location: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Country', 
        required: true 
    }
});

const packageDetailSchema = new mongoose.Schema({
    coverImage: imageSchema,
    description: { type: String },
    images: [imageSchema],
    alt: { type: String }
});

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rate: { type: Number, default: 0 },
    coverImage: imageSchema,
    details: packageDetailSchema,
    itinerary: itineraryDaySchema,
    description: { type: String, required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
    packageType: { type: mongoose.Schema.Types.ObjectId, ref: 'PackageType', required: true },
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

packageSchema.pre('save', function(next) {
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
