import mongoose from 'mongoose';

const itineraryDaySchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true,
        min: 1
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    activities: [String],
    meals: [{
        type: String,
        enum: ['breakfast', 'lunch', 'dinner']
    }],
    accommodation: String
});

const packageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true,
        maxlength: 200
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        min: 0
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    durationType: {
        type: String,
        enum: ['days', 'nights'],
        default: 'days'
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    packageType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PackageType',
        required: true
    },
    itinerary: [itineraryDaySchema],
    inclusions: [String],
    exclusions: [String],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    coverImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isOnSale: {
        type: Boolean,
        default: false
    },
    startDate: Date,
    endDate: Date,
    bookingDeadline: Date,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    metaTitle: String,
    metaDescription: String,
    slug: {
        type: String,
        unique: true
    }
}, {
  timestamps: true
});

packageSchema.index({ country: 1, city: 1, isActive: 1 });
packageSchema.index({ packageType: 1, isActive: 1 });
packageSchema.index({ isFeatured: 1, isActive: 1 });
packageSchema.index({ isOnSale: 1, isActive: 1 });
packageSchema.index({ price: 1 });
packageSchema.index({ 'title': 'text', 'description': 'text' });
packageSchema.index({ 'slug': 1 });

packageSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase()
      .replace(/[^ء-ي0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 100);
  }
  next();
});

export default mongoose.model('Package', packageSchema);