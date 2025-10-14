const express = require('express');
const router = express.Router();
// MongoDB/Mongoose removed. Add MySQL logic here as needed.

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics (Admin only)
// @access  Private
router.get('/dashboard', async (req, res) => {
  try {
  // TODO: Replace with MySQL queries for dashboard statistics

    // Get current date ranges
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Contact statistics
    const contactStats = {};

    // Course statistics
    const courseStats = {};

    // Enrollment statistics
    const enrollmentStats = {};

    // Testimonial statistics
    const testimonialStats = {};

    // Recent activities
    const recentContacts = [];
    const recentEnrollments = [];
    const popularCourses = [];
    const enrollmentTrends = [];
    const contactTrends = [];

    res.json({
      success: true,
      data: {
        statistics: {
          contacts: contactStats,
          courses: courseStats,
          enrollments: enrollmentStats,
          testimonials: testimonialStats
        },
        recentActivities: {
          contacts: recentContacts,
          enrollments: recentEnrollments
        },
        analytics: {
          popularCourses,
          enrollmentTrends,
          contactTrends
        },
        lastUpdated: new Date()
      }
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve dashboard statistics'
    });
  }
});

// @route   GET /api/admin/reports/enrollments
// @desc    Get enrollment reports with filters (Admin only)
// @access  Private
router.get('/reports/enrollments', async (req, res) => {
  try {
    const { startDate, endDate, courseId, status } = req.query;

    // Build query
    let query = {};
    if (startDate && endDate) {
      query.enrollmentDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    if (courseId) query.courseId = courseId;
    if (status) query.status = status;

    const Enrollment = mongoose.model('Enrollment');
    
    const enrollments = await Enrollment.find(query)
      .populate('courseId', 'title category fee')
      .sort({ enrollmentDate: -1 })
      .select('studentInfo courseId enrollmentDate status paymentInfo');

    // Summary statistics
    const summary = {
      totalEnrollments: enrollments.length,
      totalRevenue: enrollments.reduce((sum, e) => sum + e.paymentInfo.totalAmount, 0),
      paidRevenue: enrollments.reduce((sum, e) => sum + e.paymentInfo.paidAmount, 0),
      byStatus: enrollments.reduce((acc, e) => {
        acc[e.status] = (acc[e.status] || 0) + 1;
        return acc;
      }, {}),
      byPaymentStatus: enrollments.reduce((acc, e) => {
        acc[e.paymentStatus] = (acc[e.paymentStatus] || 0) + 1;
        return acc;
      }, {})
    };

    res.json({
      success: true,
      data: {
        enrollments,
        summary,
        filters: req.query,
        generatedAt: new Date()
      }
    });

  } catch (error) {
    console.error('Get enrollment report error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to generate enrollment report'
    });
  }
});

// @route   GET /api/admin/reports/revenue
// @desc    Get revenue reports (Admin only)
// @access  Private
router.get('/reports/revenue', async (req, res) => {
  try {
    const { startDate, endDate, groupBy = 'month' } = req.query;

    // Build date query
    let dateQuery = {};
    if (startDate && endDate) {
      dateQuery.enrollmentDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const Enrollment = mongoose.model('Enrollment');

    // Group by configuration
    let groupConfig;
    switch (groupBy) {
      case 'day':
        groupConfig = {
          year: { $year: '$enrollmentDate' },
          month: { $month: '$enrollmentDate' },
          day: { $dayOfMonth: '$enrollmentDate' }
        };
        break;
      case 'week':
        groupConfig = {
          year: { $year: '$enrollmentDate' },
          week: { $week: '$enrollmentDate' }
        };
        break;
      default: // month
        groupConfig = {
          year: { $year: '$enrollmentDate' },
          month: { $month: '$enrollmentDate' }
        };
    }

    const revenueData = await Enrollment.aggregate([
      { $match: dateQuery },
      {
        $group: {
          _id: groupConfig,
          totalRevenue: { $sum: '$paymentInfo.totalAmount' },
          paidRevenue: { $sum: '$paymentInfo.paidAmount' },
          enrollmentCount: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.week': 1 } }
    ]);

    // Revenue by course category
    const categoryRevenue = await Enrollment.aggregate([
      { $match: dateQuery },
      {
        $lookup: {
          from: 'courses',
          localField: 'courseId',
          foreignField: '_id',
          as: 'course'
        }
      },
      { $unwind: '$course' },
      {
        $group: {
          _id: '$course.category',
          totalRevenue: { $sum: '$paymentInfo.totalAmount' },
          paidRevenue: { $sum: '$paymentInfo.paidAmount' },
          enrollmentCount: { $sum: 1 }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    const totalSummary = revenueData.reduce(
      (acc, item) => ({
        totalRevenue: acc.totalRevenue + item.totalRevenue,
        paidRevenue: acc.paidRevenue + item.paidRevenue,
        enrollmentCount: acc.enrollmentCount + item.enrollmentCount
      }),
      { totalRevenue: 0, paidRevenue: 0, enrollmentCount: 0 }
    );

    res.json({
      success: true,
      data: {
        summary: totalSummary,
        trends: revenueData,
        byCategory: categoryRevenue,
        filters: req.query,
        generatedAt: new Date()
      }
    });

  } catch (error) {
    console.error('Get revenue report error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to generate revenue report'
    });
  }
});

// @route   POST /api/admin/seed-data
// @desc    Seed database with sample data (Development only)
// @access  Private
router.post('/seed-data', async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        error: 'Seed data operation not allowed in production'
      });
    }

    const Course = mongoose.model('Course');
    const Contact = mongoose.model('Contact');
    const Testimonial = mongoose.model('Testimonial');

    // Sample courses
    const sampleCourses = [
      {
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB in this comprehensive web development course. Perfect for beginners who want to become full-stack developers.',
        shortDescription: 'Full-stack web development course covering modern technologies',
        category: 'Web Development',
        level: 'Beginner',
        duration: { weeks: 16, hoursPerWeek: 15 },
        fee: { amount: 25000, currency: 'NPR' },
        instructor: {
          name: 'Rajesh Sharma',
          qualification: 'M.Sc. Computer Science',
          experience: '5+ years in web development'
        },
        schedule: {
          days: ['Sunday', 'Tuesday', 'Thursday'],
          timeSlots: [{ start: '10:00', end: '12:00' }]
        },
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-05-15'),
        registrationDeadline: new Date('2024-01-10'),
        status: 'published',
        featured: true,
        learningOutcomes: [
          'Build responsive websites from scratch',
          'Create dynamic web applications',
          'Work with databases and APIs',
          'Deploy applications to production'
        ],
        prerequisites: ['Basic computer knowledge'],
        tags: ['html', 'css', 'javascript', 'react', 'nodejs']
      },
      {
        title: 'Advanced Graphics Design with Adobe Creative Suite',
        description: 'Master Photoshop, Illustrator, and InDesign to create stunning visual designs. Learn logo design, branding, print design, and digital graphics.',
        shortDescription: 'Professional graphics design course with Adobe Creative Suite',
        category: 'Graphics Design',
        level: 'Intermediate',
        duration: { weeks: 12, hoursPerWeek: 10 },
        fee: { amount: 18000, currency: 'NPR' },
        instructor: {
          name: 'Sita Gurung',
          qualification: 'Bachelor in Fine Arts',
          experience: '8+ years in graphic design'
        },
        schedule: {
          days: ['Monday', 'Wednesday', 'Friday'],
          timeSlots: [{ start: '14:00', end: '16:00' }]
        },
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-04-30'),
        registrationDeadline: new Date('2024-01-25'),
        status: 'published',
        featured: true,
        learningOutcomes: [
          'Create professional logos and branding materials',
          'Design print and digital advertisements',
          'Master color theory and typography',
          'Build a professional design portfolio'
        ]
      },
      {
        title: 'Digital Marketing Mastery',
        description: 'Learn SEO, social media marketing, Google Ads, email marketing, and content marketing to grow businesses online.',
        shortDescription: 'Comprehensive digital marketing course for modern businesses',
        category: 'Digital Marketing',
        level: 'Beginner',
        duration: { weeks: 10, hoursPerWeek: 8 },
        fee: { amount: 15000, currency: 'NPR' },
        instructor: {
          name: 'Amit Thapa',
          qualification: 'MBA Marketing',
          experience: '6+ years in digital marketing'
        },
        schedule: {
          days: ['Saturday', 'Sunday'],
          timeSlots: [{ start: '09:00', end: '13:00' }]
        },
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-04-01'),
        registrationDeadline: new Date('2024-01-15'),
        status: 'published',
        learningOutcomes: [
          'Develop effective digital marketing strategies',
          'Run successful Google Ads campaigns',
          'Create engaging social media content',
          'Analyze marketing performance with analytics'
        ]
      }
    ];

    // Clear existing data (only in development)
    await Course.deleteMany({});
    await Contact.deleteMany({});
    await Testimonial.deleteMany({});

    // Insert sample courses
    const createdCourses = await Course.insertMany(sampleCourses);

    // Sample contacts
    const sampleContacts = [
      {
        name: 'Ram Bahadur',
        email: 'ram@example.com',
        phone: '+977-9841234567',
        subject: 'Inquiry about Web Development Course',
        message: 'I am interested in the web development course. Can you provide more details about the curriculum and schedule?',
        status: 'pending'
      },
      {
        name: 'Maya Devi',
        email: 'maya@example.com',
        phone: '+977-9851234568',
        subject: 'Graphics Design Course Enrollment',
        message: 'I would like to enroll in the graphics design course. What are the prerequisites and fee structure?',
        status: 'read'
      }
    ];

    await Contact.insertMany(sampleContacts);

    // Sample testimonials
    const sampleTestimonials = [
      {
        name: 'Prakash Shrestha',
        email: 'prakash@example.com',
        course: 'Web Development',
        graduationYear: 2023,
        rating: 5,
        comment: 'Excellent course with practical approach. The instructors were very helpful and the curriculum was up-to-date with industry standards.',
        currentPosition: {
          jobTitle: 'Frontend Developer',
          company: 'Tech Solutions Pvt. Ltd.',
          location: 'Kathmandu'
        },
        status: 'approved',
        featured: true
      },
      {
        name: 'Sunita Maharjan',
        email: 'sunita@example.com',
        course: 'Graphics Design',
        graduationYear: 2023,
        rating: 5,
        comment: 'Great learning experience! I learned so much about design principles and Adobe Creative Suite. Got a job right after completion.',
        currentPosition: {
          jobTitle: 'Graphic Designer',
          company: 'Creative Agency',
          location: 'Pokhara'
        },
        status: 'approved',
        featured: true
      }
    ];

    await Testimonial.insertMany(sampleTestimonials);

    res.json({
      success: true,
      message: 'Sample data seeded successfully',
      data: {
        courses: createdCourses.length,
        contacts: sampleContacts.length,
        testimonials: sampleTestimonials.length
      }
    });

  } catch (error) {
    console.error('Seed data error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to seed data'
    });
  }
});

module.exports = router;
