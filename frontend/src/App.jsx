import { Navigate, Route, Routes } from "react-router-dom";
import Signup from './Pages/Signup'
import Login from "./Pages/Login";
import EmailVerification from "./Pages/EmailVerification";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import LoadingSpinner from "./components/LoadingSpinner";
import Dashboard from "./Pages/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

// Protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }
  if (!user.isVerified) {
    return <Navigate to='/signup' replace />
  }
  return children;
}

// Redirect authenticated user to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (isAuthenticated && user.isVerified) {
    // Redirect to home page and replace with current page if user is authenticated and verified
    return <Navigate to='/' replace />
  }
  return children;
}

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gradient-to-br
    from-gray-900 via-cyan-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <Signup />
          </RedirectAuthenticatedUser>} />

        <Route path='/login' element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/verify-email' element={<EmailVerification />} />

        <Route path='/forgot-password' element={
          <RedirectAuthenticatedUser>
            <ForgotPassword />
          </RedirectAuthenticatedUser>
        } />

        <Route path='/reset-password/:token' element={
          <RedirectAuthenticatedUser>
            <ResetPassword />
          </RedirectAuthenticatedUser>
        } />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App