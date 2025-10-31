import Physiotherapist from '../models/Physiotherapist.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register new physiotherapist
// @route   POST /api/physiotherapists/register
// @access  Public
export const registerPhysiotherapist = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      slmcNumber,
      qualifications,
      specializations,
      experience,
      bio,
      address,
      servicePackages,
      languages,
    } = req.body;

    // Check if physiotherapist already exists
    const existingPhysio = await Physiotherapist.findOne({
      $or: [{ email }, { slmcNumber }]
    });

    if (existingPhysio) {
      return res.status(400).json({
        success: false,
        message: 'Physiotherapist with this email or SLMC number already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create physiotherapist
    const physiotherapist = await Physiotherapist.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      slmcNumber,
      qualifications: qualifications || [],
      specializations: specializations || [],
      experience,
      bio,
      address,
      servicePackages: servicePackages || [],
      languages: languages || ['English'],
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: physiotherapist._id, role: 'physiotherapist' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'Physiotherapist registered successfully',
      data: {
        id: physiotherapist._id,
        email: physiotherapist.email,
        firstName: physiotherapist.firstName,
        lastName: physiotherapist.lastName,
        phone: physiotherapist.phone,
        slmcNumber: physiotherapist.slmcNumber,
        specializations: physiotherapist.specializations,
        isVerified: physiotherapist.isVerified,
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering physiotherapist',
      error: error.message,
    });
  }
};

// @desc    Get all physiotherapists
// @route   GET /api/physiotherapists
// @access  Public
export const getAllPhysiotherapists = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      district,
      city,
      specialization,
      minRating,
      minPrice,
      maxPrice,
    } = req.query;

    // Build query
    const query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (district) {
      query['address.district'] = district;
    }

    if (city) {
      query['address.city'] = city;
    }

    if (specialization) {
      query.specializations = { $in: [specialization] };
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // Price filter (check service packages)
    if (minPrice || maxPrice) {
      const priceQuery = {};
      if (minPrice) priceQuery.$gte = parseFloat(minPrice);
      if (maxPrice) priceQuery.$lte = parseFloat(maxPrice);
      query['servicePackages.price'] = priceQuery;
    }

    // Execute query
    const physiotherapists = await Physiotherapist.find(query)
      .select('-password')
      .sort({ rating: -1, totalReviews: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count
    const count = await Physiotherapist.countDocuments(query);

    res.status(200).json({
      success: true,
      data: physiotherapists,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get physiotherapists error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching physiotherapists',
      error: error.message,
    });
  }
};

// @desc    Get physiotherapist by ID
// @route   GET /api/physiotherapists/:id
// @access  Public
export const getPhysiotherapistById = async (req, res) => {
  try {
    const physiotherapist = await Physiotherapist.findById(req.params.id)
      .select('-password')
      .exec();

    if (!physiotherapist) {
      return res.status(404).json({
        success: false,
        message: 'Physiotherapist not found',
      });
    }

    res.status(200).json({
      success: true,
      data: physiotherapist,
    });
  } catch (error) {
    console.error('Get physiotherapist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching physiotherapist',
      error: error.message,
    });
  }
};

// @desc    Update physiotherapist profile
// @route   PUT /api/physiotherapists/:id
// @access  Private
export const updatePhysiotherapist = async (req, res) => {
  try {
    const updates = req.body;

    // Don't allow password or email updates through this endpoint
    delete updates.password;
    delete updates.email;

    const physiotherapist = await Physiotherapist.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!physiotherapist) {
      return res.status(404).json({
        success: false,
        message: 'Physiotherapist not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: physiotherapist,
    });
  } catch (error) {
    console.error('Update physiotherapist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating physiotherapist',
      error: error.message,
    });
  }
};

// @desc    Login physiotherapist
// @route   POST /api/physiotherapists/login
// @access  Public
export const loginPhysiotherapist = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find physiotherapist
    const physiotherapist = await Physiotherapist.findOne({ email });

    if (!physiotherapist) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, physiotherapist.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: physiotherapist._id, role: 'physiotherapist' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: physiotherapist._id,
        email: physiotherapist.email,
        firstName: physiotherapist.firstName,
        lastName: physiotherapist.lastName,
        phone: physiotherapist.phone,
        slmcNumber: physiotherapist.slmcNumber,
        specializations: physiotherapist.specializations,
        isVerified: physiotherapist.isVerified,
        role: 'physiotherapist',
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message,
    });
  }
};

// @desc    Get districts (for filters)
// @route   GET /api/physiotherapists/districts
// @access  Public
export const getDistricts = async (req, res) => {
  try {
    const districts = await Physiotherapist.distinct('address.district');

    res.status(200).json({
      success: true,
      data: districts.filter(d => d), // Remove null/undefined
    });
  } catch (error) {
    console.error('Get districts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching districts',
      error: error.message,
    });
  }
};

// @desc    Get specializations (for filters)
// @route   GET /api/physiotherapists/specializations
// @access  Public
export const getSpecializations = async (req, res) => {
  try {
    const specializations = await Physiotherapist.distinct('specializations');

    res.status(200).json({
      success: true,
      data: specializations.filter(s => s), // Remove null/undefined
    });
  } catch (error) {
    console.error('Get specializations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching specializations',
      error: error.message,
    });
  }
};
