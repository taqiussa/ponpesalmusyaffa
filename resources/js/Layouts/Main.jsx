import Navbar from '@/Components/Navbar';
import Sidebar from '@/Components/Sidebar';
import React, { useState } from 'react';

export default function Main({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-4 ml-0 md:ml-64 transition-all duration-300 ease-in-out">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Konten Utama */}
        <div className="mt-16 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
