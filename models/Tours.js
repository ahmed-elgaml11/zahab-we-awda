import mongoose from 'mongoose';
import { imageSchema } from './Image';

const cityTourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  duration: {
    hours: {
      type: Number,
      required: true,
      min: [1, 'Duration must be at least 1 hour'],
      max: [24, 'Duration cannot exceed 24 hours']
    },
    type: {
      type: String,
      enum: ['half_day', 'full_day', 'multi_day'],
      required: true
    }
  },
  
  // Tour packages/options
  packages: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    nameAr: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    descriptionAr: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD',
      maxlength: [3, 'Currency code cannot be more than 3 characters']
    },
    maxGroupSize: {
      type: Number,
      required: true,
      min: [1, 'Group size must be at least 1']
    },
    minGroupSize: {
      type: Number,
      default: 1,
      min: [1, 'Minimum group size must be at least 1']
    },
    includes: [{
      type: String,
      trim: true
    }],
    includesAr: [{
      type: String,
      trim: true
    }],
    excludes: [{
      type: String,
      trim: true
    }],
    excludesAr: [{
      type: String,
      trim: true
    }],
    isPopular: {
      type: Boolean,
      default: false
    }
  }],

  // Tour itinerary/route
  itinerary: [{
    order: {
      type: Number,
      required: true,
      min: 1
    },
    attraction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City.attractions'
    },
    customLocation: {
      name: String,
      nameAr: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    duration: {
      type: Number, // in minutes
      required: true,
      min: [5, 'Duration must be at least 5 minutes']
    },
    description: {
      type: String,
      trim: true
    },
    descriptionAr: {
      type: String,
      trim: true
    },
    activities: [{
      name: String,
      nameAr: String,
      duration: Number // in minutes
    }],
    images: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image'
    }]
  }],

  // Tour features and highlights
  highlights: [{
    type: String,
    trim: true
  }],
  highlightsAr: [{
    type: String,
    trim: true
  }],

  // Meeting point
  meetingPoint: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    nameAr: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    addressAr: {
      type: String,
      required: true,
      trim: true
    },
    coordinates: {
      latitude: {
        type: Number,
        // required: true,
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90']
      },
      longitude: {
        type: Number,
        // required: true,
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180']
      }
    },
    instructions: {
      type: String,
      trim: true
    },
    instructionsAr: {
      type: String,
      trim: true
    }
  },

  // Availability and scheduling
  availability: {
    daysOfWeek: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }],
    timeSlots: [{
      startTime: {
        type: String,
        required: true,
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)']
      },
      endTime: {
        type: String,
        required: true,
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)']
      },
      maxBookings: {
        type: Number,
        default: 1
      }
    }],
    seasonalAvailability: [{
      season: {
        type: String,
        enum: ['spring', 'summer', 'autumn', 'winter', 'all_year']
      },
      available: {
        type: Boolean,
        default: true
      },
      notes: String,
      notesAr: String
    }]
  },

  // Requirements and restrictions
  requirements: {
    ageLimit: {
      min: {
        type: Number,
        min: [0, 'Minimum age cannot be negative']
      },
      max: {
        type: Number,
        max: [120, 'Maximum age cannot exceed 120']
      }
    },
    fitnessLevel: {
      type: String,
      enum: ['low', 'moderate', 'high', 'extreme'],
      default: 'low'
    },
    specialRequirements: [{
      type: String,
      trim: true
    }],
    specialRequirementsAr: [{
      type: String,
      trim: true
    }],
    restrictions: [{
      type: String,
      trim: true
    }],
    restrictionsAr: [{
      type: String,
      trim: true
    }]
  },

  // Images and media
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }],
  coverImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  gallery: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }],

  // Reviews and ratings
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: String,
    commentAr: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },

  // Tour guide information
  guide: {
    name: {
      type: String,
      trim: true
    },
    nameAr: {
      type: String,
      trim: true
    },
    languages: [{
      type: String,
      trim: true
    }],
    experience: {
      type: Number, // years of experience
      min: [0, 'Experience cannot be negative']
    },
    rating: {
      type: Number,
      min: 0,
      max: 5
    },
    bio: {
      type: String,
      trim: true
    },
    bioAr: {
      type: String,
      trim: true
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image'
    }
  },

  // Status and metadata
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  tagsAr: [{
    type: String,
    trim: true
  }],

  // SEO Fields
  seo: {
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title cannot be more than 60 characters']
    },
    metaTitleAr: {
      type: String,
      trim: true,
      maxlength: [60, 'Arabic meta title cannot be more than 60 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot be more than 160 characters']
    },
    metaDescriptionAr: {
      type: String,
      trim: true,
      maxlength: [160, 'Arabic meta description cannot be more than 160 characters']
    },
    keywords: {
      type: String,
      trim: true
    },
    keywordsAr: {
      type: String,
      trim: true
    },
    slugUrl: {
      type: String,
      trim: true
    },
    priority: {
      type: String,
      // enum: ['0.1', '0.3', '0.5', '0.7', '0.9', '1.0'],
      default: '0.7'
    },
    changeFrequency: {
      type: String,
      enum: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'],
      default: 'weekly'
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
  timestamps: true
});

// Indexes for better performance
cityTourSchema.index({ title: 1 });
cityTourSchema.index({ titleAr: 1 });
cityTourSchema.index({ city: 1 });
cityTourSchema.index({ 'duration.type': 1 });
cityTourSchema.index({ 'packages.price': 1 });
cityTourSchema.index({ averageRating: -1 });
cityTourSchema.index({ isActive: 1 });
cityTourSchema.index({ isFeatured: 1 });
cityTourSchema.index({ isPopular: 1 });
cityTourSchema.index({ 'meetingPoint.coordinates.latitude': 1, 'meetingPoint.coordinates.longitude': 1 });
cityTourSchema.index({ tags: 1 });
cityTourSchema.index({ createdAt: -1 });
cityTourSchema.index({ 'seo.slugUrl': 1 }); // Index for slug search

// Helper function to generate slug
function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Pre-save middleware to auto-generate SEO slug
cityTourSchema.pre('save', async function(next) {
  try {
    // Auto-generate slug if not provided or if title changed
    if (this.isNew || this.isModified('title') || !this.seo?.slugUrl) {
      // Initialize seo object if it doesn't exist
      if (!this.seo) {
        this.seo = {};
      }

      // Generate base slug from title
      let baseSlug = generateSlug(this.title);
      let slug = baseSlug;
      let counter = 1;

      // Check for existing slugs and make unique
      while (true) {
        const existingDoc = await this.constructor.findOne({
          'seo.slugUrl': slug,
          _id: { $ne: this._id } // Exclude current document
        });

        if (!existingDoc) {
          break;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      this.seo.slugUrl = slug;

      // Auto-generate basic SEO fields if not provided
      if (!this.seo.metaTitle) {
        this.seo.metaTitle = this.title;
      }
      if (!this.seo.metaTitleAr) {
        this.seo.metaTitleAr = this.titleAr;
      }
      if (!this.seo.metaDescription) {
        this.seo.metaDescription = this.description || `Discover ${this.title} - Amazing city tour`;
      }
      if (!this.seo.metaDescriptionAr) {
        this.seo.metaDescriptionAr = this.descriptionAr || `اكتشف ${this.titleAr} - جولة مدينة مذهلة`;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Virtual for minimum price
cityTourSchema.virtual('minPrice').get(function() {
  if (this.packages && this.packages.length > 0) {
    return Math.min(...this.packages.map(pkg => pkg.price));
  }
  return 0;
});

// Virtual for maximum group size
cityTourSchema.virtual('maxGroupSize').get(function() {
  if (this.packages && this.packages.length > 0) {
    return Math.max(...this.packages.map(pkg => pkg.maxGroupSize));
  }
  return 0;
});

// Pre-save middleware to validate packages
cityTourSchema.pre('save', function(next) {
  // Ensure at least one package exists
  if (!this.packages || this.packages.length === 0) {
    return next(new Error('At least one tour package is required'));
  }

  // Validate package group sizes
  for (let pkg of this.packages) {
    if (pkg.minGroupSize > pkg.maxGroupSize) {
      return next(new Error('Minimum group size cannot be greater than maximum group size'));
    }
  }

  // Validate itinerary order
  if (this.itinerary && this.itinerary.length > 0) {
    const orders = this.itinerary.map(item => item.order);
    const uniqueOrders = [...new Set(orders)];
    if (orders.length !== uniqueOrders.length) {
      return next(new Error('Itinerary order numbers must be unique'));
    }
  }

  // Validate time slots
  if (this.availability && this.availability.timeSlots) {
    for (let slot of this.availability.timeSlots) {
      if (slot.startTime >= slot.endTime) {
        return next(new Error('End time must be after start time'));
      }
    }
  }

  next();
});

// Calculate average rating
cityTourSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
    this.totalReviews = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.averageRating = Math.round((sum / this.reviews.length) * 10) / 10;
    this.totalReviews = this.reviews.length;
  }
  return this.save({ validateBeforeSave: false });
};

// Static method to find tours by city
cityTourSchema.statics.findByCity = function(cityId, options = {}) {
  const query = { city: cityId, isActive: true };
  if (options.durationType) query['duration.type'] = options.durationType;
  if (options.minRating) query.averageRating = { $gte: options.minRating };
  if (options.maxPrice) query['packages.price'] = { $lte: options.maxPrice };

  return this.find(query)
    .populate('city', 'name nameAr country coordinates')
    .populate('coverImage', 'url alt altAr filename fullUrl thumbnailUrl metadata')
    .populate('gallery', 'url alt altAr filename fullUrl thumbnailUrl metadata')
    .populate('images', 'url alt altAr filename fullUrl thumbnailUrl metadata')
    .populate('guide.avatar', 'url alt altAr filename')
    .sort(options.sort || { averageRating: -1, createdAt: -1 });
};

// Static method to generate unique slug
cityTourSchema.statics.generateUniqueSlug = async function(title, excludeId = null) {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query = { 'seo.slugUrl': slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existingDoc = await this.findOne(query);
    if (!existingDoc) {
      break;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

// Static method to find featured tours
cityTourSchema.statics.findFeatured = function(limit = 10) {
  return this.find({ isActive: true, isFeatured: true })
    .populate('city', 'name nameAr country coordinates')
    .populate('coverImage', 'url alt altAr filename fullUrl thumbnailUrl metadata originalName')
    .populate('gallery', 'url alt altAr filename fullUrl thumbnailUrl metadata originalName')
    .populate('images', 'url alt altAr filename fullUrl thumbnailUrl metadata originalName')
    .populate('guide.avatar', 'url alt altAr filename')
    .sort({ averageRating: -1, createdAt: -1 })
    .limit(limit);
};

// Static method to find popular tours
cityTourSchema.statics.findPopular = function(limit = 10) {
  return this.find({ isActive: true, isPopular: true })
    .populate('city', 'name nameAr country coordinates')
    .populate('coverImage', 'url alt altAr filename fullUrl thumbnailUrl metadata originalName')
    .populate('gallery', 'url alt altAr filename fullUrl thumbnailUrl metadata originalName')
    .populate('images', 'url alt altAr filename fullUrl thumbnailUrl metadata originalName')
    .populate('guide.avatar', 'url alt altAr filename')
    .sort({ averageRating: -1, totalReviews: -1, createdAt: -1 })
    .limit(limit);
};

// Ensure virtual fields are serialized
cityTourSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('CityTour', cityTourSchema);
