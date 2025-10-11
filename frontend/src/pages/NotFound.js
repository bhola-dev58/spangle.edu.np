import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="text-center animate-fade-in-up">
              <h1 className="text-7xl font-extrabold text-blue-900 dark:text-yellow-300 mb-4">404</h1>
              <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-200 mb-2">Page Not Found</h2>
              <p className="text-lg text-blue-800 dark:text-blue-200 mb-6">Sorry, the page you are looking for does not exist.</p>
              <Link to="/" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">Go to Home</Link>
            </div>
          </div>
  );
};

export default NotFound;
