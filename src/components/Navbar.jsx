import { Clock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80"
            onClick={() => navigate('/home')}
          >
            <Clock className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Cron Job Manager</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 