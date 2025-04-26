import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-dark-DEFAULT text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Spangle Education</h3>
            <p className="text-gray-400">
              Education and Computer Institute Pvt. Ltd.
            </p>
            <p className="text-gray-400 mt-2">
              Empowering students with quality education and computer training since its establishment.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>Siddharthanagar-13, Devkota Chowk<br />Rupandehi, Nepal</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>+977-XXXXXXXXXX</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                <span>info@spangle.edu.np</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Sunday - Friday: 6:00 AM - 6:00 PM</li>
              <li>Saturday: 6:00 AM - 2:00 PM</li>
              <li>Public Holidays: Closed</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Spangle Education and Computer Institute Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 