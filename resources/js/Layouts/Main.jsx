import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import { usePage } from "@inertiajs/react";
import React, { useState } from "react";

export default function Main({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = usePage().props.auth.user;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <div className="flex-grow p-4 sm:ml-64">
          <div className="px-8 py-4 border-2 md:max-w-[180vh] sm:max-w-[165vh] lg:max-w-[165vh] max-w-[50vh] mb-[4rem] border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            {children}
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <footer className="w-full bg-gray-50/80 border-t border-blue-300 md:pl-[20%] lg:pl-[20%] sm:pl-0 pl-0 py-4 fixed bottom-0 left-0">
        <p className="select-none">&copy; Ponpes Al Musyaffa | {user.name}.</p>
      </footer>
    </div>
  );
}
