import React from 'react';

// Static frontend-only course data
const staticCourses = [
  {
    id: 1,
    title: 'Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, and React to build modern web applications.',
    duration: '3 months',
    fee: 'Rs. 10,000',
  },
  {
    id: 2,
    title: 'Python Programming',
    description: 'Master Python for data science, automation, and backend development.',
    duration: '2 months',
    fee: 'Rs. 8,000',
  },
  {
    id: 3,
    title: 'Graphic Design Essentials',
    description: 'Learn Photoshop, Illustrator, and design principles for creative projects.',
    duration: '1.5 months',
    fee: 'Rs. 7,000',
  },
];

const Courses = () => {
  const courses = staticCourses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-900 dark:text-yellow-300 mb-3">Our Courses</h1>
          <p className="text-lg text-blue-700 dark:text-blue-200">Explore and enroll in our latest offerings</p>
          {/* Refresh Courses button removed since fetchCourses no longer exists */}
        </div>

        {/* Loading and error states removed for frontend-only static data */}
        {courses.length === 0 && (
          <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 text-blue-800 dark:text-blue-200 px-6 py-8 rounded-2xl shadow text-center">No courses available yet.</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 h-2" />
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-blue-900 dark:text-yellow-300 mb-2">{course.title}</h3>
                <p className="text-blue-800 dark:text-blue-200 mb-4 line-clamp-3">{course.description}</p>
                <div className="mt-auto space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div><span className="font-semibold">Duration:</span> {course.duration || 'N/A'}</div>
                  <div><span className="font-semibold">Fee:</span> {course.fee || 'N/A'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;