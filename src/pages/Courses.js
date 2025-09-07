import React from 'react';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'Basic Computer Course',
      duration: '3 months',
      description: 'Learn fundamental computer skills including MS Office, Internet, and basic troubleshooting.',
      fee: 'Rs. 5,000'
    },
    {
      id: 2,
      title: 'Advanced Computer Course',
      duration: '6 months',
      description: 'Advanced computer applications, programming basics, and system administration.',
      fee: 'Rs. 10,000'
    },
    {
      id: 3,
      title: 'Web Development',
      duration: '4 months',
      description: 'Learn HTML, CSS, JavaScript, and modern web development frameworks.',
      fee: 'Rs. 15,000'
    },
    {
      id: 4,
      title: 'Graphic Design',
      duration: '3 months',
      description: 'Master Adobe Photoshop, Illustrator, and CorelDRAW for professional design work.',
      fee: 'Rs. 12,000'
    },
    {
      id: 5,
      title: 'Digital Marketing',
      duration: '3 months',
      description: 'Learn SEO, social media marketing, and online advertising strategies.',
      fee: 'Rs. 8,000'
    },
    {
      id: 6,
      title: 'Computer Hardware & Networking',
      duration: '6 months',
      description: 'Comprehensive training in computer hardware, networking, and system maintenance.',
      fee: 'Rs. 15,000'
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Our Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>Duration: {course.duration}</span>
                  <span>Fee: {course.fee}</span>
                </div>
                <button className="w-full btn btn-primary">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses; 