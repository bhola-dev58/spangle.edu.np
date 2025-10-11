import React from 'react';
import { Link } from 'react-router-dom';

const socialLinks = [
  { href: 'https://facebook.com/spangle.edu.np', label: 'Facebook', icon: (
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


const Footer = () => (
  <footer style={{ backgroundColor: "#2b2c2e" }} className="border-t border-gray-800 text-white transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <img src="/favicon.ico" alt="Spangle Logo" className="w-14 h-14 rounded-full shadow-lg border-2 " />
          <span className="text-2xl md:text-3xl tracking-tight text-white drop-shadow">Spangle Education & Computer Institute Pvt.Ltd.</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <nav aria-label="Footer Navigation" className="col-span-1">
            <ul className="flex flex-col gap-4">
            {navLinks.map(link => (
              <li key={link.to}>
                <Link to={link.to} className="font-semibold text-white hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:underline">{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-1">
         <h4 className="font-bold mb-4 text-white">Contact</h4>
         <ul className="text-base flex flex-col gap-3">
            <li className="flex items-center gap-2"><span aria-label="Location" role="img">📍</span> Siddharthanagar-13, Devkota Chowk, Rupandehi, Nepal</li>
            <li className="flex items-center gap-2"><span aria-label="Phone" role="img">📞</span> <a href="tel:+9779804400140" className="hover:text-blue-400 transition-colors">+977-9804400140</a></li>
            <li className="flex items-center gap-2"><span aria-label="Email" role="img">✉️</span> <a href="mailto:info@spangle.edu.np" className="hover:text-blue-400 transition-colors">info@spangle.edu.np</a></li>
          </ul>
        </div>
        <div className="col-span-1">
         <h4 className="font-bold mb-4 text-white">Office Hours</h4>
         <ul className="text-base flex flex-col gap-3">
            <li><span className="font-medium">Sun - Fri:</span> 6:00 AM - 6:00 PM</li>
            <li><span className="font-medium">Saturday:</span> 6:00 AM - 2:00 PM</li>
            <li><span className="font-medium">Public Holidays:</span> Closed</li>
          </ul>
        </div>
        <div className="col-span-1 flex flex-col gap-1">
         <h4 className="font-bold mb-4 text-white">Follow Us</h4>
         
         <div className="flex gap-4 mb-6">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full p-3 bg-gray-900 text-white hover:bg-blue-900 hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
              >
                {icon}
              </a>
            ))}
          </div>
          
        </div>




      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Spangle Education and Computer Institute Pvt. Ltd. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;