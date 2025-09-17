import mongoose from "mongoose";
import { generateSlug } from '../utils/slugifyHelper.js';



const pathSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  descText: { type: String, required: true, trim: true },
});

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    descText: { type: String, trim: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
    includes: [{ type: String, trim: true }],  
    excludes: [{ type: String, trim: true }],   
    paths: [pathSchema], 
    imageCover: String,
    images: [String],
    slug: { type: String, unique: true },
    alt: { type: String, trim: true },
    seo: {
        metaTitle: { type: String, trim: true, maxlength: 60 },
        metaDescription: { type: String, trim: true, maxlength: 160 },
        keywords: { type: String, trim: true },
        slugUrl: { type: String, trim: true, unique: true, sparse: true },
        priority: { type: Number },
        changeFrequency: {
            type: String,
            enum: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'],
            default: 'monthly'
        },
        noIndex: { type: Boolean, default: false },
        noFollow: { type: Boolean, default: false },
        noArchive: { type: Boolean, default: false },
        noSnippet: { type: Boolean, default: false },
        ogTitle: { type: String, trim: true, maxlength: 60 },
        ogDescription: { type: String, trim: true, maxlength: 160 },
        ogImage: { type: String, trim: true }
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }                       
  },
  { timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
   }
);




tourSchema.pre('save', async function (next) {
    if (this.isModified('name') && this.name) {
        this.slug = await generateSlug(this.name, this.constructor);
    }

    if (!this.alt && this.name) {
        this.alt = `${this.name} - Package`;
    }
    next();
});


export default mongoose.model("Tour", tourSchema);































// import mongoose from 'mongoose';

// const tourSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   city: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'City',
//     required: true
//   },
//   duration: {
//     hours: {
//       type: Number,
//       required: true
//     },
//     type: {
//       type: String,
//       enum: ['half_day', 'full_day', 'multi_day'],
//       required: true
//     }
//   },
  
//   // Tour packages/options
//   packages: [{
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     nameAr: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     description: {
//       type: String,
//       trim: true
//     },
//     descriptionAr: {
//       type: String,
//       trim: true
//     },
//     price: {
//       type: Number,
//       required: true
//     },
//     currency: {
//       type: String,
//       default: 'USD'
//     },
//     maxGroupSize: {
//       type: Number,
//       required: true
//     },
//     minGroupSize: {
//       type: Number,
//       default: 1
//     },
//     includes: [{
//       type: String,
//       trim: true
//     }],
//     includesAr: [{
//       type: String,
//       trim: true
//     }],
//     excludes: [{
//       type: String,
//       trim: true
//     }],
//     excludesAr: [{
//       type: String,
//       trim: true
//     }],
//     isPopular: {
//       type: Boolean,
//       default: false
//     }
//   }],

//   // Tour itinerary/route
//   itinerary: [{
//     order: {
//       type: Number,
//       required: true
//     },
//     attraction: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'City.attractions'
//     },
//     customLocation: {
//       name: String,
//       nameAr: String,
//       coordinates: {
//         latitude: Number,
//         longitude: Number
//       }
//     },
//     duration: {
//       type: Number,
//       required: true
//     },
//     description: {
//       type: String,
//       trim: true
//     },
//     descriptionAr: {
//       type: String,
//       trim: true
//     },
//     activities: [{
//       name: String,
//       nameAr: String,
//       duration: Number
//     }],
//     images: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Image'
//     }]
//   }],

//   // Tour features and highlights
//   highlights: [{
//     type: String,
//     trim: true
//   }],
//   highlightsAr: [{
//     type: String,
//     trim: true
//   }],

//   // Meeting point
//   meetingPoint: {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     nameAr: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     address: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     addressAr: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     coordinates: {
//       latitude: Number,
//       longitude: Number
//     },
//     instructions: {
//       type: String,
//       trim: true
//     },
//     instructionsAr: {
//       type: String,
//       trim: true
//     }
//   },

//   // Availability and scheduling
//   availability: {
//     daysOfWeek: [{
//       type: String,
//       enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
//     }],
//     timeSlots: [{
//       startTime: String,
//       endTime: String,
//       maxBookings: {
//         type: Number,
//         default: 1
//       }
//     }],
//     seasonalAvailability: [{
//       season: {
//         type: String,
//         enum: ['spring', 'summer', 'autumn', 'winter', 'all_year']
//       },
//       available: {
//         type: Boolean,
//         default: true
//       },
//       notes: String,
//       notesAr: String
//     }]
//   },

//   // Requirements and restrictions
//   requirements: {
//     ageLimit: {
//       min: Number,
//       max: Number
//     },
//     fitnessLevel: {
//       type: String,
//       enum: ['low', 'moderate', 'high', 'extreme'],
//       default: 'low'
//     },
//     specialRequirements: [{
//       type: String,
//       trim: true
//     }],
//     specialRequirementsAr: [{
//       type: String,
//       trim: true
//     }],
//     restrictions: [{
//       type: String,
//       trim: true
//     }],
//     restrictionsAr: [{
//       type: String,
//       trim: true
//     }]
//   },

//   // Images and media
//   images: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Image'
//   }],
//   imageCover: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Image'
//   },
//   gallery: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Image'
//   }],

//   // Reviews and ratings
//   reviews: [{
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     },
//     rating: {
//       type: Number,
//       required: true
//     },
//     comment: String,
//     commentAr: String,
//     date: {
//       type: Date,
//       default: Date.now
//     }
//   }],
//   averageRating: {
//     type: Number,
//     default: 0
//   },
//   totalReviews: {
//     type: Number,
//     default: 0
//   },

//   // Tour guide information
//   guide: {
//     name: {
//       type: String,
//       trim: true
//     },
//     nameAr: {
//       type: String,
//       trim: true
//     },
//     languages: [{
//       type: String,
//       trim: true
//     }],
//     experience: Number,
//     rating: Number,
//     bio: {
//       type: String,
//       trim: true
//     },
//     bioAr: {
//       type: String,
//       trim: true
//     },
//     avatar: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Image'
//     }
//   },

//   // Status and metadata
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   isPopular: {
//     type: Boolean,
//     default: false
//   },
//   tags: [{
//     type: String,
//     trim: true
//   }],
//   tagsAr: [{
//     type: String,
//     trim: true
//   }],

//   // SEO Fields
//   seo: {
//     metaTitle: String,
//     metaTitleAr: String,
//     metaDescription: String,
//     metaDescriptionAr: String,
//     keywords: String,
//     keywordsAr: String,
//     slugUrl: String,
//     priority: {
//       type: String,
//       default: '0.7'
//     },
//     changeFrequency: {
//       type: String,
//       enum: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'],
//       default: 'weekly'
//     },
//     noIndex: {
//       type: Boolean,
//       default: false
//     },
//     noFollow: {
//       type: Boolean,
//       default: false
//     },
//     noArchive: {
//       type: Boolean,
//       default: false
//     },
//     noSnippet: {
//       type: Boolean,
//       default: false
//     },
//     ogTitle: String,
//     ogDescription: String,
//     ogImage: String
//   },

//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
// }, {
//   timestamps: true
// });

// // Indexes for better performance
// cityTourSchema.index({ title: 1 });
// cityTourSchema.index({ titleAr: 1 });
// cityTourSchema.index({ city: 1 });
// cityTourSchema.index({ 'duration.type': 1 });
// cityTourSchema.index({ 'packages.price': 1 });
// cityTourSchema.index({ averageRating: -1 });
// cityTourSchema.index({ isActive: 1 });
// cityTourSchema.index({ isFeatured: 1 });
// cityTourSchema.index({ isPopular: 1 });
// cityTourSchema.index({ 'meetingPoint.coordinates.latitude': 1, 'meetingPoint.coordinates.longitude': 1 });
// cityTourSchema.index({ tags: 1 });
// cityTourSchema.index({ createdAt: -1 });
// cityTourSchema.index({ 'seo.slugUrl': 1 });

// // Helper function to generate slug
// function generateSlug(text) {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, '')
//     .replace(/[\s_-]+/g, '-')
//     .replace(/^-+|-+$/g, '');
// }

// // Pre-save middleware to auto-generate SEO slug
// cityTourSchema.pre('save', async function(next) {
//   try {
//     if (this.isNew || this.isModified('title') || !this.seo?.slugUrl) {
//       if (!this.seo) {
//         this.seo = {};
//       }

//       let baseSlug = generateSlug(this.title);
//       let slug = baseSlug;
//       let counter = 1;

//       while (true) {
//         const existingDoc = await this.constructor.findOne({
//           'seo.slugUrl': slug,
//           _id: { $ne: this._id }
//         });

//         if (!existingDoc) {
//           break;
//         }

//         slug = `${baseSlug}-${counter}`;
//         counter++;
//       }

//       this.seo.slugUrl = slug;

//       if (!this.seo.metaTitle) {
//         this.seo.metaTitle = this.title;
//       }
//       if (!this.seo.metaTitleAr) {
//         this.seo.metaTitleAr = this.titleAr;
//       }
//       if (!this.seo.metaDescription) {
//         this.seo.metaDescription = this.description || `Discover ${this.title} - Amazing city tour`;
//       }
//       if (!this.seo.metaDescriptionAr) {
//         this.seo.metaDescriptionAr = this.descriptionAr || `اكتشف ${this.titleAr} - جولة مدينة مذهلة`;
//       }
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Virtual for minimum price
// cityTourSchema.virtual('minPrice').get(function() {
//   if (this.packages && this.packages.length > 0) {
//     return Math.min(...this.packages.map(pkg => pkg.price));
//   }
//   return 0;
// });

// // Virtual for maximum group size
// cityTourSchema.virtual('maxGroupSize').get(function() {
//   if (this.packages && this.packages.length > 0) {
//     return Math.max(...this.packages.map(pkg => pkg.maxGroupSize));
//   }
//   return 0;
// });

// // Calculate average rating
// cityTourSchema.methods.calculateAverageRating = function() {
//   if (this.reviews.length === 0) {
//     this.averageRating = 0;
//     this.totalReviews = 0;
//   } else {
//     const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
//     this.averageRating = Math.round((sum / this.reviews.length) * 10) / 10;
//     this.totalReviews = this.reviews.length;
//   }
//   return this.save({ validateBeforeSave: false });
// };

// // Static method to find tours by city
// cityTourSchema.statics.findByCity = function(cityId, options = {}) {
//   const query = { city: cityId, isActive: true };
//   if (options.durationType) query['duration.type'] = options.durationType;
//   if (options.minRating) query.averageRating = { $gte: options.minRating };
//   if (options.maxPrice) query['packages.price'] = { $lte: options.maxPrice };

//   return this.find(query)
//     .populate('city', 'name nameAr country coordinates')
//     .populate('imageCover', 'url alt altAr filename fullUrl thumbnailUrl metadata')
//     .populate('gallery', 'url alt altAr filename fullUrl thumbnailUrl metadata')
//     .populate('images', 'url alt altAr filename fullUrl thumbnailUrl metadata')
//     .populate('guide.avatar', 'url alt altAr filename')
//     .sort(options.sort || { averageRating: -1, createdAt: -1 });
// };

// // Static method to generate unique slug
// cityTourSchema.statics.generateUniqueSlug = async function(title, excludeId = null) {
//   let baseSlug = generateSlug(title);
//   let slug = baseSlug;
//   let counter = 1;

//   while (true) {
//     const query = { 'seo.slugUrl': slug };
//     if (excludeId) {
//       query._id = { $ne: excludeId };
//     }

//     const existingDoc = await this.findOne(query);
//     if (!existingDoc) {
//       break;
//     }

//     slug = `${baseSlug}-${counter}`;
//     counter++;
//   }

//   return slug;
// };

// // Static method to find featured tours
// cityTourSchema.statics.findFeatured = function(limit = 10) {
//   return this.find({ isActive: true, isFeatured: true })
//     .populate('city', 'name nameAr country coordinates')
//     .populate('imageCover', 'url alt altAr filename fullUrl thumbnailUrl metadata originalName')
//     .populate('gallery', 'url alt altAr filename fullUrl thumbnailUrl metadata originalName')
//     .populate('images', 'url alt altAr filename fullUrl thumbnailUrl metadata originalName')
//     .populate('guide.avatar', 'url alt altAr filename')
//     .sort({ averageRating: -1, createdAt: -1 })
//     .limit(limit);
// };

// // Static method to find popular tours
// cityTourSchema.statics.findPopular = function(limit = 10) {
//   return this.find({ isActive: true, isPopular: true })
//     .populate('city', 'name nameAr country coordinates')
//     .populate('imageCover', 'url alt altAr filename fullUrl thumbnailUrl metadata originalName')
//     .populate('images', 'url alt altAr filename fullUrl thumbnailUrl metadata originalName')
//     .populate('guide.avatar', 'url alt altAr filename')
//     .sort({ averageRating: -1, totalReviews: -1, createdAt: -1 })
//     .limit(limit);
// };

// // Ensure virtual fields are serialized
// cityTourSchema.set('toJSON', { virtuals: true });

// export default mongoose.model('CityTour', cityTourSchema);