import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Spangle Education
            </h1>
            <p className="text-xl mb-8">
              Empowering students with quality education and computer training in Siddharthanagar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="btn bg-white text-primary hover:bg-gray-100"
              >
                Explore Courses
              </Link>
              <Link
                to="/contact"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Our Institute</h2>
            <p className="text-gray-600 mb-8">
              Spangle Education and Computer Institute Pvt. Ltd. is a premier educational institution located in Siddharthanagar-13, Devkota Chowk, Rupandehi. We are committed to providing quality education and computer training to help students achieve their academic and professional goals.
            </p>
            <Link to="/about" className="btn btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Spangle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Expert Faculty</h3>
              <p className="text-gray-600">
                Learn from experienced and qualified instructors dedicated to your success.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Modern Facilities</h3>
              <p className="text-gray-600">
                State-of-the-art computer labs and learning resources for optimal education.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Career Support</h3>
              <p className="text-gray-600">
                Comprehensive guidance and support for your academic and professional journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
            <p className="text-gray-600 mb-4">
              Siddharthanagar-13, Devkota Chowk<br />
              Rupandehi, Nepal
            </p>
            <Link to="/contact" className="btn btn-primary">
              Get Directions
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Educational Journey</h2>
          <p className="text-xl mb-8">
            Join our community of successful students and take the first step towards your future.
          </p>
          <Link to="/courses" className="btn btn-primary">
            Enroll Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 