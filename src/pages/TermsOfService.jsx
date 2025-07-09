import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

const TermsOfService = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-200">
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">Kriya Terms of Service</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg">
          Welcome to <strong>Kriya</strong>. By accessing or using our cron job scheduling platform ("Service"), you agree to be bound by the following terms and conditions. If you do not agree to these terms, please do not use Kriya.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">1. Use of Service</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          You may use Kriya to create and manage automated tasks (cron jobs) as long as you do not use it for any malicious or illegal activities. You are responsible for all activity that occurs under your Kriya account.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">2. Account Responsibility</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          You are required to maintain the confidentiality of your login credentials. Kriya is not responsible for any activity resulting from unauthorized access to your Kriya account.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">3. Acceptable Use</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          You agree not to use Kriya for:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
          <li>Sending spam or harmful requests</li>
          <li>Launching denial-of-service attacks</li>
          <li>Accessing unauthorized systems</li>
          <li>Any activity that violates applicable laws or regulations</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">4. Termination</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We reserve the right to suspend or terminate your access to Kriya at any time, with or without notice, if we determine that you have violated these terms.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">5. Limitation of Liability</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Kriya is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free service. In no event shall Kriya be liable for any damages resulting from the use or inability to use the Service.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">6. Modifications</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We may update these Terms of Service from time to time. Continued use of Kriya after changes implies acceptance of the revised terms.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-white">7. Contact</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          If you have any questions about these Terms, please contact us at <a href="mailto:verify.kriya@gmail.com" className="text-blue-600 underline">verify.kriya@gmail.com</a>.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Link to="/" className="btn-secondary px-6 py-2 rounded-lg text-base font-semibold shadow hover:bg-blue-100 dark:hover:bg-gray-800 transition">Back to Kriya Home</Link>
          <Link to="/privacy-policy" className="text-blue-600 underline hover:text-blue-800 dark:hover:text-blue-400">View Privacy Policy</Link>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 text-center">
          Last updated: July 8, 2025
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

export default TermsOfService;
