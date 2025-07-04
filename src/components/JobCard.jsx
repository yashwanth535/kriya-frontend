import { Clock, CheckCircle, XCircle, Calendar, Code, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job, viewMode = 'card' }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/home/${job._id}`);

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (isActive) => {
    return isActive ? 'text-green-600' : 'text-red-600';
  };

  const getStatusBadgeColor = (isActive) => {
    return isActive 
      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700' 
      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700';
  };

  const getStatusIcon = (isActive) => {
    return isActive ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />;
  };

  const getMethodBadgeColor = (method) => {
    return method === 'GET' 
      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700'
      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-700';
  };

  if (viewMode === 'list') {
    return (
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-200 cursor-pointer group"
        onClick={handleClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {job.name}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(job.isActive)}`}>
                  {getStatusIcon(job.isActive)}
                  <span className="ml-1">{job.isActive ? 'Active' : 'Inactive'}</span>
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getMethodBadgeColor(job.method)}`}>
                  {job.method}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm truncate">{job.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <div className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{job.cronExpression}</div>
              <div className="text-xs mt-1">Schedule</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-700 dark:text-gray-300">{formatDate(job.lastExecuted)}</div>
              <div className="text-xs">Last Run</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-700 dark:text-gray-300">{formatDate(job.createdAt)}</div>
              <div className="text-xs">Created</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-200 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {job.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getMethodBadgeColor(job.method)}`}>
                {job.method}
              </span>
            </div>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(job.isActive)}`}>
          {getStatusIcon(job.isActive)}
          <span className="ml-1">{job.isActive ? 'Active' : 'Inactive'}</span>
        </span>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{job.description}</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Code className="h-4 w-4" />
            <span>Schedule:</span>
          </div>
          <span className="font-mono bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 px-3 py-1 rounded-md text-sm font-medium text-gray-900 dark:text-white">
            {job.cronExpression}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <div>
              <div className="text-xs">Last Executed</div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">{formatDate(job.lastExecuted)}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Globe className="h-4 w-4" />
            <div>
              <div className="text-xs">Created</div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">{formatDate(job.createdAt)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
