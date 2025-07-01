import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const RedirectToHomeIfLoggedIn = ({ children }) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_URL}/auth/isAuthenticated`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        if (data.authenticated) {
          navigate("/home");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  return children;
};

export default RedirectToHomeIfLoggedIn;
