import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/home/${job._id}`);

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (isActive) => {
    return isActive ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (isActive) => {
    return isActive ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />;
  };

  return (
    <div
      className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">{job.name}</h3>
        </div>
        <div className={`flex items-center space-x-1 ${getStatusColor(job.isActive)}`}>
          {getStatusIcon(job.isActive)}
          <span className="text-sm font-medium">
            {job.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{job.description}</p>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Cron Expression:</span>
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">{job.cronExpression}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Last Executed:</span>
          <span className="text-gray-700">{formatDate(job.lastExecuted)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Created:</span>
          <span className="text-gray-700">{formatDate(job.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
