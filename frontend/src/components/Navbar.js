import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.jpg';
import flagImg from '../assets/nepali_flag.gif';

const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    setUserMenuOpen(false);
  }, [location]);

  const isActiveLink = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 min-w-0 flex-shrink-0">
          <img
            src={logoImg}
            alt="Logo"
            className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-full flex-shrink-0"
          />
          <div className="min-w-0 hidden sm:block">
            <p className="text-orange-800 font-bold text-sm md:text-base lg:text-xl leading-tight truncate">
              Spangle Education & Computer Institute
            </p>
            <p className="text-gray-600 text-xs md:text-sm truncate">
              Empowering Minds, Building Futures
            </p>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center gap-3 md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 md:px-4 py-2 rounded-md text-sm md:text-base font-semibold transition whitespace-nowrap
                ${isActiveLink(item.path)
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-800 hover:text-orange-600'}
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* USER & FLAG */}
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 font-semibold text-gray-800 hover:text-orange-600"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                  {user?.profile?.firstName?.[0] || 'U'}
                </div>
                <span className="text-sm hidden lg:inline">{user?.profile?.firstName}</span>
                <ChevronDownIcon className="w-4 h-4 hidden lg:inline" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-orange-50"
                  >
                    <UserIcon className="w-5 h-5 text-gray-400" />
                    My Profile
                  </Link>
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <img src={flagImg} alt="Nepal Flag" className="w-8 md:w-10 lg:w-12" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
