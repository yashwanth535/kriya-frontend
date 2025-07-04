
import { useState, useEffect } from 'react';
import { Plus, RefreshCw, Search, Grid3X3, List, Clock, TrendingUp } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLogout = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
      window.location.href = "/";
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/job`, {
        withCredentials: true
      });
      setJobs(Array.isArray(response.data.jobs) ? response.data.jobs : []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs');
      setJobs([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`${API_URL}/api/job/${jobId}`, {
        withCredentials: true
      });
      setJobs(jobs.filter(job => job._id !== jobId));
      toast.success('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    }
  };

  const handleRefresh = () => {
    fetchJobs();
  };

  const filteredJobs = jobs.filter(job => 
    job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(job => job.isActive).length;
  const recentExecutions = jobs.filter(job => job.lastExecuted).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <Navbar onLogout={handleLogout} />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-200">
      <Navbar onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 mb-8 transition-colors duration-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Kriya
                </span> Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Manage and monitor your scheduled tasks with ease
              </p>
              
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 mr-3" />
                    <div>
                      <p className="text-sm opacity-90">Total Jobs</p>
                      <p className="text-2xl font-bold">{totalJobs}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 mr-3" />
                    <div>
                      <p className="text-sm opacity-90">Active Jobs</p>
                      <p className="text-2xl font-bold">{activeJobs}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                  <div className="flex items-center">
                    <RefreshCw className="h-8 w-8 mr-3" />
                    <div>
                      <p className="text-sm opacity-90">Recent Runs</p>
                      <p className="text-2xl font-bold">{recentExecutions}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                className="btn-secondary flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => setShowJobForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Job</span>
              </button>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6 transition-colors duration-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search jobs by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              />
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('card')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  viewMode === 'card' 
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center transition-colors duration-200">
              <Clock className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm ? 'No matching jobs found' : 'No jobs yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Create your first cron job to get started'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowJobForm(true)}
                  className="btn-primary"
                >
                  Create Your First Job
                </button>
              )}
            </div>
          ) : (
            <div className={
              viewMode === 'card' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
            }>
              {filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onDelete={handleDeleteJob}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Job Form Modal */}
      {showJobForm && (
        <JobForm
          onSave={(newJob) => {
            setShowJobForm(false);
            if (newJob) {
              setJobs([...jobs, newJob]);
            }
          }}
          onCancel={() => setShowJobForm(false)}
        />
      )}
    </div>
  );
};

export default Home;
