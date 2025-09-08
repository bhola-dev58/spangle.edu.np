import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ClockIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  CalendarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [enrollingCourse, setEnrollingCourse] = useState(null);
  
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/courses`, {
        credentials: 'include',
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setCourses(data.data || []);
      } else {
        throw new Error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setNotification({ type: 'error', message: 'Failed to load courses' });
      // Fallback to static courses if API fails
      setCourses([
        {
          _id: '1',
          title: 'Basic Computer Course',
          description: 'Learn fundamental computer skills including MS Office, Internet, and basic troubleshooting.',
          category: 'Computer Basics',
          level: 'Beginner',
          duration: { weeks: 12, hoursPerWeek: 6 },
          fee: { amount: 5000, currency: 'NPR' },
          status: 'published'
        },
        {
          _id: '2',
          title: 'Web Development Bootcamp',
          description: 'Learn HTML, CSS, JavaScript, and modern web development frameworks.',
          category: 'Web Development',
          level: 'Intermediate',
          duration: { weeks: 16, hoursPerWeek: 10 },
          fee: { amount: 15000, currency: 'NPR' },
          status: 'published'
        },
        {
          _id: '3',
          title: 'Graphic Design Mastery',
          description: 'Master Adobe Photoshop, Illustrator, and CorelDRAW for professional design work.',
          category: 'Graphic Design',
          level: 'Intermediate',
          duration: { weeks: 12, hoursPerWeek: 8 },
          fee: { amount: 12000, currency: 'NPR' },
          status: 'published'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!isAuthenticated) {
      setNotification({ type: 'error', message: 'Please login to enroll in courses' });
      return;
    }

    if (!user?._id) {
      setNotification({ type: 'error', message: 'User information not available' });
      return;
    }

    // Check if already enrolled
    const alreadyEnrolled = user.educationalProfile?.enrolledCourses?.some(
      course => course.courseId === courseId || course.courseId?._id === courseId
    );

    if (alreadyEnrolled) {
      setNotification({ type: 'info', message: 'You are already enrolled in this course' });
      return;
    }

    setEnrollingCourse(courseId);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${user._id}/enroll`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: courseId }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setNotification({ type: 'success', message: 'Successfully enrolled in course!' });
        // Update user context with new enrollment
        // This would ideally trigger a user data refresh
      } else {
        throw new Error(data.error || 'Failed to enroll in course');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      const errorMessage = error.message || 'Failed to enroll in course';
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setEnrollingCourse(null);
    }
  };

  const isEnrolled = (courseId) => {
    return user?.educationalProfile?.enrolledCourses?.some(
      course => course.courseId === courseId || course.courseId?._id === courseId
    );
  };

  const formatCurrency = (amount, currency = 'NPR') => {
    return `${currency === 'NPR' ? 'Rs.' : '$'} ${amount.toLocaleString()}`;
  };

  const getDurationText = (duration) => {
    if (typeof duration === 'string') return duration;
    if (duration?.weeks) {
      return `${duration.weeks} weeks (${duration.hoursPerWeek || 0} hrs/week)`;
    }
    return 'Duration varies';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-DEFAULT pt-20">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our comprehensive range of courses designed to enhance your skills and career prospects
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            const enrolled = isEnrolled(course._id);
            const isEnrolling = enrollingCourse === course._id;

            return (
              <div 
                key={course._id} 
                className="card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden stagger-animation card-hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Course Badge */}
                <div className="relative">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {course.level || 'All Levels'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Category */}
                  <div className="flex items-center space-x-2 mb-3">
                    <AcademicCapIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      {course.category || 'General'}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Course Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {getDurationText(course.duration)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatCurrency(course.fee?.amount || 0, course.fee?.currency)}
                      </span>
                    </div>
                    {course.startDate && (
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Starts {new Date(course.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Enrollment Button */}
                  <div className="flex space-x-3">
                    {enrolled ? (
                      <div className="flex-1 flex items-center justify-center px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                        <CheckCircleIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Enrolled</span>
                      </div>
                    ) : isAuthenticated ? (
                      <button
                        onClick={() => handleEnroll(course._id)}
                        disabled={isEnrolling}
                        className="flex-1 btn btn-primary text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isEnrolling ? (
                          <div className="flex items-center justify-center">
                            <LoadingSpinner size="sm" />
                            <span className="ml-2">Enrolling...</span>
                          </div>
                        ) : (
                          'Enroll Now'
                        )}
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="flex-1 btn btn-primary text-sm py-2 text-center"
                      >
                        Login to Enroll
                      </Link>
                    )}
                    
                    <Link
                      to={`/courses/${course._id}`}
                      className="px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {courses.length === 0 && (
          <div className="text-center py-12">
            <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No courses available</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Check back later for new course offerings.
            </p>
          </div>
        )}

        {/* Call to Action */}
        {!isAuthenticated && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-indigo-100 mb-6">
                Join thousands of students who have transformed their careers with our courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="btn btn-secondary px-8 py-3">
                  Sign Up Now
                </Link>
                <Link to="/contact" className="btn glass-effect text-white hover:bg-white/20 px-8 py-3">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses; 