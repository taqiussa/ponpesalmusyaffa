import { Link, usePage } from '@inertiajs/react';
import React from 'react';

export default function Sidebar({ isOpen }) {
    const user = usePage().props.auth.user;
    const currentRoute = usePage().url;

    const activeStyles = 'bg-[#0B6477] text-white';
    const inactiveStyles = 'text-gray-900 dark:text-white hover:text-white hover:bg-[#14919B] dark:hover:bg-[#14919B]';

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
                    <li>
                        <Link
                            href={route('dashboard')}
                            className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/dashboard') ? activeStyles : inactiveStyles}`}
                        >
                            <svg className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${currentRoute.includes('/dashboard') ? activeStyles : inactiveStyles}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                            </svg>
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('data-santri')}
                            className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/data-santri') ? activeStyles : inactiveStyles}`}
                        >
                            <svg className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${currentRoute.includes('/data-santri') ? activeStyles : inactiveStyles}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                            </svg>
                            <span className="ml-3">Data Santri</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href={route('data-pengguna')} 
                            className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/data-pengguna') ? activeStyles : inactiveStyles}`}
                        >
                            <svg className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${currentRoute.includes('/data-pengguna') ? activeStyles : inactiveStyles}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg"fill="currentColor" viewBox="0 0 20 18">
                                <path fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clipRule="evenodd"/>
                            </svg>
                            <span className="ml-3">Data Pengguna</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href={route('tambah-data-alumni')} 
                            className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/tambah-data-alumni') ? activeStyles : inactiveStyles}`}
                        >
                            <svg className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${currentRoute.includes('/data-alumni') ? activeStyles : inactiveStyles}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 22">
                                <path d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                            </svg>
                            <span className="ml-3">Tambah Data Alumni</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href={route('data-peraturan')} 
                            className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/data-peraturan') ? activeStyles : inactiveStyles}`}
                        >
                            <svg className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${currentRoute.includes('/data-peraturan') ? activeStyles : inactiveStyles}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path fillRule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Zm2 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Z" clipRule="evenodd"/>
                            </svg>
                            <span className="ml-3">Data Peraturan</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href={route('input-pelanggaran-santri')} 
                            className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/input-pelanggaran-santri') ? activeStyles : inactiveStyles}`}
                        >
                            <svg className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${currentRoute.includes('/input-pelanggaran-santri') ? activeStyles : inactiveStyles}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path fillRule="evenodd" d="M18 5.05h1a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2h1v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1Zm-15 6v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8H3ZM11 18a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1Z" clipRule="evenodd"/>
                            </svg>
                            <span className="ml-3">Input Pelanggaran Santri</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href={route('profil-pengguna')} 
                            className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/profile-pengguna') ? activeStyles : inactiveStyles}`}
                        >
                            <svg className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${currentRoute.includes('/profile-pengguna') ? activeStyles : inactiveStyles}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path fillRule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clipRule="evenodd"/>
                            </svg>
                            <span className="ml-3">Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href={route('atur-role')} 
                            className={`flex items-center p-2 rounded-lg ${currentRoute.includes('/atur-role') ? activeStyles : inactiveStyles}`}
                        >
                            <svg className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${currentRoute.includes('/atur-role') ? activeStyles : inactiveStyles}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clipRule="evenodd"/>
                            </svg>
                            <span className="ml-3">Atur Role</span>
                        </Link>
                    </li>
                </ul>
                <div className="mt-auto">
                    <hr className="border-gray-700 my-2" />
                    <Link
                        href={route('logout')}
                        method="post"
                        as='button'
                        className="block py-2 text-gray-500 font-bold hover:text-white hover:bg-[#14919B] rounded-lg text-center"
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </aside>
    );
}
