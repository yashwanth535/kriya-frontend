import { LogOut, Clock, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import React, { useState } from 'react';

const HomeNavbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showSetPassword, setShowSetPassword] = useState(false);

  // Get user from localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {}

  // Helper: is Google user with no password
  const needsPassword = user && user.pass === false;

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center h-16">
            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200" onClick={() => navigate('/home')}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/wall-clock.png" alt="Clock Icon" className="h-5 w-5 object-contain" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Kriya
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">Cron Job Manager</span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              {needsPassword && (
                <div className="flex flex-row items-center bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg shadow-sm px-3 py-1 gap-2 mr-2">
                  <span className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                    signed via google:
                  </span>
                  <button
                    className="btn-primary text-sm px-3 py-1 rounded-lg font-semibold"
                    onClick={() => setShowSetPassword(true)}
                  >
                    Set Password
                  </button>
                </div>
              )}
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Modal for set password form */}
      {showSetPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              onClick={() => setShowSetPassword(false)}
              aria-label="Close"
            >
              ×
            </button>
            {/* Password reset form (reuse existing form) */}
            <SetPasswordForm email={user?.email} onSuccess={() => setShowSetPassword(false)} />
          </div>
        </div>
      )}
    </>
  );
};

// Inline password set form (reuse reset logic)
function SetPasswordForm({ email, onSuccess }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/auth/reset_password`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Password set successfully! You can now use email login.");
        // Update localStorage user.pass to true
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          if (user) {
            user.pass = true;
            localStorage.setItem('user', JSON.stringify(user));
          }
        } catch (e) {}
        setTimeout(() => {
          setMessage("");
          onSuccess && onSuccess();
        }, 1500);
      } else {
        setMessage(data.message || "Failed to set password.");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">Set Your Password</h2>
      <input
        type="email"
        value={email}
        disabled
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
      />
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        required
      />
      {password !== confirmPassword && confirmPassword && (
        <div className="text-red-500 text-sm">Passwords do not match</div>
      )}
      {message && (
        <div className="text-center text-sm text-green-600 dark:text-green-400">{message}</div>
      )}
      <button
        type="submit"
        disabled={loading || password !== confirmPassword || !password || !confirmPassword}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Setting..." : "Set Password"}
      </button>
    </form>
  );
}

export default HomeNavbar;