import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-gray-800 text-brand-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white">Prime Real</h3>
            <p className="mt-2 text-sm text-brand-gray-300">Your trusted partner for first-time home buying in Pune.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/listings" className="hover:text-white transition-colors">Properties</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Contact Us</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-brand-gray-300">Email: contact@primereal.com</li>
              <li className="text-brand-gray-300">Phone: +91 98765 43210</li>
              <li className="text-brand-gray-300">Pune, Maharashtra, India</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-brand-gray-700 pt-8 text-center text-sm text-brand-gray-400">
          <p>&copy; {new Date().getFullYear()} Prime Real. All rights reserved. Designed for first-time home buyers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;