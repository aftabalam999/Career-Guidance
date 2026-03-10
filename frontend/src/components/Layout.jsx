import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import AICareerAdvisor from './AICareerAdvisor';

const Layout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <TopNavbar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
      <AICareerAdvisor />
    </div>
  );
};

export default Layout;
