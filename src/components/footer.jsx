import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/wall-clock.png" alt="Clock Icon" className="h-5 w-5 object-contain" />
            </div>
            <h3 className="text-xl font-bold">Kriya</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Kriya is an enterprise-grade cron job management platform. Kriya helps you automate, monitor, and secure your scheduled tasks.
          </p>
          <div className="flex justify-center space-x-6 mt-6">
            <Link to="/privacy-policy" className="text-blue-400 hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-blue-400 hover:underline">
              Terms of Service
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            © 2024 Kriya. All rights reserved.
          </p>
          <p className="text-sm md:text-base mt-2 text-center text-gray-400 dark:text-gray-500">
            Created by{" "}
            <a 
              href="https://yashwanth.site/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#20D982] hover:text-[#bbe86f] transition-colors duration-300 underline"
            >
              Yashwanth Munikuntla
            </a>
            {" "} — also known as{" "}
            <span className="text-gray-400 dark:text-gray-500">
              Yashwanth Goud, yashwanth535
            </span>
            , passionate full-stack developer & creator of MoneyMind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
