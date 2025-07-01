import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { googleSignIn } from "./google";

const AuthForms = ({ initialForm = "signin-form", onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const [formType, setFormType] = useState(initialForm);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setFormType(initialForm);
  }, [initialForm]);

  // Clear message when form type changes
  useEffect(() => {
    setMessage("");
  }, [formType]);

  const handleGoogleSuccess = async (response) => {
    setMessage(""); // Clear any previous messages
    setLoading(true);
    try {
      const data = await googleSignIn(response.credential);
      if (data?.success) {
        console.log("Login successful, navigating to dashboard...");
        window.location.href = "/home";
      } else {
        setMessage(data.message || "Login failed, please try again.");
      }
    } catch (error) {
      setMessage(error.message || "An unexpected error occurred.");
    }
  
    setLoading(false);
  };
  const handleSignIn = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear message on new submission
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
          window.location.href = "/home";
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error during signin:", error);
    }
    setLoading(false);
  };

  const handleOTP = async (event, type) => {
    event.preventDefault();
    setMessage(""); // Clear message on new submission
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/userExists`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 400) {
        if (type === 'signup') {
          setMessage("Email Already registered")
        } else {
          generateOTP("This is your one time password to reset password",type);
        }
      } else {
        if (type === 'signup') {
          generateOTP("This is your one time password to register into Kriya",type);
        } else {
          setMessage("Email is not registered")
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const generateOTP = async (text,type) => {
    const otpResponse = await fetch(`${API_URL}/auth/generateOTP`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        text: text,
      }),
    });
    const otpData = await otpResponse.json();

    if (otpResponse.ok) {
      setMessage("OTP sent to your email");
      setLoading(false);
      if(type==='signup'){
        setFormType("otp-signup")
      }else{
        setFormType("otp-reset");
      }
    } else {
      setMessage(otpData.message || "Failed to send OTP");
    }
  }

  const verifyOtp = async (event, type) => {
    event.preventDefault();
    setMessage(""); // Clear message on new submission
    setLoading(true);
    console.log('otp is:'+otp);
    try {
      const response = await fetch(`${API_URL}/auth/verifyOTP`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();
      if (response.status === 400) {
        setMessage(data.message);
      } else {
        if (type === "signup") {
          signUpUser();
        } else {
          setFormType("Enter-password");
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
    setLoading(false);
  };

  const signUpUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 400) {
        setMessage(data.message);
      } else {
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
    setLoading(false);
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear message on new submission
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/reset_password`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful. Click below to sign in.");
      } else {
        setMessage(data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const renderForm = () => {
    switch (formType) {
      case "signin-form":
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Welcome Back</h2>
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {message && (
                <div className="text-red-400 text-sm text-center">{message}</div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-white/60">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    setMessage("Google login failed");
                  }}
                  theme="filled_black"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="100%"
                />
              </div>
            </div>

            <div className="mt-6 text-center text-white/60">
              <button
                onClick={() => setFormType("forgot-password")}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot your password?
              </button>
            </div>
            
            <div className="mt-4 text-center text-white/60">
              Don't have an account?{" "}
              <button
                onClick={() => setFormType("signup-form")}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign up
              </button>
            </div>
          </motion.div>
        );

      case "signup-form":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Create Account</h2>
            <form onSubmit={(e) => handleOTP(e, 'signup')} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {password !== confirmPassword && confirmPassword && (
                <div className="text-red-400 text-sm">Passwords do not match</div>
              )}
              {message && (
                <div className="text-red-400 text-sm text-center">{message}</div>
              )}
              <button
                type="submit"
                disabled={loading || password !== confirmPassword || !password || !confirmPassword}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
            
            <div className="mt-6 text-center text-white/60">
              Already have an account?{" "}
              <button
                onClick={() => setFormType("signin-form")}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign in
              </button>
            </div>
          </motion.div>
        );

      case "otp-signup":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Verify OTP</h2>
            <form onSubmit={(e) => verifyOtp(e, 'signup')} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
              </div>
              {message && (
                <div className="text-red-400 text-sm text-center">{message}</div>
              )}
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
            
            <div className="mt-6 text-center text-white/60">
              <button
                onClick={() => setFormType("signup-form")}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Back to Sign Up
              </button>
            </div>
          </motion.div>
        );

      case "forgot-password":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Reset Password</h2>
            <form onSubmit={(e) => handleOTP(e, 'reset')} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
                  required
                />
              </div>
              {message && (
                <div className="text-red-400 text-sm text-center">{message}</div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
            
            <div className="mt-6 text-center text-white/60">
              <button
                onClick={() => setFormType("signin-form")}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          </motion.div>
        );

      case "otp-reset":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Verify OTP</h2>
            <form onSubmit={(e) => verifyOtp(e, 'reset')} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
              </div>
              {message && (
                <div className="text-red-400 text-sm text-center">{message}</div>
              )}
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
            
            <div className="mt-6 text-center text-white/60">
              <button
                onClick={() => setFormType("forgot-password")}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Back to Reset Password
              </button>
            </div>
          </motion.div>
        );

      case "Enter-password":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Enter New Password</h2>
            <form onSubmit={resetPassword} className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {password !== confirmPassword && confirmPassword && (
                <div className="text-red-400 text-sm">Passwords do not match</div>
              )}
              {message && (
                <div className="text-green-400 text-sm text-center">{message}</div>
              )}
              <button
                type="submit"
                disabled={loading || password !== confirmPassword || !password || !confirmPassword}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
            
            {message.includes("successful") && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setFormType("signin-form")}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Go to Sign In
                </button>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="w-full max-w-md">
        {renderForm()}
      </div>
    </div>
  );
};

export default AuthForms; 