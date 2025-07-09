import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-200">
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">Kriya Privacy Policy</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg">
          At <strong>Kriya</strong>, your privacy is our top priority. This Privacy Policy explains how Kriya collects, uses, and protects your information when you use the Kriya cron-job scheduling platform. By using Kriya, you agree to the terms outlined below.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">1. Information We Collect</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Kriya may collect personal information such as your name, email address, and usage data when you sign up or use our services. Kriya also stores metadata related to your scheduled jobs (like URLs, frequencies, and execution logs).
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">2. How We Use Your Information</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Kriya uses your information to:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
          <li>Authenticate users and secure access to Kriya</li>
          <li>Manage and execute scheduled jobs on Kriya</li>
          <li>Improve the Kriya platform and user experience</li>
          <li>Send essential notifications or updates from Kriya</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">3. Data Security</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Kriya uses industry-standard encryption and secure storage practices to protect your data. Access to your data is restricted to authorized Kriya personnel only.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">4. Third-Party Services</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Kriya may integrate with third-party services (like webhook targets or external APIs). Kriya does not share your personal data with third parties without your consent.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">5. Your Rights</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          You have the right to access, update, or delete your personal information at any time. If you wish to delete your Kriya account or data, please contact us at <a href="mailto:verify.kriya@gmail.com" className="text-blue-600 underline">verify.kriya@gmail.com</a>.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">6. Changes to This Policy</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Kriya may update this Privacy Policy from time to time. We will notify you of significant changes through email or within the Kriya platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Link to="/" className="btn-secondary px-6 py-2 rounded-lg text-base font-semibold shadow hover:bg-blue-100 dark:hover:bg-gray-800 transition">Back to Kriya Home</Link>
          <Link to="/terms-of-service" className="text-blue-600 underline hover:text-blue-800 dark:hover:text-blue-400">View Terms of Service</Link>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 text-center">
          Last updated: July 8, 2025
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

export default PrivacyPolicy;
