import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { addSubscriber } from '../firebase/firestoreService';

const socialLinks = [
  { href: 'https://www.facebook.com/spangala.insticyuta.bhairahava', label: 'Facebook', icon: (
    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"/></svg>
  ) },
  { href: 'https://twitter.com/', label: 'Twitter', icon: (
    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.855 2.01-.855 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.418A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.212c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z"/></svg>
  ) },
  { href: 'https://instagram.com/', label: 'Instagram', icon: (
    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.282.292 2.394 1.272 3.374.98.98 2.092 1.213 3.374 1.272C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.282-.059 2.394-.292 3.374-1.272.98-.98 1.213-2.092 1.272-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.282-.292-2.394-1.272-3.374-.98-.98-2.092-1.213-3.374-1.272C15.668.013 15.259 0 12 0z"/><circle cx="12" cy="12" r="3.5"/></svg>
  ) },
];

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];


const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({ loading: false, message: '', type: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscribeStatus({ loading: false, message: 'Please enter a valid email address', type: 'error' });
      return;
    }

    setSubscribeStatus({ loading: true, message: '', type: '' });

    try {
      await addSubscriber(email);
      setSubscribeStatus({ 
        loading: false, 
        message: 'Successfully subscribed! Thank you!', 
        type: 'success' 
      });
      setEmail('');
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus({ loading: false, message: '', type: '' });
      }, 5000);
    } catch (error) {
      setSubscribeStatus({ 
        loading: false, 
        message: error.message || 'Failed to subscribe. Please try again.', 
        type: 'error' 
      });
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus({ loading: false, message: '', type: '' });
      }, 5000);
    }
  };

  return (
    <footer style={{ backgroundColor: '#1a1a1a' }} className="text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section - Logo & Tagline */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 mb-10 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="Spangle Logo" 
              className="w-16 h-16 rounded-full shadow-2xl border-4 border-orange-500 transition-transform duration-300 hover:scale-110 hover:rotate-6" 
            />
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Spangle Institute
              </h3>
              <p className="text-sm text-gray-300 mt-1">Empowering Minds, Building Futures</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group rounded-full p-3 bg-gray-700 text-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-orange-500/50"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="text-orange-500">●</span> Quick Links
            </h4>
            <nav aria-label="Footer Navigation">
              <ul className="space-y-3">
                {navLinks.map(link => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="text-gray-300 hover:text-orange-500 transition-all duration-200 hover:pl-2 inline-block group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="text-orange-500">●</span> Contact Us
            </h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3 hover:text-orange-500 transition-colors duration-200">
                <span className="text-xl mt-1">📍</span>
                <span className="text-sm leading-relaxed">Siddharthanagar-13, Devkota Chowk,<br />Rupandehi, Nepal</span>
              </li>
              <li className="flex items-center gap-3 hover:text-orange-500 transition-colors duration-200">
                <span className="text-xl">📞</span>
                <a href="tel:+9779804400140" className="text-sm">+977-9804400140</a>
              </li>
              <li className="flex items-center gap-3 hover:text-orange-500 transition-colors duration-200">
                <span className="text-xl">✉️</span>
                <a href="mailto:info@spangle.edu.np" className="text-sm">info@spangle.edu.np</a>
              </li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="text-orange-500">●</span> Office Hours
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex justify-between items-center p-2 bg-gray-700/50 rounded hover:bg-gray-700 transition-colors">
                <span className="font-medium text-white">Sun - Fri</span>
                <span className="text-orange-500">6:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between items-center p-2 bg-gray-700/50 rounded hover:bg-gray-700 transition-colors">
                <span className="font-medium text-white">Saturday</span>
                <span className="text-orange-500">6:00 AM - 2:00 PM</span>
              </li>
              <li className="flex justify-between items-center p-2 bg-gray-700/50 rounded hover:bg-gray-700 transition-colors">
                <span className="font-medium text-white">Holidays</span>
                <span className="text-red-400">Closed</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="text-orange-500">●</span> Stay Updated
            </h4>
            <p className="text-sm text-gray-300 mb-4">Subscribe to our newsletter for updates and news.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-200 text-black placeholder-gray-500"
                  required
                  disabled={subscribeStatus.loading}
                />
                <span className="absolute right-3 top-3 text-gray-500">✉️</span>
              </div>
              <button
                type="submit"
                disabled={subscribeStatus.loading}
                className={`w-full px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 ${
                  subscribeStatus.loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {subscribeStatus.loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  '🚀 Subscribe Now'
                )}
              </button>
            </form>
            
            {subscribeStatus.message && (
              <div className={`mt-4 text-sm px-4 py-3 rounded-lg flex items-start gap-2 animate-slide-in ${
                subscribeStatus.type === 'success' 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                <span>{subscribeStatus.type === 'success' ? '✓' : '✗'}</span>
                <span>{subscribeStatus.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Spangle Education & Computer Institute Pvt. Ltd.</span> All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-orange-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;