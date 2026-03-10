import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Compass, CheckSquare, Sparkles, Heart, User, Settings } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                Collegy
            </div>
            <div className="sidebar-nav">
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/explorer" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Compass size={20} />
                    <span>College Explorer</span>
                </NavLink>
                <NavLink to="/test" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <CheckSquare size={20} />
                    <span>Aptitude Test</span>
                </NavLink>
                <NavLink to="/recommendations" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Sparkles size={20} />
                    <span>Recommendations</span>
                </NavLink>
                <NavLink to="/saved" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Heart size={20} />
                    <span>Saved Colleges</span>
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <User size={20} />
                    <span>Profile</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
