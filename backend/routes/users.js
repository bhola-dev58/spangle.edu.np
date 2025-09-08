const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const { protect, authorize, authorizeOwnershipOrAdmin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET /api/users/:id
// @desc    Get user profile by ID
// @access  Private (Own profile or Admin)
router.get('/:id', protect, authorizeOwnershipOrAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('educationalProfile.enrolledCourses.courseId', 'title category duration fee');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: user.toSafeObject()
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to get user profile'
    });
  }
});

// @route   POST /api/users/:id/enroll
// @desc    Enroll user in a course
// @access  Private (Own profile or Admin)
router.post('/:id/enroll', protect, authorizeOwnershipOrAdmin, [
  body('courseId').isMongoId().withMessage('Valid course ID is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array()
      });
    }

    const { courseId } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if already enrolled
    const existingEnrollment = user.educationalProfile.enrolledCourses.find(
      course => course.courseId.toString() === courseId
    );

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        error: 'User is already enrolled in this course'
      });
    }

    // Verify course exists
    const Course = mongoose.model('Course');
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Add enrollment
    user.educationalProfile.enrolledCourses.push({
      courseId: courseId,
      enrollmentDate: new Date(),
      status: 'enrolled',
      progress: 0
    });

    await user.save();

    // Populate the course details for response
    await user.populate('educationalProfile.enrolledCourses.courseId', 'title category duration fee');

    res.status(200).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: {
        user: user.toSafeObject()
      }
    });
  } catch (error) {
    console.error('Course enrollment error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to enroll in course'
    });
  }
});

// @route   PUT /api/users/:id/courses/:courseId/progress
// @desc    Update course progress
// @access  Private (Own profile or Admin)
router.put('/:id/courses/:courseId/progress', protect, authorizeOwnershipOrAdmin, [
  body('progress').isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array()
      });
    }

    const { progress } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Find the enrolled course
    const enrolledCourse = user.educationalProfile.enrolledCourses.find(
      course => course.courseId.toString() === req.params.courseId
    );

    if (!enrolledCourse) {
      return res.status(404).json({
        success: false,
        error: 'Enrollment not found'
      });
    }

    // Update progress
    enrolledCourse.progress = progress;
    
    // Update status based on progress
    if (progress === 100) {
      enrolledCourse.status = 'completed';
      enrolledCourse.completionDate = new Date();
    } else if (progress > 0) {
      enrolledCourse.status = 'in-progress';
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Progress updated successfully',
      data: {
        progress: enrolledCourse.progress,
        status: enrolledCourse.status,
        completionDate: enrolledCourse.completionDate
      }
    });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to update progress'
    });
  }
});

// @route   POST /api/users/:id/skills
// @desc    Add skill to user profile
// @access  Private (Own profile or Admin)
router.post('/:id/skills', protect, authorizeOwnershipOrAdmin, [
  body('name').trim().isLength({ min: 1, max: 50 }).withMessage('Skill name is required and must be less than 50 characters'),
  body('level').isIn(['beginner', 'intermediate', 'advanced', 'expert']).withMessage('Invalid skill level')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array()
      });
    }

    const { name, level } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if skill already exists
    const existingSkill = user.educationalProfile.skills.find(
      skill => skill.name.toLowerCase() === name.toLowerCase()
    );

    if (existingSkill) {
      // Update existing skill
      existingSkill.level = level;
    } else {
      // Add new skill
      user.educationalProfile.skills.push({
        name: name,
        level: level,
        verified: false
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Skill added/updated successfully',
      data: {
        skills: user.educationalProfile.skills
      }
    });
  } catch (error) {
    console.error('Add skill error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to add skill'
    });
  }
});

// @route   POST /api/users/:id/achievements
// @desc    Add achievement to user profile
// @access  Private (Own profile or Admin)
router.post('/:id/achievements', protect, authorizeOwnershipOrAdmin, [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Achievement title is required'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  body('category').optional().isIn(['academic', 'project', 'competition', 'certification', 'other'])
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array()
      });
    }

    const { title, description, category = 'other' } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Add achievement
    user.educationalProfile.achievements.push({
      title: title,
      description: description,
      dateEarned: new Date(),
      category: category
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Achievement added successfully',
      data: {
        achievements: user.educationalProfile.achievements
      }
    });
  } catch (error) {
    console.error('Add achievement error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to add achievement'
    });
  }
});

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = {};
    if (req.query.role) {
      query.role = req.query.role;
    }
    if (req.query.search) {
      query.$or = [
        { 'profile.firstName': { $regex: req.query.search, $options: 'i' } },
        { 'profile.lastName': { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password -passwordResetToken -passwordResetExpires -emailVerificationToken')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total: total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to get users'
    });
  }
});

module.exports = router;
