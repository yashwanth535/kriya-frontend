import React from "react";
import Navbar from '../components/Navbar';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-200">
    <Navbar />
    <div className="max-w-3xl mx-auto px-4 py-12 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Privacy Policy</h1>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        At <strong>Kriya</strong>, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our cron-job scheduling platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white">1. Information We Collect</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We may collect personal information such as your name, email address, and usage data when you sign up or use our services. We also store metadata related to your scheduled jobs (like URLs, frequencies, and execution logs).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white">2. How We Use Your Information</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We use your information to:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>Authenticate users and secure access</li>
        <li>Manage and execute scheduled jobs</li>
        <li>Improve our platform and user experience</li>
        <li>Send essential notifications or updates</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white">3. Data Security</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We use industry-standard encryption and secure storage practices to protect your data. Access to your data is restricted to authorized personnel only.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white">4. Third-Party Services</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Kriya may integrate with third-party services (like webhook targets or external APIs). We do not share your personal data with third parties without your consent.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white">5. Your Rights</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        You have the right to access, update, or delete your personal information at any time. If you wish to delete your account or data, please contact us at <a href="mailto:support@kriya.com" className="text-blue-600 underline">support@kriya.com</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white">6. Changes to This Policy</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We may update this Privacy Policy from time to time. We will notify you of significant changes through email or within the platform.
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
        Last updated: July 8, 2025
      </p>
    </div>
  </div>
);

export default PrivacyPolicy;
