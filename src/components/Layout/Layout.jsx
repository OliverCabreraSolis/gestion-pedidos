import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;