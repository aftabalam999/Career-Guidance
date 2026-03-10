import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopNav from './components/layout/TopNav';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/pages/Dashboard';
import Explorer from './components/pages/Explorer';
import Test from './components/pages/Test';
import Recommendations from './components/pages/Recommendations';
import Saved from './components/pages/Saved';
import Profile from './components/pages/Profile';

function Layout({ children, onLogout, user }) {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <TopNav onLogout={onLogout} user={user} />
                <div className="page-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const handleLogin = (token, userObj) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userObj));
        setToken(token);
        setUser(userObj);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const ProtectedRoute = ({ children }) => {
        if (!token) return <Navigate to="/login" />;
        return <Layout onLogout={handleLogout} user={user}>{children}</Layout>;
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
                <Route path="/register" element={!token ? <Register onLogin={handleLogin} /> : <Navigate to="/" />} />

                <Route path="/" element={<ProtectedRoute><Dashboard user={user} /></ProtectedRoute>} />
                <Route path="/explorer" element={<ProtectedRoute><Explorer /></ProtectedRoute>} />
                <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
                <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
                <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile user={user} setUser={(u) => {
                    localStorage.setItem('user', JSON.stringify(u));
                    setUser(u);
                }} /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
