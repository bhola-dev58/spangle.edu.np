import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    profile: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      phone: ''
    }
  });
  // ...component logic (useState, useEffect, handlers, etc.)...
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-indigo-400 to-pink-400 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 py-8 px-2 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center legend-card">
          <div className="flex flex-col items-center mb-6">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg legend-glow">
              <svg className="h-8 w-8 text-white dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight legend-title">
              Create your account
            </h2>
            <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400 legend-subtitle">
              Join <span className="font-bold text-primary-600 dark:text-primary-400">Spangle Education Institute</span>
            </p>
          </div>
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            {/* ...form fields and buttons as above... */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
