import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({});

  const { user, isAuthenticated, loading, updateUser, error, clearErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        profile: {
          firstName: user.profile?.firstName || '',
          lastName: user.profile?.lastName || '',
          phone: user.profile?.phone || '',
          bio: user.profile?.bio || '',
          address: {
            street: user.profile?.address?.street || 'Devkota chowk',
            city: user.profile?.address?.city || 'Bhairahawa',
            state: user.profile?.address?.state || 'Lumbini',
            zipCode: user.profile?.address?.zipCode || '32900',
            country: user.profile?.address?.country || 'Nepal'
          }
        },
        educationalProfile: {
          academicLevel: user.educationalProfile?.academicLevel || '',
          institution: user.educationalProfile?.institution || '',
          specialization: user.educationalProfile?.specialization || ''
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      setNotification({ type: 'error', message: error });
      clearErrors();
    }
  }, [error, clearErrors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child, grandchild] = name.split('.');
      if (grandchild) {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [grandchild]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await updateUser(formData);
    
    if (result.success) {
      setIsEditing(false);
      setNotification({ type: 'success', message: 'Profile updated successfully!' });
    } else {
      setNotification({ type: 'error', message: result.error });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'enrolled': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'dropped': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Profile not found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Unable to load profile information.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: UserIcon },
    { id: 'courses', name: 'My Courses', icon: AcademicCapIcon },
    { id: 'settings', name: 'Settings', icon: PencilIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-indigo-900 pt-20">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 stagger-animation">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative float-animation">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold pulse-glow">
                {user.profile?.firstName?.[0] || user.email?.[0] || 'U'}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 card-hover-lift">
                <CameraIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.profile?.firstName} {user.profile?.lastName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              {user.educationalProfile?.studentId && (
                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                  Student ID: {user.educationalProfile.studentId}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  {user.role}
                </span>
                {user.educationalProfile?.academicLevel && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {user.educationalProfile.academicLevel.replace('-', ' ')}
                  </span>
                )}
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.educationalProfile?.enrolledCoursesCount || 0}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enrolled Courses</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="profile.firstName"
                            value={formData.profile?.firstName || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="profile.lastName"
                            value={formData.profile?.lastName || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="profile.phone"
                          value={formData.profile?.phone || ''}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Bio
                        </label>
                        <textarea
                          name="profile.bio"
                          value={formData.profile?.bio || ''}
                          onChange={handleInputChange}
                          rows={3}
                          className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm"
                        />
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="btn btn-outline"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">{user.email}</span>
                        </div>
                        {user.profile?.phone && (
                          <div className="flex items-center space-x-3">
                            <PhoneIcon className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">{user.profile.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-3">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">
                            Born {formatDate(user.profile?.dateOfBirth)}
                          </span>
                        </div>
                      </div>
                      <div>
                        {user.profile?.bio && (
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">About</h4>
                            <p className="text-gray-600 dark:text-gray-400">{user.profile.bio}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Educational Information */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Educational Background</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {user.educationalProfile?.academicLevel && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Academic Level</h4>
                          <p className="text-gray-600 dark:text-gray-400 capitalize">
                            {user.educationalProfile.academicLevel.replace('-', ' ')}
                          </p>
                        </div>
                      )}
                      {user.educationalProfile?.institution && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Previous Institution</h4>
                          <p className="text-gray-600 dark:text-gray-400">{user.educationalProfile.institution}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      {user.educationalProfile?.specialization && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Specialization</h4>
                          <p className="text-gray-600 dark:text-gray-400">{user.educationalProfile.specialization}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">My Courses</h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user.educationalProfile?.enrolledCoursesCount || 0} total courses
                  </div>
                </div>

                {user.educationalProfile?.enrolledCourses?.length > 0 ? (
                  <div className="space-y-4">
                    {user.educationalProfile.enrolledCourses.map((course, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {course.courseId?.title || 'Course Title'}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                            {course.status.replace('-', ' ')}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <span className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>Enrolled {formatDate(course.enrollmentDate)}</span>
                          </span>
                          {course.completionDate && (
                            <span className="flex items-center space-x-1">
                              <CheckCircleIcon className="h-4 w-4" />
                              <span>Completed {formatDate(course.completionDate)}</span>
                            </span>
                          )}
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="font-medium text-gray-900 dark:text-white">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {course.grade && (
                          <div className="text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Grade: </span>
                            <span className="font-medium text-gray-900 dark:text-white">{course.grade}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No courses enrolled</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Start your learning journey by enrolling in a course.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Account Settings</h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                          Settings Coming Soon
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                          <p>Advanced settings and preferences will be available in a future update.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
