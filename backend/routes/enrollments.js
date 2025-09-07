const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Enrollment Schema
const enrollmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required']
  },
  studentInfo: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[\+]?[0-9\s\-\(\)]{10,15}$/, 'Please enter a valid phone number']
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, required: [true, 'City is required'], trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
      country: { type: String, default: 'Nepal', trim: true }
    },
    education: {
      level: {
        type: String,
        required: [true, 'Education level is required'],
        enum: ['High School', 'Intermediate', 'Bachelor', 'Master', 'Other']
      },
      institution: { type: String, trim: true },
      graduationYear: { type: Number, min: 1950, max: new Date().getFullYear() + 10 }
    },
    experience: {
      hasWorkExperience: { type: Boolean, default: false },
      yearsOfExperience: { type: Number, min: 0, max: 50 },
      currentJob: { type: String, trim: true },
      relevantSkills: [{ type: String, trim: true }]
    }
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed', 'dropped'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'completed'],
    default: 'pending'
  },
  paymentInfo: {
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    paymentMethod: {
      type: String,
      enum: ['cash', 'bank_transfer', 'online', 'installment'],
      default: 'pending'
    },
    transactionId: { type: String, trim: true },
    installmentPlan: {
      enabled: { type: Boolean, default: false },
      numberOfInstallments: { type: Number, min: 1, max: 12 },
      amountPerInstallment: { type: Number }
    }
  },
  motivation: {
    type: String,
    trim: true,
    maxlength: [1000, 'Motivation cannot exceed 1000 characters']
  },
  emergencyContact: {
    name: { type: String, required: [true, 'Emergency contact name is required'], trim: true },
    relationship: { type: String, required: [true, 'Relationship is required'], trim: true },
    phone: { type: String, required: [true, 'Emergency contact phone is required'], trim: true }
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [2000, 'Notes cannot exceed 2000 characters']
  },
  ipAddress: { type: String },
  userAgent: { type: String }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
enrollmentSchema.index({ 'studentInfo.email': 1, courseId: 1 });
enrollmentSchema.index({ status: 1, enrollmentDate: -1 });

// Virtual for full name
enrollmentSchema.virtual('studentInfo.fullName').get(function() {
  return `${this.studentInfo.firstName} ${this.studentInfo.lastName}`;
});

// Virtual for remaining balance
enrollmentSchema.virtual('paymentInfo.remainingBalance').get(function() {
  return Math.max(0, this.paymentInfo.totalAmount - this.paymentInfo.paidAmount);
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

// Validation middleware
const validateEnrollment = [
  body('courseId').isMongoId().withMessage('Invalid course ID'),
  body('studentInfo.firstName').trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  body('studentInfo.lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
  body('studentInfo.email').trim().isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('studentInfo.phone').trim().matches(/^[\+]?[0-9\s\-\(\)]{10,15}$/).withMessage('Please provide a valid phone number'),
  body('studentInfo.dateOfBirth').isISO8601().withMessage('Please provide a valid date of birth'),
  body('studentInfo.address.city').trim().isLength({ min: 2, max: 50 }).withMessage('City is required'),
  body('studentInfo.education.level').isIn(['High School', 'Intermediate', 'Bachelor', 'Master', 'Other']).withMessage('Invalid education level'),
  body('emergencyContact.name').trim().isLength({ min: 2, max: 100 }).withMessage('Emergency contact name is required'),
  body('emergencyContact.relationship').trim().isLength({ min: 2, max: 50 }).withMessage('Emergency contact relationship is required'),
  body('emergencyContact.phone').trim().matches(/^[\+]?[0-9\s\-\(\)]{10,15}$/).withMessage('Valid emergency contact phone is required')
];

// @route   POST /api/enrollments
// @desc    Submit course enrollment
// @access  Public
router.post('/', validateEnrollment, async (req, res) => {
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

    // Check if course exists and is available for enrollment
    const Course = mongoose.model('Course');
    const course = await Course.findById(req.body.courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    if (course.status !== 'published') {
      return res.status(400).json({
        success: false,
        error: 'Course is not available for enrollment'
      });
    }

    if (course.capacity.current >= course.capacity.max) {
      return res.status(400).json({
        success: false,
        error: 'Course is full. No more enrollments accepted.'
      });
    }

    if (new Date() > new Date(course.registrationDeadline)) {
      return res.status(400).json({
        success: false,
        error: 'Registration deadline has passed'
      });
    }

    // Check for duplicate enrollment
    const existingEnrollment = await Enrollment.findOne({
      courseId: req.body.courseId,
      'studentInfo.email': req.body.studentInfo.email,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingEnrollment) {
      return res.status(409).json({
        success: false,
        error: 'You have already enrolled in this course'
      });
    }

    // Create enrollment
    const enrollmentData = {
      ...req.body,
      paymentInfo: {
        totalAmount: course.fee.amount,
        paidAmount: 0,
        paymentMethod: 'pending'
      },
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    };

    const enrollment = new Enrollment(enrollmentData);
    await enrollment.save();

    // Update course enrollment count
    await Course.findByIdAndUpdate(
      req.body.courseId,
      { $inc: { 'capacity.current': 1 } }
    );

    // Populate course information for response
    await enrollment.populate('courseId', 'title category startDate endDate fee');

    res.status(201).json({
      success: true,
      message: 'Enrollment submitted successfully! We will contact you soon with payment details.',
      data: {
        enrollmentId: enrollment._id,
        course: enrollment.courseId,
        student: enrollment.studentInfo.fullName,
        status: enrollment.status,
        enrollmentDate: enrollment.enrollmentDate
      }
    });

  } catch (error) {
    console.error('Enrollment submission error:', error);
    
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
      error: 'Unable to process enrollment. Please try again later.'
    });
  }
});

// @route   GET /api/enrollments
// @desc    Get all enrollments (Admin only)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    const courseId = req.query.courseId;

    // Build query
    let query = {};
    if (status) query.status = status;
    if (courseId) query.courseId = courseId;

    const enrollments = await Enrollment.find(query)
      .populate('courseId', 'title category startDate endDate')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-ipAddress -userAgent -notes');

    const total = await Enrollment.countDocuments(query);

    res.json({
      success: true,
      data: {
        enrollments,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: enrollments.length,
          totalRecords: total
        }
      }
    });

  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve enrollments'
    });
  }
});

// @route   PUT /api/enrollments/:id/status
// @desc    Update enrollment status (Admin only)
// @access  Private
router.put('/:id/status', async (req, res) => {
  try {
    const { status, paymentStatus, notes } = req.body;

    if (!['pending', 'approved', 'rejected', 'completed', 'dropped'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }

    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus, notes },
      { new: true, runValidators: true }
    ).populate('courseId', 'title');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        error: 'Enrollment not found'
      });
    }

    res.json({
      success: true,
      message: 'Enrollment updated successfully',
      data: enrollment
    });

  } catch (error) {
    console.error('Update enrollment error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to update enrollment'
    });
  }
});

module.exports = router;
