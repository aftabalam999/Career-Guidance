import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CollegeExplorer from './pages/CollegeExplorer';
import CollegeDetails from './pages/CollegeDetails';
import AIRecommendations from './pages/AIRecommendations';
import AptitudeTest from './pages/AptitudeTest';
import CompareColleges from './pages/CompareColleges';
import SavedColleges from './pages/SavedColleges';
import Scholarships from './pages/Scholarships';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import { CollegeProvider } from './context/CollegeContext';

function App() {
  return (
    <CollegeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="explorer" element={<CollegeExplorer />} />
            <Route path="colleges/:id" element={<CollegeDetails />} />
            <Route path="recommendations" element={<AIRecommendations />} />
            <Route path="aptitude-test" element={<AptitudeTest />} />
            <Route path="compare" element={<CompareColleges />} />
            <Route path="saved" element={<SavedColleges />} />
            <Route path="scholarships" element={<Scholarships />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CollegeProvider>
  );
}

export default App;
