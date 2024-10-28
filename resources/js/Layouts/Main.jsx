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
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <div className="flex-grow p-4 md:ml-64">
          <div className="md:px-10 lg:px-10 sm:px-5 px-5 md:py-8 lg:py-8 sm:py-5 p-5 border-2 border-gray-200 md:max-w-[180vh] sm:max-w-[165vh] lg:max-w-[165vh] max-w-[50vh] mb-[4rem] border-dashed rounded-lg dark:border-gray-700 mt-14">
            {children}
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full bg-gray-50/80 border-t border-blue-300 py-4 fixed bottom-0 left-0">
          <p className="md:ml-[20%] lg:ml-[20%] sm:ml-[5%] ml-[5%] select-none">
            &copy; Ponpes Al Musyaffa | {user.name}.
          </p>
        </footer>
      </div>
    </div>
  );
}
