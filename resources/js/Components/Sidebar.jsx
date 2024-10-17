import { Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

export default function Sidebar({ isOpen, toggleSidebar }) {
    const user = usePage().props.auth.user;
    const currentRoute = usePage().url;

    const activeStyles = 'bg-blue-50 text-blue-600';
    const inactiveStyles = 'text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700';

    // State to track which dropdowns are open
    const [isSekretarisOpen, setSekretarisOpen] = useState(false);
    const [isKeamananOpen, setKeamananOpen] = useState(false);
    const [isLainnyaOpen, setLainnyaOpen] = useState(false);

    // Update dropdown states based on the current route
    useEffect(() => {
        setSekretarisOpen(
            currentRoute.includes('/data-santri') || 
            currentRoute.includes('/data-peraturan') ||
            currentRoute.includes('/data-pengguna') 
        );
        
        setKeamananOpen(
            currentRoute.includes('/input-pelanggaran-santri')
        );

        setLainnyaOpen(
            currentRoute.includes('/about') || 
            currentRoute.includes('/contact') || 
            currentRoute.includes('/profile/edit')
        );
    }, [currentRoute]);

    return (
        <aside
            id="logo-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:translate-x-0`}
            aria-label="Sidebar"
        >
            <div className="h-full flex flex-col px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="flex-grow overflow-y-auto space-y-2 font-medium">

                    {/* Dashboard */}
                    <li>
                        <Link 
                            href={route('dashboard')} 
                            className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/dashboard') ? activeStyles : inactiveStyles}`}
                        >
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>

                    {/* Sekretaris Dropdown */}
                    <li>
                        <button 
                            onClick={() => setSekretarisOpen(!isSekretarisOpen)} 
                            className="flex items-center p-2 rounded-lg w-full text-left"
                        >
                            <span className="ml-3">Sekretaris</span>
                            <span className="ml-auto">
                                {isSekretarisOpen ? '▼' : '▶'}
                            </span>
                        </button>
                        {isSekretarisOpen && (
                            <ul className="ml-6 space-y-2">
                                <li>
                                    <Link 
                                        href={route('data-santri')} 
                                        className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/data-santri') ? activeStyles : inactiveStyles}`}
                                    >
                                        <span className="ml-3">Data Santri</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href={route('data-peraturan')} 
                                        className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/data-peraturan') ? activeStyles : inactiveStyles}`}
                                    >
                                        <span className="ml-3">Data Peraturan</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href={route('data-pengguna')} 
                                        className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/data-pengguna') ? activeStyles : inactiveStyles}`}
                                    >
                                        <span className="ml-3">Data pengguna</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Keamanan Dropdown */}
                    <li>
                        <button 
                            onClick={() => setKeamananOpen(!isKeamananOpen)} 
                            className="flex items-center p-2 rounded-lg w-full text-left"
                        >
                            <span className="ml-3">Keamanan</span>
                            <span className="ml-auto">
                                {isKeamananOpen ? '▼' : '▶'}
                            </span>
                        </button>
                        {isKeamananOpen && (
                            <ul className="ml-6 space-y-2">
                                <li>
                                    <Link 
                                        href={route('input-pelanggaran-santri')} 
                                        className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/input-pelanggaran-santri') ? activeStyles : inactiveStyles}`}
                                    >
                                        <span className="ml-3">Input Pelanggaran Santri</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Lainnya Dropdown */}
                    <li>
                        <button 
                            onClick={() => setLainnyaOpen(!isLainnyaOpen)} 
                            className="flex items-center p-2 rounded-lg w-full text-left"
                        >
                            <span className="ml-3">Lainnya</span>
                            <span className="ml-auto">
                                {isLainnyaOpen ? '▼' : '▶'}
                            </span>
                        </button>
                        {isLainnyaOpen && (
                            <ul className="ml-6 space-y-2">
                                {/* <li>
                                    <Link 
                                        href="/about" 
                                        className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/about') ? activeStyles : inactiveStyles}`}
                                    >
                                        <span className="ml-3">About</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/contact" 
                                        className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/contact') ? activeStyles : inactiveStyles}`}
                                    >
                                        <span className="ml-3">Contact</span>
                                    </Link>
                                </li> */}
                                <li>
                                    <Link 
                                        href={route('profile.edit')} 
                                        className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/profile/edit') ? activeStyles : inactiveStyles}`}
                                    >
                                        <span className="ml-3">Profile</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Atur Role */}
                    <li>
                        <Link 
                            href={route('atur-role')} 
                            className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/atur-role') ? activeStyles : inactiveStyles}`}
                        >
                            <span className="ml-3">Atur Role</span>
                        </Link>
                    </li>
                </ul>

                <div className="mt-auto">
                    <hr className="border-gray-700 my-2" />
                    <Link
                        href={route('logout')}
                        method="post"
                        className="block py-2 text-gray-500 font-bold hover:text-blue-600 text-center"
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </aside>
    );
}
