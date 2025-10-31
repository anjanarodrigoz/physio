import mongoose from 'mongoose';

const qualificationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  certificate: String,
});

const addressSchema = new mongoose.Schema({
  street: String,
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  province: String,
  postalCode: String,
  country: {
    type: String,
    default: 'Sri Lanka',
  },
});

const servicePackageSchema = new mongoose.Schema({
  tier: {
    type: String,
    enum: ['basic', 'standard', 'premium'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  serviceType: {
    type: String,
    enum: ['home_visit', 'online_consultation', 'both'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true, // in minutes
  },
  features: [String],
  isActive: {
    type: Boolean,
    default: true,
  },
});

const availabilitySchema = new mongoose.Schema({
  dayOfWeek: {
    type: Number,
    required: true,
    min: 0,
    max: 6, // 0-6 (Sunday-Saturday)
  },
  startTime: {
    type: String,
    required: true, // HH:mm format
  },
  endTime: {
    type: String,
    required: true, // HH:mm format
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const physiotherapistSchema = new mongoose.Schema({
  // Basic Info
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  avatar: String,

  // Professional Info
  slmcNumber: {
    type: String,
    required: true,
    unique: true,
  },
  qualifications: [qualificationSchema],
  specializations: [String],
  experience: {
    type: Number, // years
    required: true,
  },
  bio: String,

  // Location
  address: addressSchema,

  // Services
  servicePackages: [servicePackageSchema],
  availability: [availabilitySchema],
  languages: {
    type: [String],
    default: ['English'],
  },

  // Rating & Reviews
  rating: {
    type: Number,
    default: 5.0,
    min: 0,
    max: 5,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },

  // Status
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },

  // Images
  profileImage: String,
  certificateImages: [String],
  clinicImages: [String],
}, {
  timestamps: true,
});

// Index for search
physiotherapistSchema.index({ firstName: 'text', lastName: 'text', specializations: 'text' });
physiotherapistSchema.index({ 'address.district': 1, 'address.city': 1 });
physiotherapistSchema.index({ rating: -1 });

const Physiotherapist = mongoose.model('Physiotherapist', physiotherapistSchema);

export default Physiotherapist;
