import { Link } from 'react-router-dom';
import { Zap, Shield, BarChart3, Sun, Moon, CheckCircle, Users, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Footer from '../components/footer';
import Navbar from '../components/Navbar';
const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-200">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4 mr-2" />
            Enterprise-Grade Cron Job Management
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Automate Your Tasks with
            <span className="text-blue-600 dark:text-blue-400"> Kriya Precision</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Kriya is built for enterprise teams who demand reliability, scalability, and complete visibility into their scheduled operations. 
            Monitor, manage, and optimize your cron jobs with Kriya's industry-leading tools. Kriya makes cron job management simple and secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/signup"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <CheckCircle className="h-5 w-5" />
            </Link>
            <Link
              to="/signin"
              className="btn-secondary text-lg px-8 py-3"
            >
              Sign In
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10M+</div>
              <div className="text-gray-600 dark:text-gray-400">Jobs Executed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Enterprise Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Enterprise Features That Scale with Kriya
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Kriya offers comprehensive tools designed for mission-critical operations. Discover why Kriya is trusted by enterprises worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
              <img src="/wall-clock.png" alt="Clock Icon" className="h-6 w-6 object-contain" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Advanced Scheduling with Kriya
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Kriya supports complex cron expressions with timezone support and intelligent scheduling.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
            <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Real-time Monitoring by Kriya
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Live dashboards with instant alerts and comprehensive health checks powered by Kriya.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Analytics & Insights from Kriya
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Deep performance analytics with custom reporting and trend analysis, all within Kriya.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
            <div className="bg-red-100 dark:bg-red-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Enterprise Security with Kriya
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Kriya is SOC 2 compliant with advanced encryption and audit trails.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Industry Leaders Using Kriya
            </h2>
            <div className="flex justify-center items-center space-x-8 text-gray-400">
              <Users className="h-8 w-8" />
              <Globe className="h-8 w-8" />
              <Shield className="h-8 w-8" />
              <BarChart3 className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Kriya is Free to Use
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Sign up and start using Kriya for free—no credit card or trial required.
            </p>
            <Link
              to="/signup"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default LandingPage;
