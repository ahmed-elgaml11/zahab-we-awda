import mongoose from 'mongoose';

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
    coverImage: { url: String, altText: String },
    description: { type: String },
    images: [
        {
            url: String,
            description: String
        }
    ]
});

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rate: { type: Number, default: 0 },
    details: [packageDetailSchema],
    itinerary: [itineraryDaySchema],
    description: { type: String, required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
    packageType: { type: mongoose.Schema.Types.ObjectId, ref: 'PackageType', required: true },
    metaTitle: String,
    metaDescription: String,
    slug: { type: String, unique: true }
}, {
    timestamps: true
});

// Indexes
packageSchema.index({ country: 1, city: 1 });
packageSchema.index({ packageType: 1 });
packageSchema.index({ price: 1 });
packageSchema.index({ 'name': 'text', 'description': 'text' });
packageSchema.index({ slug: 1 });

// Slug generation
packageSchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = this.name.toLowerCase()
        .replace(/[^ء-ي0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .substring(0, 100);
    }
    next();
});

export default mongoose.model('Package', packageSchema);