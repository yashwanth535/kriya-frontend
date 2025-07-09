import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import AuthForms from '../components/auth/auth';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SignUp = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <Navbar />
      <AuthForms initialForm="signup-form" />     
      <Footer />
    </>
  );
};

export default SignUp; 