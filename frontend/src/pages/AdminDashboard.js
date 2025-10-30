import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';
import {
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getAllStaff,
  addStaff,
  updateStaff,
  deleteStaff,
  getAllMessages,
  deleteMessage,
  updateMessageStatus,
  getAllSubscribers,
  deleteSubscriber
} from '../firebase/firestoreService';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');
  const [notification, setNotification] = useState(null);

  // Course Form State
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    instructor: '',
    level: 'Beginner',
    price: '',
    duration: '',
    category: 'Computer Courses',
    skillLevel: 'Beginner',
    rating: '4.5',
    reviews: '0',
    image: '💻',
    isBestSeller: false,
    isFree: false,
    syllabus: ''
  });
  const [editingCourseId, setEditingCourseId] = useState(null);

  // Staff Form State
  const [staffForm, setStaffForm] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    department: 'Teaching',
    joiningDate: '',
    photo: '👨‍🏫'
  });
  const [editingStaffId, setEditingStaffId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  // Load data from Firebase
  const loadData = async () => {
    setLoading(true);
    try {
      const [coursesData, staffData, messagesData, subscribersData] = await Promise.all([
        getAllCourses(),
        getAllStaff(),
        getAllMessages(),
        getAllSubscribers()
      ]);
      setCourses(coursesData);
      setStaffs(staffData);
      setMessages(messagesData);
      setSubscribers(subscribersData);
    } catch (error) {
      console.error('Error loading data:', error);
      setNotification({ 
        type: 'error', 
        message: 'Failed to load data. Please check your Firebase configuration.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Course Handlers
  const handleCourseChange = e => {
    const { name, value, type, checked } = e.target;
    setCourseForm({
      ...courseForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const courseData = {
      ...courseForm,
      price: parseFloat(courseForm.price) || 0,
      rating: parseFloat(courseForm.rating) || 4.5,
      reviews: parseInt(courseForm.reviews) || 0,
      syllabus: courseForm.syllabus ? courseForm.syllabus.split(',').map(s => s.trim()) : []
    };

    try {
      if (editingCourseId) {
        await updateCourse(editingCourseId, courseData);
        setNotification({ type: 'success', message: 'Course updated successfully!' });
      } else {
        await addCourse(courseData);
        setNotification({ type: 'success', message: 'Course added successfully!' });
      }
      
      // Reload courses from Firebase
      const updatedCourses = await getAllCourses();
      setCourses(updatedCourses);
      resetCourseForm();
    } catch (error) {
      console.error('Error saving course:', error);
      setNotification({ type: 'error', message: 'Failed to save course. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCourseEdit = course => {
    setCourseForm({
      ...course,
      syllabus: Array.isArray(course.syllabus) ? course.syllabus.join(', ') : ''
    });
    setEditingCourseId(course.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCourseDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    setLoading(true);
    try {
      await deleteCourse(id);
      const updatedCourses = await getAllCourses();
      setCourses(updatedCourses);
      setNotification({ type: 'success', message: 'Course deleted successfully!' });
    } catch (error) {
      console.error('Error deleting course:', error);
      setNotification({ type: 'error', message: 'Failed to delete course. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: '',
      description: '',
      instructor: '',
      level: 'Beginner',
      price: '',
      duration: '',
      category: 'Computer Courses',
      skillLevel: 'Beginner',
      rating: '4.5',
      reviews: '0',
      image: '💻',
      isBestSeller: false,
      isFree: false,
      syllabus: ''
    });
    setEditingCourseId(null);
  };

  // Staff Handlers
  const handleStaffChange = e => {
    const { name, value } = e.target;
    setStaffForm({ ...staffForm, [name]: value });
  };

  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingStaffId) {
        await updateStaff(editingStaffId, staffForm);
        setNotification({ type: 'success', message: 'Staff updated successfully!' });
      } else {
        await addStaff(staffForm);
        setNotification({ type: 'success', message: 'Staff added successfully!' });
      }
      
      // Reload staff from Firebase
      const updatedStaffs = await getAllStaff();
      setStaffs(updatedStaffs);
      resetStaffForm();
    } catch (error) {
      console.error('Error saving staff:', error);
      setNotification({ type: 'error', message: 'Failed to save staff. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleStaffEdit = staff => {
    setStaffForm(staff);
    setEditingStaffId(staff.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStaffDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;
    
    setLoading(true);
    try {
      await deleteStaff(id);
      const updatedStaffs = await getAllStaff();
      setStaffs(updatedStaffs);
      setNotification({ type: 'success', message: 'Staff deleted successfully!' });
    } catch (error) {
      console.error('Error deleting staff:', error);
      setNotification({ type: 'error', message: 'Failed to delete staff. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const resetStaffForm = () => {
    setStaffForm({
      name: '',
      position: '',
      email: '',
      phone: '',
      department: 'Teaching',
      joiningDate: '',
      photo: '👨‍🏫'
    });
    setEditingStaffId(null);
  };

  // Message Handlers
  const handleMessageDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    setLoading(true);
    try {
      await deleteMessage(id);
      const updatedMessages = await getAllMessages();
      setMessages(updatedMessages);
      setNotification({ type: 'success', message: 'Message deleted successfully!' });
    } catch (error) {
      console.error('Error deleting message:', error);
      setNotification({ type: 'error', message: 'Failed to delete message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleMessageStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'read' ? 'unread' : 'read';
    setLoading(true);
    try {
      await updateMessageStatus(id, newStatus);
      const updatedMessages = await getAllMessages();
      setMessages(updatedMessages);
      setNotification({ type: 'success', message: `Message marked as ${newStatus}!` });
    } catch (error) {
      console.error('Error updating message status:', error);
      setNotification({ type: 'error', message: 'Failed to update message status.' });
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  // Subscriber Handlers
  const handleSubscriberDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;
    
    setLoading(true);
    try {
      await deleteSubscriber(id);
      const updatedSubscribers = await getAllSubscribers();
      setSubscribers(updatedSubscribers);
      setNotification({ type: 'success', message: 'Subscriber deleted successfully!' });
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      setNotification({ type: 'error', message: 'Failed to delete subscriber. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        </div>
      )}

      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">📚 Spangle Admin</div>
              <span className="text-sm text-gray-500">Management Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-2 font-semibold transition-colors relative ${
                activeTab === 'courses'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📖 Courses
              <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                {courses.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('staffs')}
              className={`py-4 px-2 font-semibold transition-colors relative ${
                activeTab === 'staffs'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              👥 Staffs
              <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                {staffs.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-2 font-semibold transition-colors relative ${
                activeTab === 'messages'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              💬 Messages
              <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                {messages.length}
              </span>
              {unreadCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                  {unreadCount} new
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`py-4 px-2 font-semibold transition-colors relative ${
                activeTab === 'subscribers'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📧 Subscribers
              <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                {subscribers.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'courses' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
              <p className="text-gray-600 text-sm mt-1">Add, edit or delete courses from your database</p>
            </div>

            {/* Course Form */}
            <form onSubmit={handleCourseSubmit} className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {editingCourseId ? '✏️ Edit Course' : '➕ Add New Course'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={courseForm.title}
                    onChange={handleCourseChange}
                    placeholder="Course Title"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor *</label>
                  <input
                    type="text"
                    name="instructor"
                    value={courseForm.instructor}
                    onChange={handleCourseChange}
                    placeholder="Instructor Name"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    name="category"
                    value={courseForm.category}
                    onChange={handleCourseChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option>Computer Courses</option>
                    <option>Accounting</option>
                    <option>Government Exam</option>
                    <option>Tuition</option>
                    <option>Language</option>
                    <option>Entrance</option>
                    <option>Study Abroad</option>
                    <option>CTEVT Preparation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level *</label>
                  <select
                    name="level"
                    value={courseForm.level}
                    onChange={handleCourseChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>All Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level *</label>
                  <select
                    name="skillLevel"
                    value={courseForm.skillLevel}
                    onChange={handleCourseChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>All Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    value={courseForm.duration}
                    onChange={handleCourseChange}
                    placeholder="e.g., 3 Months"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={courseForm.price}
                    onChange={handleCourseChange}
                    placeholder="0"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    value={courseForm.rating}
                    onChange={handleCourseChange}
                    placeholder="4.5"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reviews Count</label>
                  <input
                    type="number"
                    name="reviews"
                    value={courseForm.reviews}
                    onChange={handleCourseChange}
                    placeholder="0"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image (Emoji)</label>
                  <input
                    type="text"
                    name="image"
                    value={courseForm.image}
                    onChange={handleCourseChange}
                    placeholder="💻"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isBestSeller"
                      checked={courseForm.isBestSeller}
                      onChange={handleCourseChange}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Bestseller</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFree"
                      checked={courseForm.isFree}
                      onChange={handleCourseChange}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Free</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={courseForm.description}
                  onChange={handleCourseChange}
                  placeholder="Course description..."
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Syllabus (comma separated)</label>
                <textarea
                  name="syllabus"
                  value={courseForm.syllabus}
                  onChange={handleCourseChange}
                  placeholder="Topic 1, Topic 2, Topic 3..."
                  rows="2"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingCourseId ? 'Update Course' : 'Add Course'}
                </button>
                {editingCourseId && (
                  <button
                    type="button"
                    onClick={resetCourseForm}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* Courses List */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">All Courses ({courses.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Image</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Instructor</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Rating</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {courses.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                          No courses added yet. Add your first course above!
                        </td>
                      </tr>
                    ) : (
                      courses.map(course => (
                        <tr key={course.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <span className="text-2xl">{course.image}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-gray-900 text-sm">{course.title}</div>
                            <div className="text-xs text-gray-500 line-clamp-1">{course.description}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{course.category}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{course.instructor}</td>
                          <td className="px-4 py-3">
                            {course.isFree ? (
                              <span className="text-green-600 font-semibold text-sm">FREE</span>
                            ) : (
                              <span className="text-gray-900 font-semibold text-sm">₹{course.price}</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500 text-sm">★</span>
                              <span className="text-sm text-gray-700">{course.rating}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleCourseEdit(course)}
                                className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleCourseDelete(course.id)}
                                className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'staffs' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Manage Staff</h1>
              <p className="text-gray-600 text-sm mt-1">Add, edit or delete staff members from your database</p>
            </div>

            {/* Staff Form */}
            <form onSubmit={handleStaffSubmit} className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {editingStaffId ? '✏️ Edit Staff' : '➕ Add New Staff'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={staffForm.name}
                    onChange={handleStaffChange}
                    placeholder="Staff Name"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                  <input
                    type="text"
                    name="position"
                    value={staffForm.position}
                    onChange={handleStaffChange}
                    placeholder="e.g., Senior Teacher"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={staffForm.email}
                    onChange={handleStaffChange}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={staffForm.phone}
                    onChange={handleStaffChange}
                    placeholder="+977 9812345678"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <select
                    name="department"
                    value={staffForm.department}
                    onChange={handleStaffChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option>Teaching</option>
                    <option>Administration</option>
                    <option>IT Support</option>
                    <option>Counseling</option>
                    <option>Management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date *</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={staffForm.joiningDate}
                    onChange={handleStaffChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo (Emoji)</label>
                  <input
                    type="text"
                    name="photo"
                    value={staffForm.photo}
                    onChange={handleStaffChange}
                    placeholder="👨‍🏫"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingStaffId ? 'Update Staff' : 'Add Staff'}
                </button>
                {editingStaffId && (
                  <button
                    type="button"
                    onClick={resetStaffForm}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* Staff List */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">All Staff Members ({staffs.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Photo</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Position</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Department</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Contact</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Joining Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {staffs.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                          No staff members added yet. Add your first staff member above!
                        </td>
                      </tr>
                    ) : (
                      staffs.map(staff => (
                        <tr key={staff.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <span className="text-2xl">{staff.photo}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-gray-900 text-sm">{staff.name}</div>
                            <div className="text-xs text-gray-500">{staff.email}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{staff.position}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{staff.department}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{staff.phone}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{staff.joiningDate}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleStaffEdit(staff)}
                                className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleStaffDelete(staff.id)}
                                className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
                <p className="text-gray-600 text-sm mt-1">View and manage messages from your contact form</p>
              </div>
              {unreadCount > 0 && (
                <div className="bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
                  <span className="text-red-700 font-semibold text-sm">
                    🔔 {unreadCount} Unread Message{unreadCount > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>

            {/* Messages List */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Subject</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Message</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Contact</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {messages.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                          <div className="flex flex-col items-center gap-3">
                            <span className="text-5xl">📭</span>
                            <div>
                              <p className="font-semibold">No messages yet</p>
                              <p className="text-sm">Messages from your contact form will appear here</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      messages.map(message => (
                        <tr 
                          key={message.id} 
                          className={`hover:bg-gray-50 ${message.status === 'unread' ? 'bg-blue-50' : ''}`}
                        >
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleMessageStatusToggle(message.id, message.status)}
                              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                                message.status === 'unread'
                                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {message.status === 'unread' ? '🔵 Unread' : '✅ Read'}
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-gray-900 text-sm">{message.name}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-gray-700 font-medium">{message.subject}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-gray-600 max-w-xs truncate" title={message.message}>
                              {message.message}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-xs text-gray-700">
                              <div>📧 {message.email}</div>
                              {message.phone && <div className="mt-1">📱 {message.phone}</div>}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-xs text-gray-500">
                              {message.createdAt ? new Date(message.createdAt.seconds * 1000).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }) : 'Just now'}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <a
                                href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                                title="Reply via email"
                              >
                                Reply
                              </a>
                              <button
                                onClick={() => handleMessageDelete(message.id)}
                                className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Message Statistics */}
            {messages.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-gray-600">Total Messages</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">{messages.length}</div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-gray-600">Unread Messages</div>
                  <div className="text-2xl font-bold text-blue-600 mt-1">{unreadCount}</div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-gray-600">Read Messages</div>
                  <div className="text-2xl font-bold text-green-600 mt-1">
                    {messages.filter(msg => msg.status === 'read').length}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
              <p className="text-gray-600 text-sm mt-1">View and manage your email subscribers</p>
            </div>

            {/* Subscribers List */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">#</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Email Address</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Subscribed Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {subscribers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                          <div className="flex flex-col items-center gap-3">
                            <span className="text-5xl">📭</span>
                            <div>
                              <p className="font-semibold">No subscribers yet</p>
                              <p className="text-sm">Email subscribers from your website will appear here</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      subscribers.map((subscriber, index) => (
                        <tr key={subscriber.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">📧</span>
                              <span className="font-medium text-gray-900">{subscriber.email}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                              ✅ {subscriber.status || 'Active'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-xs text-gray-500">
                              {subscriber.createdAt ? new Date(subscriber.createdAt.seconds * 1000).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }) : 'Just now'}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <a
                                href={`mailto:${subscriber.email}?subject=Newsletter from Spangle Institute`}
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                                title="Send email"
                              >
                                Email
                              </a>
                              <button
                                onClick={() => handleSubscriberDelete(subscriber.id)}
                                className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subscriber Statistics */}
            {subscribers.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-gray-600">Total Subscribers</div>
                  <div className="text-2xl font-bold text-blue-600 mt-1">{subscribers.length}</div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-gray-600">Active Subscribers</div>
                  <div className="text-2xl font-bold text-green-600 mt-1">
                    {subscribers.filter(sub => sub.status === 'active').length}
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-sm text-gray-600">Latest Subscription</div>
                  <div className="text-sm font-medium text-gray-900 mt-1">
                    {subscribers[0]?.createdAt ? new Date(subscribers[0].createdAt.seconds * 1000).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }) : 'Today'}
                  </div>
                </div>
              </div>
            )}

            {/* Export/Action Buttons */}
            {subscribers.length > 0 && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    const emails = subscribers.map(sub => sub.email).join(', ');
                    navigator.clipboard.writeText(emails);
                    setNotification({ type: 'success', message: 'All email addresses copied to clipboard!' });
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📋 Copy All Emails
                </button>
                <button
                  onClick={() => {
                    const emails = subscribers.map(sub => sub.email).join(';');
                    window.location.href = `mailto:?bcc=${emails}&subject=Newsletter from Spangle Institute`;
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  ✉️ Send Bulk Email
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
