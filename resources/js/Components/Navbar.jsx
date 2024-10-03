import React from "react";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <button
                        onClick={toggleSidebar}
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    >
                        <span className="sr-only">Toggle sidebar</span>
                        <span className="mr-2">
                            {isSidebarOpen ? ">" : "<"}
                        </span>
                        Menu
                    </button>

                    <a href="#" className="flex items-center">
                        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                            My Company
                        </span>
                    </a>
                </div>
            </div>
        </nav>
    );
}
