import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const Layout = ({ children, title }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = usePage().props.auth.user;
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <main className="px-5 pt-20 pb-16 lg:ml-64 md:ml-0 flex-grow">
            {title && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-semibold text-[#0B6477]">{title}</h1>
                    <div className="w-full h-1 bg-[#14919B] mt-2 mb-4" />
                </div>
            )}

          <div className="content px-3">{children}</div>
        </main>

        <footer className="w-full bg-gray-50/80 py-4 fixed bottom-0 left-0">
          <p className="md:ml-[20%] lg:ml-[20%] sm:ml-[5%] ml-[5%] select-none">&copy; 2024 Ponpes Al Musyaffa | {user.name}.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
