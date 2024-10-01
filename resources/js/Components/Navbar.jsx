import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";

export default function Navbar({ toggleSidebar }) {
    const user = usePage().props.auth.user;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-30">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo di kiri */}
                <h1 className="text-2xl font-bold">My Logo</h1>

                {/* Tombol Menu untuk Mobile */}
                <button
                    className="md:hidden text-white"
                    onClick={toggleSidebar}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 md:hidden transition-transform duration-300 transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                {/* Dropdown Settings dan Logout di Desktop */}
                <ul className="hidden md:flex space-x-4 items-center">
                    <li className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="hover:text-gray-300"
                        >
                            {user.name}
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 z-20">
                                <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link href={route('profile.edit')}>Profile</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-200">
                                    {/* <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Logout
                                    </Link> */}
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
