import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Physiotherapist from '../models/Physiotherapist.js';

dotenv.config();

const samplePhysiotherapists = [
  {
    email: 'nimal.perera@physioconnect.lk',
    password: 'password123',
    firstName: 'Nimal',
    lastName: 'Perera',
    phone: '+94771234567',
    slmcNumber: 'SLMC001',
    qualifications: [
      {
        degree: 'Bachelor of Physiotherapy',
        institution: 'University of Colombo',
        year: 2015,
      },
      {
        degree: 'Masters in Sports Physiotherapy',
        institution: 'University of Peradeniya',
        year: 2018,
      },
    ],
    specializations: ['Sports Physiotherapy', 'Orthopedic Rehabilitation', 'Manual Therapy'],
    experience: 8,
    bio: 'Specialized in sports injuries and rehabilitation. Former physiotherapist for the Sri Lanka Cricket Team.',
    address: {
      street: '123 Galle Road',
      city: 'Colombo',
      district: 'Colombo',
      province: 'Western',
      postalCode: '00300',
      country: 'Sri Lanka',
    },
    servicePackages: [
      {
        tier: 'basic',
        name: 'Basic Consultation',
        description: 'Initial assessment and basic treatment',
        serviceType: 'both',
        price: 3000,
        duration: 45,
        features: ['Initial Assessment', 'Exercise Plan', 'Follow-up Call'],
      },
      {
        tier: 'standard',
        name: 'Standard Treatment',
        description: 'Comprehensive treatment with manual therapy',
        serviceType: 'home_visit',
        price: 5000,
        duration: 60,
        features: ['Comprehensive Assessment', 'Manual Therapy', 'Exercise Program', 'Progress Tracking'],
      },
      {
        tier: 'premium',
        name: 'Premium Package',
        description: 'Complete treatment with advanced techniques',
        serviceType: 'both',
        price: 8000,
        duration: 90,
        features: ['Full Assessment', 'Advanced Manual Therapy', 'Personalized Exercise Program', 'Nutritional Advice', '24/7 Support'],
      },
    ],
    languages: ['English', 'Sinhala'],
    rating: 4.9,
    totalReviews: 145,
    isVerified: true,
  },
  {
    email: 'amara.silva@physioconnect.lk',
    password: 'password123',
    firstName: 'Amara',
    lastName: 'Silva',
    phone: '+94772345678',
    slmcNumber: 'SLMC002',
    qualifications: [
      {
        degree: 'Bachelor of Physiotherapy',
        institution: 'University of Kelaniya',
        year: 2016,
      },
    ],
    specializations: ['Neurological Physiotherapy', 'Geriatric Care', 'Stroke Rehabilitation'],
    experience: 7,
    bio: 'Dedicated to helping patients recover from neurological conditions. Specialized in stroke and Parkinson\'s disease rehabilitation.',
    address: {
      street: '456 Peradeniya Road',
      city: 'Kandy',
      district: 'Kandy',
      province: 'Central',
      postalCode: '20000',
      country: 'Sri Lanka',
    },
    servicePackages: [
      {
        tier: 'basic',
        name: 'Basic Neuro Consultation',
        description: 'Initial neurological assessment',
        serviceType: 'online_consultation',
        price: 2500,
        duration: 45,
        features: ['Initial Assessment', 'Exercise Plan'],
      },
      {
        tier: 'standard',
        name: 'Standard Neuro Treatment',
        description: 'Comprehensive neurological rehabilitation',
        serviceType: 'home_visit',
        price: 4500,
        duration: 60,
        features: ['Full Assessment', 'Rehabilitation Exercises', 'Family Training'],
      },
    ],
    languages: ['English', 'Sinhala', 'Tamil'],
    rating: 4.8,
    totalReviews: 98,
    isVerified: true,
  },
  {
    email: 'priya.fernando@physioconnect.lk',
    password: 'password123',
    firstName: 'Priya',
    lastName: 'Fernando',
    phone: '+94773456789',
    slmcNumber: 'SLMC003',
    qualifications: [
      {
        degree: 'Bachelor of Physiotherapy',
        institution: 'University of Ruhuna',
        year: 2014,
      },
      {
        degree: 'Diploma in Pediatric Physiotherapy',
        institution: 'British Council',
        year: 2017,
      },
    ],
    specializations: ['Pediatric Physiotherapy', 'Developmental Delays', 'Cerebral Palsy'],
    experience: 9,
    bio: 'Passionate about helping children reach their full potential. Specialized in treating developmental delays and cerebral palsy.',
    address: {
      street: '789 Matara Road',
      city: 'Galle',
      district: 'Galle',
      province: 'Southern',
      postalCode: '80000',
      country: 'Sri Lanka',
    },
    servicePackages: [
      {
        tier: 'basic',
        name: 'Basic Pediatric Session',
        description: 'Initial assessment for children',
        serviceType: 'home_visit',
        price: 3500,
        duration: 45,
        features: ['Child Assessment', 'Parent Consultation', 'Exercise Guide'],
      },
      {
        tier: 'premium',
        name: 'Premium Pediatric Care',
        description: 'Comprehensive pediatric physiotherapy',
        serviceType: 'home_visit',
        price: 6500,
        duration: 75,
        features: ['Full Assessment', 'Play-based Therapy', 'Parent Training', 'Home Program'],
      },
    ],
    languages: ['English', 'Sinhala'],
    rating: 5.0,
    totalReviews: 167,
    isVerified: true,
  },
  {
    email: 'rashmi.jayawardena@physioconnect.lk',
    password: 'password123',
    firstName: 'Rashmi',
    lastName: 'Jayawardena',
    phone: '+94774567890',
    slmcNumber: 'SLMC004',
    qualifications: [
      {
        degree: 'Bachelor of Physiotherapy',
        institution: 'University of Colombo',
        year: 2017,
      },
    ],
    specializations: ['Women\'s Health', 'Pelvic Floor Rehabilitation', 'Prenatal Care'],
    experience: 6,
    bio: 'Specialized in women\'s health physiotherapy, including prenatal and postnatal care, pelvic floor rehabilitation.',
    address: {
      street: '321 Negombo Road',
      city: 'Negombo',
      district: 'Gampaha',
      province: 'Western',
      postalCode: '11500',
      country: 'Sri Lanka',
    },
    servicePackages: [
      {
        tier: 'standard',
        name: 'Women\'s Health Package',
        description: 'Specialized care for women',
        serviceType: 'both',
        price: 4000,
        duration: 60,
        features: ['Comprehensive Assessment', 'Pelvic Floor Exercises', 'Education Session'],
      },
    ],
    languages: ['English', 'Sinhala'],
    rating: 4.7,
    totalReviews: 82,
    isVerified: true,
  },
  {
    email: 'kumar.ratnayake@physioconnect.lk',
    password: 'password123',
    firstName: 'Kumar',
    lastName: 'Ratnayake',
    phone: '+94775678901',
    slmcNumber: 'SLMC005',
    qualifications: [
      {
        degree: 'Bachelor of Physiotherapy',
        institution: 'University of Jayewardenepura',
        year: 2013,
      },
    ],
    specializations: ['Orthopedic Physiotherapy', 'Post-surgical Rehabilitation', 'Chronic Pain Management'],
    experience: 10,
    bio: 'Experienced in post-surgical rehabilitation and chronic pain management. Worked in leading hospitals in Colombo.',
    address: {
      street: '654 Kotte Road',
      city: 'Maharagama',
      district: 'Colombo',
      province: 'Western',
      postalCode: '10280',
      country: 'Sri Lanka',
    },
    servicePackages: [
      {
        tier: 'basic',
        name: 'Basic Orthopedic Care',
        description: 'Basic orthopedic assessment and treatment',
        serviceType: 'online_consultation',
        price: 2800,
        duration: 40,
        features: ['Assessment', 'Treatment Plan'],
      },
      {
        tier: 'standard',
        name: 'Standard Orthopedic Treatment',
        description: 'Comprehensive orthopedic physiotherapy',
        serviceType: 'home_visit',
        price: 4800,
        duration: 60,
        features: ['Full Assessment', 'Manual Therapy', 'Exercise Program'],
      },
      {
        tier: 'premium',
        name: 'Premium Post-Surgical Care',
        description: 'Complete post-surgical rehabilitation',
        serviceType: 'home_visit',
        price: 7500,
        duration: 90,
        features: ['Comprehensive Care', 'Advanced Techniques', 'Long-term Follow-up'],
      },
    ],
    languages: ['English', 'Sinhala', 'Tamil'],
    rating: 4.9,
    totalReviews: 203,
    isVerified: true,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/physioconnect');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Physiotherapist.deleteMany({});
    console.log('🗑️  Cleared existing physiotherapists');

    // Hash passwords and insert
    for (const physio of samplePhysiotherapists) {
      physio.password = await bcrypt.hash(physio.password, 10);
    }

    const inserted = await Physiotherapist.insertMany(samplePhysiotherapists);
    console.log(`✅ Inserted ${inserted.length} physiotherapists`);

    console.log('\n📋 Sample Credentials:');
    samplePhysiotherapists.forEach((physio) => {
      console.log(`   Email: ${physio.email} | Password: password123`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
