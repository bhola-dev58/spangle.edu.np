const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Testimonial Schema
const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  course: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    maxlength: [200, 'Course name cannot exceed 200 characters']
  },
  graduationYear: {
    type: Number,
    required: [true, 'Graduation year is required'],
    min: [2000, 'Graduation year must be after 2000'],
    max: [new Date().getFullYear() + 1, 'Invalid graduation year']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be between 1 and 5'],
    max: [5, 'Rating must be between 1 and 5']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    minlength: [10, 'Comment must be at least 10 characters long'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  currentPosition: {
    jobTitle: {
      type: String,
      trim: true,
      maxlength: [100, 'Job title cannot exceed 100 characters']
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters']
    }
  },
  image: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  featured: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  ipAddress: { type: String },
  userAgent: { type: String }
}, {
  timestamps: true
});

// Indexes
testimonialSchema.index({ status: 1, featured: -1, displayOrder: 1 });
testimonialSchema.index({ email: 1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

// Validation middleware
const validateTestimonial = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('course')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Course name must be between 2 and 200 characters'),
  
  body('graduationYear')
    .isInt({ min: 2000, max: new Date().getFullYear() + 1 })
    .withMessage('Please provide a valid graduation year'),
  
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('comment')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Comment must be between 10 and 1000 characters'),
  
  body('currentPosition.jobTitle')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Job title cannot exceed 100 characters'),
  
  body('currentPosition.company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters'),
  
  body('currentPosition.location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters')
];

// @route   POST /api/testimonials
// @desc    Submit testimonial
// @access  Public
router.post('/', validateTestimonial, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, course, graduationYear, rating, comment, currentPosition } = req.body;

    // Check for duplicate testimonial from same email
    const existingTestimonial = await Testimonial.findOne({
      email,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingTestimonial) {
      return res.status(409).json({
        success: false,
        error: 'You have already submitted a testimonial'
      });
    }

    // Create testimonial
    const testimonial = new Testimonial({
      name,
      email,
      course,
      graduationYear,
      rating,
      comment,
      currentPosition,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    await testimonial.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your testimonial! It will be reviewed and published soon.',
      data: {
        name: testimonial.name,
        course: testimonial.course,
        rating: testimonial.rating,
        submittedAt: testimonial.createdAt
      }
    });

  } catch (error) {
    console.error('Testimonial submission error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    res.status(500).json({
      success: false,
      error: 'Unable to submit testimonial. Please try again later.'
    });
  }
});

// @route   GET /api/testimonials
// @desc    Get approved testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const featured = req.query.featured;
    const course = req.query.course;
    const rating = req.query.rating;

    // Build query
    let query = { status: 'approved' };
    if (featured !== undefined) query.featured = featured === 'true';
    if (course) query.course = new RegExp(course, 'i');
    if (rating) query.rating = parseInt(rating);

    const testimonials = await Testimonial.find(query)
      .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-email -ipAddress -userAgent');

    const total = await Testimonial.countDocuments(query);

    // Calculate average rating
    const avgRating = await Testimonial.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    res.json({
      success: true,
      data: {
        testimonials,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: testimonials.length,
          totalRecords: total
        },
        statistics: {
          averageRating: avgRating.length > 0 ? avgRating[0].avgRating.toFixed(1) : 0,
          totalTestimonials: total
        }
      }
    });

  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve testimonials'
    });
  }
});

// @route   GET /api/testimonials/featured
// @desc    Get featured testimonials
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const testimonials = await Testimonial.find({ 
      status: 'approved', 
      featured: true 
    })
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(limit)
      .select('-email -ipAddress -userAgent');

    res.json({
      success: true,
      data: testimonials
    });

  } catch (error) {
    console.error('Get featured testimonials error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve featured testimonials'
    });
  }
});

// @route   GET /api/testimonials/admin
// @desc    Get all testimonials for admin (including pending)
// @access  Private
router.get('/admin', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;

    // Build query
    let query = {};
    if (status) query.status = status;

    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Testimonial.countDocuments(query);

    res.json({
      success: true,
      data: {
        testimonials,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: testimonials.length,
          totalRecords: total
        }
      }
    });

  } catch (error) {
    console.error('Get admin testimonials error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve testimonials'
    });
  }
});

// @route   PUT /api/testimonials/:id/status
// @desc    Update testimonial status (Admin only)
// @access  Private
router.put('/:id/status', async (req, res) => {
  try {
    const { status, featured, displayOrder } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }

    const updateData = { status };
    if (featured !== undefined) updateData.featured = featured;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial
    });

  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to update testimonial'
    });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial (Admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });

  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to delete testimonial'
    });
  }
});

module.exports = router;
