import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  UserGroupIcon, 
  StarIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  CurrencyDollarIcon,
  SignalIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { getAllCourses, addEnrollment } from '../firebase/firestoreService';
import LoadingSpinner from '../components/LoadingSpinner';
import EnrollmentForm from '../components/EnrollmentForm';
import Notification from '../components/Notification';

// Static courses data as fallback (import from Courses.js if needed)
const staticCourses = [
  {
    id: 1,
    title: 'Office Package (Basic Course)',
    description: 'Fundamental of Computer, Typing (English & Nepali), MS Office Suite, Email/Internet, Document printing & scanning',
    instructor: 'Expert Instructor',
    level: 'Beginner',
    price: 3500,
    rating: 4.8,
    reviews: 245,
    category: 'Computer Courses',
    skillLevel: 'Beginner',
    image: '💼',
    isBestSeller: true,
    duration: '3 months',
    syllabus: ['Fundamental of Computer', 'Typing (English & Nepali)', 'Notepad / Wordpad', 'Ms-paint', 'Ms-word', 'Ms-Excel', 'Ms-Powerpoint', 'Email / Internet', 'Software Installation', 'Multimedia', 'Virus and Antiviruses', 'Document printing & scanning'],
    learnMoreDetails: 'This comprehensive basic computer course is designed for beginners who want to build a strong foundation in computer skills. You will learn everything from basic computer operations to creating professional documents, spreadsheets, and presentations. Our experienced instructors will guide you through hands-on practical sessions to ensure you gain confidence in using computers for personal and professional purposes.'
  }
  // Add more courses or fetch from Firebase
];

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const loadCourse = async () => {
      try {
        // Try to fetch from Firebase first
        const firebaseCourses = await getAllCourses();
        let foundCourse = firebaseCourses.find(c => c.id === courseId || c.id === parseInt(courseId));
        
        // Fallback to static courses
        if (!foundCourse) {
          foundCourse = staticCourses.find(c => c.id === parseInt(courseId));
        }
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          // Course not found
          setNotification({
            show: true,
            message: 'Course not found',
            type: 'error'
          });
          setTimeout(() => navigate('/courses'), 2000);
        }
      } catch (error) {
        console.error('Error loading course:', error);
        // Fallback to static courses
        const foundCourse = staticCourses.find(c => c.id === parseInt(courseId));
        if (foundCourse) {
          setCourse(foundCourse);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId, navigate]);

  const handleEnrollSubmit = async (enrollmentData) => {
    try {
      await addEnrollment(enrollmentData);
      setNotification({
        show: true,
        message: 'Enrollment submitted successfully! We will contact you soon.',
        type: 'success'
      });
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000);
    } catch (error) {
      setNotification({
        show: true,
        message: 'Failed to submit enrollment. Please try again.',
        type: 'error'
      });
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Course not found</p>
          <button 
            onClick={() => navigate('/courses')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button 
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-white hover:text-blue-100 mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Courses</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                {course.isBestSeller && (
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    BESTSELLER
                  </span>
                )}
                {course.isFree && (
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    FREE
                  </span>
                )}
                <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {course.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-blue-100 mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400 font-bold text-lg">{course.rating}</span>
                    <div className="flex ml-1">
                      {[...Array(5)].map((_, i) => (
                        i < Math.floor(course.rating) ? (
                          <StarSolid key={i} className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                        )
                      ))}
                    </div>
                  </div>
                  <span className="text-blue-100">({course.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5" />
                  <span>{course.reviews}+ students enrolled</span>
                </div>

                <div className="flex items-center gap-2">
                  <AcademicCapIcon className="w-5 h-5" />
                  <span>By {course.instructor}</span>
                </div>
              </div>
            </div>

            {/* Right: Course Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden sticky top-24">
                {/* Course Image */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 h-48 flex items-center justify-center">
                  <span className="text-8xl">{course.image}</span>
                </div>

                {/* Price & Enrollment */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {course.isFree ? 'FREE' : `₹${course.price?.toLocaleString()}`}
                    </div>
                    {!course.isFree && course.price && (
                      <p className="text-sm text-gray-500">One-time payment</p>
                    )}
                  </div>

                  <button 
                    onClick={() => setIsEnrollModalOpen(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl mb-3"
                  >
                    Enroll Now
                  </button>

                  <p className="text-xs text-center text-gray-500 mb-4">
                    30-day money-back guarantee
                  </p>

                  {/* Course Highlights */}
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3">This course includes:</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <ClockIcon className="w-5 h-5 text-gray-400" />
                      <span>{course.duration} duration</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <SignalIcon className="w-5 h-5 text-gray-400" />
                      <span>{course.level} level</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <AcademicCapIcon className="w-5 h-5 text-gray-400" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
                      <span>Affordable pricing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h2>
              {course.learnMoreDetails ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {course.learnMoreDetails}
                </p>
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {course.description}
                </p>
              )}
            </div>

            {/* Course Content / Syllabus */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
              <div className="space-y-2">
                {course.syllabus && course.syllabus.length > 0 ? (
                  course.syllabus.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Syllabus will be updated soon.</p>
                )}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic understanding of computers (for beginner courses)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Enthusiasm to learn and practice</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">No prior experience required</span>
                </li>
              </ul>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Welcome to {course.title}! This course is designed to provide you with comprehensive knowledge
                  and practical skills in {course.category.toLowerCase()}.
                </p>
                <p className="mb-4">
                  With our experienced instructors and hands-on approach, you'll gain the confidence and expertise
                  needed to excel in your chosen field. Our curriculum is regularly updated to reflect the latest
                  industry trends and best practices.
                </p>
                <p>
                  Join thousands of satisfied students who have successfully completed this course and advanced
                  their careers. Enroll today and take the first step towards achieving your goals!
                </p>
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructor</h2>
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  {course.instructor.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{course.instructor}</h3>
                  <p className="text-gray-600 mb-3">Professional Instructor</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <StarSolid className="w-4 h-4 text-yellow-400" />
                      <span>{course.rating} Instructor Rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UserGroupIcon className="w-4 h-4" />
                      <span>{course.reviews}+ Students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sidebar (empty space for desktop, hidden on mobile) */}
          <div className="lg:col-span-1 hidden lg:block">
            {/* The enrollment card is sticky in the header on desktop */}
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {course && (
        <EnrollmentForm
          isOpen={isEnrollModalOpen}
          onClose={() => setIsEnrollModalOpen(false)}
          course={course}
          onSubmit={handleEnrollSubmit}
        />
      )}

      {/* Notification */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default CourseDetail;
