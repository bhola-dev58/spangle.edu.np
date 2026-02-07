import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logoImg from '../assets/logo.jpg';
import flagImg from '../assets/nepali_flag.gif';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActiveLink = (path) => location.pathname === path;

  const whatsappNumber = '+9779804472777';
  const whatsappMessage = encodeURIComponent('Hi there! I discovered your services and I\'m interested in what you offer.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">

          {/* LOGO & TEXT */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={logoImg}
                alt="Spangle Education Logo"
                className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full"
              />
            </Link>
            <Link to="/" className="flex flex-col hover:opacity-80 transition-opacity">
              {/* Mobile: Show short name */}
              <span className="block md:hidden text-orange-800 font-bold text-sm sm:text-base leading-tight">
                Spangle Education &<br />
                Computer Institute Pvt. Ltd
              </span>
              {/* Desktop: Show full name */}
              <span className="hidden md:block text-orange-800 font-bold text-sm md:text-base lg:text-lg leading-tight">
                Spangle Education & Computer Institute
              </span>
              {/* Desktop only: Show tagline */}
              <span className="hidden md:block text-gray-900 text-xs md:text-sm font-medium leading-tight">
                Empowering Minds, Building Futures
              </span>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden xl:flex items-center gap-1">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`px-4 py-2 text-base font-semibold transition-colors rounded
                      ${isActiveLink(item.path)
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600'}
                    `}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT SIDE: WHATSAPP + FLAG + HAMBURGER */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Button - Hidden on small screens */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded-md hover:bg-orange-700 transition-colors"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"></path>
              </svg>
              <span>Contact</span>
            </a>

            {/* Nepal Flag */}
            <img src={flagImg} alt="Nepal Flag" className="w-8 md:w-10 h-auto" />

            {/* Hamburger Menu Button - Only on mobile/tablet */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <div className="navbar-toggler-animation w-6 h-5 flex flex-col justify-between">
                {isOpen ? (
                  <XMarkIcon className="w-6 h-6 text-gray-700" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-gray-700" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`xl:hidden transition-all duration-300 ease-in-out overflow-hidden
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <ul className="py-4 space-y-2 border-t border-gray-200">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-base font-semibold rounded-lg transition-colors
                    ${isActiveLink(item.path)
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* WhatsApp Button in Mobile Menu */}
            <li className="sm:hidden pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white text-base font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"></path>
                </svg>
                <span>Contact Us</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
