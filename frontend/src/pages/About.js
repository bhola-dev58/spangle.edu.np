import React from 'react';
import team from '../data/team';
import { StaffCard } from '../components/ImageCard';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-12 shadow-lg w-full">
        <div className="container mx-auto px-2 max-w-screen-xl">
          <h1 className="text-6xl font-extrabold text-center mb-4 animate-fade-in-up">About Spangle Education</h1>
          <p className="text-lg text-center text-blue-100 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay:'0.2s'}}>Empowering students with quality education and computer training in Siddharthanagar.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-blue-100 shadow-xl p-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-8 text-blue-700">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Spangle Education and Computer Institute Pvt. Ltd. was established with a vision to provide quality education and computer training to students in Siddharthanagar and surrounding areas. Our institute is committed to empowering students with the knowledge and skills they need to succeed in today's digital world.
            </p>
            <p className="text-gray-700 mb-6">
              Located in the heart of Siddharthanagar-13, Devkota Chowk, Rupandehi, we have been serving the community with dedication and excellence. Our modern facilities and experienced faculty ensure that every student receives the best possible education and training.
            </p>

            <h2 className="text-3xl font-bold mb-8 mt-12 text-blue-700">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              To provide accessible, quality education and computer training that prepares students for academic and professional success. We aim to bridge the digital divide and create opportunities for all students to excel in their chosen fields.
            </p>

            <h2 className="text-3xl font-bold mb-8 mt-12 text-blue-700">Our Facilities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-4">Modern Computer Labs</h3>
                <p className="text-gray-600">
                  State-of-the-art computer labs equipped with the latest hardware and software for optimal learning experience.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-4">Expert Faculty</h3>
                <p className="text-gray-600">
                  Our team of experienced and qualified instructors is dedicated to providing quality education and guidance.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-4">Learning Resources</h3>
                <p className="text-gray-600">
                  Comprehensive study materials and resources to support student learning and development.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-4">Career Support</h3>
                <p className="text-gray-600">
                  Guidance and support for career development and job placement assistance for our graduates.
                </p>
              </div>
            </div>
          


          
        {/* </div> */}
      </section>
      <section className="bg-blue-100 rounded-2xl shadow-xl p-8 animate-fade-in-up">
                  {/* Meet Our Expert Team Section */}
          
            <h2 className="text-4xl font-bold text-center mb-4 text-blue-900 animate-fade-in-up">Meet Our Expert Team</h2>
            <p className="text-lg text-center text-blue-700 mb-10 animate-fade-in-up" style={{animationDelay:'0.2s'}}>Our dedicated staff members bring years of experience and passion for education to help you achieve your academic goals.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {team.map((staff) => (
                <StaffCard key={staff.name} staff={staff} imageHeight="h-100" />
              ))}
            </div>
        </section>
    </div>
  );
};

export default About; 