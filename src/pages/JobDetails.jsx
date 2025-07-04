
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import JobForm from '../components/JobForm';
import Navbar from '../components/Navbar';

import { Play, Edit, Trash2, Eye } from 'lucide-react';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/job/${jobId}`, {
        withCredentials: true,
      });
      setJob(res.data.job);
    } catch (err) {
      toast.error('Failed to fetch job');
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

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

  const handleExecute = async () => {
    try {
      await axios.post(`${API_URL}/api/job/${jobId}/execute`, {}, {
        withCredentials: true,
      });
      toast.success('Job executed successfully!');
      fetchJob(); // Refresh data
    } catch (err) {
      toast.error('Failed to execute job');
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (!confirm) return;

    try {
      await axios.delete(`${API_URL}/api/job/${jobId}`, {
        withCredentials: true,
      });
      toast.success('Job deleted successfully!');
      navigate('/home');
    } catch (err) {
      toast.error('Failed to delete job');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar onLogout={handleLogout} />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar onLogout={handleLogout} />
      <div className="w-full px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 mb-6 w-full transition-colors duration-200">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{job.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">{job.description}</p>
          <div className="mb-2">
            <span className="font-mono bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 rounded mr-2">
              {job.cronExpression}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {job.method} {job.callbackUrl}
            </span>
          </div>
          <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Created: {new Date(job.createdAt).toLocaleString()}
          </div>
          <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Last Executed:{' '}
            {job.lastExecuted
              ? new Date(job.lastExecuted).toLocaleString()
              : 'Never'}
          </div>

          <div className="flex space-x-2 mt-4">
            <button onClick={handleExecute} className="btn-primary flex items-center space-x-1 text-sm">
              <Play className="h-4 w-4" />
              <span>Execute</span>
            </button>
            <button onClick={() => setShowEdit(true)} className="btn-secondary flex items-center space-x-1 text-sm">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </button>
            <button onClick={handleDelete} className="btn-danger flex items-center space-x-1 text-sm">
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
        
        {/* Logs Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 w-full transition-colors duration-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Logs</h3>
          {job.logs && job.logs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-3 py-2 text-left text-gray-900 dark:text-white">Time</th>
                    <th className="px-3 py-2 text-left text-gray-900 dark:text-white">Status</th>
                    <th className="px-3 py-2 text-left text-gray-900 dark:text-white">Code</th>
                    <th className="px-3 py-2 text-left text-gray-900 dark:text-white">Response</th>
                    <th className="px-3 py-2 text-left text-gray-900 dark:text-white">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {job.logs.slice().reverse().map((log, idx) => (
                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <td className="px-3 py-2 whitespace-nowrap text-gray-900 dark:text-white">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className={`px-3 py-2 font-semibold ${log.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{log.status}</td>
                      <td className="px-3 py-2 text-gray-900 dark:text-white">{log.responseCode ?? '-'}</td>
                      <td className="px-3 py-2 max-w-xs truncate text-gray-900 dark:text-white" title={log.responseBody}>{log.responseBody ?? '-'}</td>
                      <td className="px-3 py-2 max-w-xs truncate text-gray-900 dark:text-white" title={log.errorMessage}>{log.errorMessage ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400">No logs yet.</div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <JobForm
          job={job}
          onSave={updatedJob => {
            setShowEdit(false);
            if (updatedJob) setJob(updatedJob);
          }}
          onCancel={() => setShowEdit(false)}
        />
      )}
    </div>
  );
};

export default JobDetails;
