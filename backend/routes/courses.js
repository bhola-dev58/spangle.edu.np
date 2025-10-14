const express = require('express');
const router = express.Router();
const { body, validationResult, query } = require('express-validator');
const { getCourses, addCourse } = require('../mysql/courseModel');

// @route   GET /api/courses
// @desc    Get all courses with filtering, sorting, and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('category').optional().trim(),
  query('level').optional().isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid level'),
  query('status').optional().isIn(['draft', 'published', 'full', 'completed', 'cancelled']).withMessage('Invalid status'),
  query('featured').optional().isBoolean().withMessage('Featured must be boolean')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Invalid query parameters',
        details: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const category = req.query.category;
    const level = req.query.level;
    const status = req.query.status || 'published';
    const featured = req.query.featured;
    const search = req.query.search;
    const sort = req.query.sort || '-createdAt';

    // Build query
    let query = { status };
    
    if (category) query.category = category;
    if (level) query.level = level;
    if (featured !== undefined) query.featured = featured === 'true';
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Use MySQL for fetching courses
    const courses = await getCourses();

    const total = await Course.countDocuments(query);

    // Get available categories and levels for filtering
    const categories = await Course.distinct('category', { status: 'published' });
    const levels = await Course.distinct('level', { status: 'published' });

    res.json({
      success: true,
      data: {
        courses,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: courses.length,
          totalRecords: total
        },
        filters: {
          categories,
          levels
        }
      }
    });

  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve courses'
    });
  }
});

// @route   GET /api/courses/featured
// @desc    Get featured courses
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const courses = await Course.find({ 
      status: 'published', 
      featured: true 
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-curriculum -prerequisites');

    res.json({
      success: true,
      data: courses
    });

  } catch (error) {
    console.error('Get featured courses error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve featured courses'
    });
  }
});

// @route   GET /api/courses/:slug
// @desc    Get single course by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ 
      slug: req.params.slug,
      status: 'published'
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Get related courses (same category, excluding current)
    const relatedCourses = await Course.find({
      _id: { $ne: course._id },
      category: course.category,
      status: 'published'
    })
      .limit(4)
      .select('-curriculum -prerequisites');

    res.json({
      success: true,
      data: {
        course,
        relatedCourses
      }
    });

  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve course'
    });
  }
});

// @route   POST /api/courses
// @desc    Create new course (Admin only)
// @access  Private
router.post('/', [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('description').trim().isLength({ min: 50, max: 2000 }).withMessage('Description must be between 50 and 2000 characters'),
  body('category').isIn(['Computer Science', 'Office Management', 'Web Development', 'Graphics Design', 'Digital Marketing', 'Other']).withMessage('Invalid category'),
  body('level').optional().isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid level'),
  body('duration.weeks').isInt({ min: 1, max: 52 }).withMessage('Duration must be between 1 and 52 weeks'),
  body('duration.hoursPerWeek').optional().isInt({ min: 1, max: 40 }).withMessage('Hours per week must be between 1 and 40'),
  body('fee.amount').isNumeric({ no_symbols: false }).withMessage('Fee must be a valid number'),
  body('instructor.name').trim().isLength({ min: 2, max: 100 }).withMessage('Instructor name is required'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().withMessage('End date must be a valid date'),
  body('registrationDeadline').isISO8601().withMessage('Registration deadline must be a valid date')
], async (req, res) => {
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

    const id = await addCourse(req.body);
    res.status(201).json({ id });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });

  } catch (error) {
    console.error('Create course error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Course with this title already exists'
      });
    }

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
      error: 'Unable to create course'
    });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update course (Admin only)
// @access  Private
router.put('/:id', [
  body('title').optional().trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('description').optional().trim().isLength({ min: 50, max: 2000 }).withMessage('Description must be between 50 and 2000 characters'),
  body('category').optional().isIn(['Computer Science', 'Office Management', 'Web Development', 'Graphics Design', 'Digital Marketing', 'Other']).withMessage('Invalid category'),
  body('level').optional().isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid level'),
  body('status').optional().isIn(['draft', 'published', 'full', 'completed', 'cancelled']).withMessage('Invalid status')
], async (req, res) => {
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

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });

  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to update course'
    });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete course (Admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });

  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to delete course'
    });
  }
});

// @route   GET /api/courses/stats/overview
// @desc    Get course statistics (Admin only)
// @access  Private
router.get('/stats/overview', async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const publishedCourses = await Course.countDocuments({ status: 'published' });
    const featuredCourses = await Course.countDocuments({ featured: true });
    
    const categoryStats = await Course.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const levelStats = await Course.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: '$level',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        total: totalCourses,
        published: publishedCourses,
        featured: featuredCourses,
        byCategory: categoryStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {}),
        byLevel: levelStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });

  } catch (error) {
    console.error('Get course stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve course statistics'
    });
  }
});

module.exports = router;
