import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import axios from 'axios';

const JobForm = ({ job, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cronExpression: '',
    callbackUrl: '',
    method: 'GET',
    body: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});
  const [isCallbackTested, setIsCallbackTested] = useState(false);
  const [isTestingCallback, setIsTestingCallback] = useState(false);
  const [callbackTestError, setCallbackTestError] = useState('');

  useEffect(() => {
    if (job) {
      setFormData({
        name: job.name || '',
        description: job.description || '',
        cronExpression: job.cronExpression || '',
        callbackUrl: job.callbackUrl || '',
        method: job.method || 'GET',
        body: job.body || '',
        isActive: job.isActive !== undefined ? job.isActive : true
      });
      setIsCallbackTested(true);
    } else {
      setIsCallbackTested(false);
    }
  }, [job]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.cronExpression.trim()) {
      newErrors.cronExpression = 'Cron expression is required';
    } else if (!isValidCronExpression(formData.cronExpression)) {
      newErrors.cronExpression = 'Invalid cron expression format';
    }

    if (!formData.callbackUrl.trim()) {
      newErrors.callbackUrl = 'Callback URL is required';
    } else if (!isValidUrl(formData.callbackUrl)) {
      newErrors.callbackUrl = 'Invalid URL format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidCronExpression = (expression) => {
    const cronRegex = /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/;
    return cronRegex.test(expression);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    try {
      if (job) {
        // Update job
        const response = await axios.put(`${API_URL}/api/job/${job._id}`, formData, { withCredentials: true });
        onSave(response.data.job);
      } else {
        // Create job (keep old behavior)
        onSave(formData);
      }
    } catch (error) {
      // Optionally show error toast here
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (name === 'callbackUrl' || name === 'method' || name === 'body') {
      setIsCallbackTested(false);
      setCallbackTestError('');
    }
  };

  const handleTestCallback = async () => {
    setIsTestingCallback(true);
    setCallbackTestError('');
    setIsCallbackTested(false);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await axios.post(`${API_URL}/api/job/test-callback`, {
        callbackUrl: formData.callbackUrl,
        method: formData.method,
        body: formData.method === 'POST' ? formData.body : undefined
      }, { withCredentials: true });
      if (response.data && response.data.success) {
        setIsCallbackTested(true);
        setCallbackTestError('');
      } else {
        setIsCallbackTested(false);
        setCallbackTestError(response.data?.message || 'Callback test failed');
      }
    } catch (error) {
      setIsCallbackTested(false);
      setCallbackTestError(error.response?.data?.message || 'Callback test failed');
    } finally {
      setIsTestingCallback(false);
    }
  };

  const cronExamples = [
    { label: 'Every minute', value: '* * * * *' },
    { label: 'Every 5 minutes', value: '*/5 * * * *' },
    { label: 'Every hour', value: '0 * * * *' },
    { label: 'Every day at midnight', value: '0 0 * * *' },
    { label: 'Every Monday at 9 AM', value: '0 9 * * 1' },
    { label: 'Every month on the 1st', value: '0 0 1 * *' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {job ? 'Edit Job' : 'Create New Job'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter job name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`input-field ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter job description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cron Expression *
            </label>
            <input
              type="text"
              name="cronExpression"
              value={formData.cronExpression}
              onChange={handleChange}
              className={`input-field font-mono ${errors.cronExpression ? 'border-red-500' : ''}`}
              placeholder="* * * * *"
            />
            {errors.cronExpression && <p className="text-red-500 text-sm mt-1">{errors.cronExpression}</p>}
            
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-2">Common examples:</p>
              <div className="grid grid-cols-2 gap-1">
                {cronExamples.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, cronExpression: example.value }))}
                    className="text-xs text-blue-600 hover:text-blue-800 text-left p-1 rounded hover:bg-blue-50"
                  >
                    <div className="font-medium">{example.label}</div>
                    <div className="font-mono">{example.value}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              HTTP Method *
            </label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="input-field"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>

          {formData.method === 'POST' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Request Body (JSON)
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows={3}
              className="input-field font-mono"
              placeholder='{"key": "value"}'
            />
          </div>
        )}


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Callback URL *
            </label>
            <input
              type="url"
              name="callbackUrl"
              value={formData.callbackUrl}
              onChange={handleChange}
              className={`input-field ${errors.callbackUrl ? 'border-red-500' : ''}`}
              placeholder="https://api.example.com/webhook"
            />
            {errors.callbackUrl && <p className="text-red-500 text-sm mt-1">{errors.callbackUrl}</p>}
            <button
              type="button"
              onClick={handleTestCallback}
              className="btn-secondary mt-2"
              disabled={isTestingCallback || !formData.callbackUrl || errors.callbackUrl}
            >
              {isTestingCallback ? 'Testing...' : 'Test Callback URL'}
            </button>
            {isCallbackTested && !callbackTestError && (
              <p className="text-green-600 text-sm mt-1">Callback URL is valid!</p>
            )}
            {callbackTestError && (
              <p className="text-red-500 text-sm mt-1">{callbackTestError}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Active
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className={`flex items-center space-x-2 flex-1 btn-primary ${(!isCallbackTested || !!callbackTestError) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}`}
              disabled={!isCallbackTested || !!callbackTestError}
              style={{ pointerEvents: (!isCallbackTested || !!callbackTestError) ? 'auto' : 'auto' }}
              title={!isCallbackTested ? 'Test the callback URL to enable' : ''}
            >
              <span style={{marginRight: '0.5rem'}}>
                {(!isCallbackTested || !!callbackTestError) ? <span role="img" aria-label="blocked">🚫</span> : <Save className="h-4 w-4" />}
              </span>
              <span>{job ? 'Update Job' : 'Create Job'}</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm; 