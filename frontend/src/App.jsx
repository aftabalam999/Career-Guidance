import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CollegeExplorer from './pages/CollegeExplorer';
import AICareerAdvisor from './components/AICareerAdvisor';
import CollegeDetails from './pages/CollegeDetails';
import AIRecommendations from './pages/AIRecommendations';

// Admin Imports
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminCollegeManager from './admin/pages/AdminCollegeManager';
import AdminUserManager from './admin/pages/AdminUserManager';
import AdminDatasetImport from './admin/pages/AdminDatasetImport';
import AdminAptitudeManager from './admin/pages/AdminAptitudeManager';
import AdminScholarshipManager from './admin/pages/AdminScholarshipManager';
import AdminReviewManager from './admin/pages/AdminReviewManager';
import AdminSettings from './admin/pages/AdminSettings';
import AdminAnalytics from './admin/pages/AdminAnalytics';
import AptitudeTest from './pages/AptitudeTest';
import CompareColleges from './pages/CompareColleges';
import SavedColleges from './pages/SavedColleges';
import Scholarships from './pages/Scholarships';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import { CollegeProvider } from './context/CollegeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // Or show a loader
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CollegeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="explorer" element={<CollegeExplorer />} />
                <Route path="colleges/:id" element={<CollegeDetails />} />
                <Route path="recommendations" element={<PrivateRoute><AIRecommendations /></PrivateRoute>} />
                <Route path="aptitude-test" element={<PrivateRoute><AptitudeTest /></PrivateRoute>} />
                <Route path="compare" element={<CompareColleges />} />
                <Route path="saved" element={<PrivateRoute><SavedColleges /></PrivateRoute>} />
                <Route path="scholarships" element={<Scholarships />} />
                <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
              </Route>

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="colleges" element={<AdminCollegeManager />} />
            <Route path="users" element={<AdminUserManager />} />
            <Route path="tests" element={<AdminAptitudeManager />} />
            <Route path="import" element={<AdminDatasetImport />} />
            <Route path="scholarships" element={<AdminScholarshipManager />} />
            <Route path="reviews" element={<AdminReviewManager />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
          </BrowserRouter>
        </CollegeProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
