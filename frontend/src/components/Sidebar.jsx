import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Lightbulb, 
  ClipboardCheck, 
  GitCompare, 
  Heart, 
  Award, 
  User, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'College Explorer', path: '/explorer', icon: <Search size={20} /> },
    { name: 'AI Recommendations', path: '/recommendations', icon: <Lightbulb size={20} /> },
    { name: 'Aptitude Test', path: '/aptitude-test', icon: <ClipboardCheck size={20} /> },
    { name: 'Compare Colleges', path: '/compare', icon: <GitCompare size={20} /> },
    { name: 'Saved Colleges', path: '/saved', icon: <Heart size={20} /> },
    { name: 'Scholarships', path: '/scholarships', icon: <Award size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="logo">CareerPath AI</div>
      <nav>
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
