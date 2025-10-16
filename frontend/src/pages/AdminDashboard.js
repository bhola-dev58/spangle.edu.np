import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', duration: '', fee: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/courses`);
      setCourses(res.data);
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/courses/${editingId}`, form);
        setNotification({ type: 'success', message: 'Course updated successfully' });
      } else {
        await axios.post(`${API_URL}/courses`, form);
        setNotification({ type: 'success', message: 'Course created successfully' });
      }
      setForm({ title: '', description: '', duration: '', fee: '' });
      setEditingId(null);
      fetchCourses();
    } catch (err) {
      setError('Failed to save course');
      setNotification({ type: 'error', message: 'Failed to save course' });
    }
  };

  const handleEdit = course => {
    setForm({
      title: course.title,
      description: course.description,
      duration: course.duration,
      fee: course.fee
    });
    setEditingId(course.id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await axios.delete(`${API_URL}/courses/${id}`);
      setNotification({ type: 'success', message: 'Course deleted successfully' });
      fetchCourses();
    } catch (err) {
      setError('Failed to delete course');
      setNotification({ type: 'error', message: 'Failed to delete course' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      {notification && (
        <div className="fixed top-20 inset-x-0 z-50 flex justify-center">
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        </div>
      )}
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <nav className="flex-1">
          <ul>
            <li className="mb-4 font-semibold">Courses</li>
            {/* Add more nav items here */}
          </ul>
        </nav>
        <div className="mt-auto text-xs text-blue-200">&copy; {new Date().getFullYear()} Spangle</div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-900 dark:text-yellow-300">Manage Courses</h1>
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
        {/* Add/Edit Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 max-w-2xl border border-blue-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g., Office Package" className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">Duration</label>
              <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g., 3 Months" className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">Fee</label>
              <input name="fee" value={form.fee} onChange={handleChange} placeholder="e.g., 3500" className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short description..." className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[90px]" required />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold shadow hover:opacity-95 active:opacity-90 transition">
              {editingId ? 'Update' : 'Add'} Course
            </button>
            {editingId && (
              <button type="button" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition" onClick={() => { setEditingId(null); setForm({ title: '', description: '', duration: '', fee: '' }); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
        {/* Courses Table */}
        {loading ? (
          <div className="flex items-center gap-3 text-blue-900 dark:text-blue-200"><LoadingSpinner /> Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-100 dark:border-gray-700">
              <thead>
                <tr className="text-left text-blue-900 dark:text-blue-200">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Fee</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id} className="border-t border-blue-50 dark:border-gray-700">
                    <td className="px-4 py-3 font-semibold text-blue-900 dark:text-yellow-300">{course.title}</td>
                    <td className="px-4 py-3 text-blue-800 dark:text-blue-200">{course.description}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{course.duration}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{course.fee}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-yellow-500/90 text-white text-sm hover:bg-yellow-500 transition" onClick={() => handleEdit(course)}>Edit</button>
                        <button className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition" onClick={() => handleDelete(course.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
