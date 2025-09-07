import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-DEFAULT transition-colors duration-300">
      <div className="text-center px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-primary dark:text-primary-dark animate-pulse">404</h1>
        </div>
        
        <div className="mb-8 bg-white dark:bg-dark-light p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="btn bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Home
          </Link>
          <Link
            to="/courses"
            className="btn border-2 border-primary text-primary dark:text-primary-dark hover:bg-primary hover:text-white dark:border-primary-dark dark:hover:bg-primary-dark dark:hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            View Courses
          </Link>
        </div>

        <div className="mt-12 text-center bg-gray-100 dark:bg-dark-DEFAULT p-6 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            Need help? <Link to="/contact" className="text-primary dark:text-primary-dark hover:underline font-medium">Contact us</Link>
          </p>
        </div>

        {/* Decorative element */}
        <div className="mt-16 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-white text-3xl font-bold">S</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
