import React from 'react';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-black py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">About Spangle Education</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Spangle Education and Computer Institute Pvt. Ltd. was established with a vision to provide quality education and computer training to students in Siddharthanagar and surrounding areas. Our institute is committed to empowering students with the knowledge and skills they need to succeed in today's digital world.
            </p>
            <p className="text-gray-600 mb-6">
              Located in the heart of Siddharthanagar-13, Devkota Chowk, Rupandehi, we have been serving the community with dedication and excellence. Our modern facilities and experienced faculty ensure that every student receives the best possible education and training.
            </p>

            <h2 className="text-3xl font-bold mb-8 mt-12">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              To provide accessible, quality education and computer training that prepares students for academic and professional success. We aim to bridge the digital divide and create opportunities for all students to excel in their chosen fields.
            </p>

            <h2 className="text-3xl font-bold mb-8 mt-12">Our Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Modern Computer Labs</h3>
                <p className="text-gray-600">
                  State-of-the-art computer labs equipped with the latest hardware and software for optimal learning experience.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Expert Faculty</h3>
                <p className="text-gray-600">
                  Our team of experienced and qualified instructors is dedicated to providing quality education and guidance.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Learning Resources</h3>
                <p className="text-gray-600">
                  Comprehensive study materials and resources to support student learning and development.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Career Support</h3>
                <p className="text-gray-600">
                  Guidance and support for career development and job placement assistance for our graduates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 