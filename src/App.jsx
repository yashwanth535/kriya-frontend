
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import JobDetails from './pages/JobDetails'
import ProtectedRoute from './pages/ui/ProtectedRoute'
import Unauthorized from './pages/ui/unAuth'
import NotFound from './pages/ui/pageNotFound'
import RedirectToHomeIfLoggedIn from './pages/ui/RedirectToHomeIfLoggedIn';
import BackendStatusCheck from './pages/ui/BackendStatusCheck';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Routes>
        <Route 
          path="/" 
          element={
            <RedirectToHomeIfLoggedIn>
              <LandingPage />
            </RedirectToHomeIfLoggedIn>
          } 
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/error" element={<Unauthorized />} />
        <Route path="/backend" element={<BackendStatusCheck />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/:jobId" element={<JobDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
