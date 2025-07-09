import AuthForms from '../components/auth/auth';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
const SignIn = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <Navbar />
          <AuthForms initialForm="signin-form" />
      <Footer />
    </>
  );
};

export default SignIn; 