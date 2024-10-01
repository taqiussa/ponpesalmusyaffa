import { Link } from '@inertiajs/react';
import React from 'react';

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside
      className={`bg-gray-800 text-white w-64 min-h-screen p-4 flex flex-col fixed md:relative transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 
        transition-transform duration-300 ease-in-out z-20`}
    >

      {/* Logo di Sidebar */}
      <div className="flex items-center mb-4">
        <img src="/path/to/logo.png" alt="Logo" className="h-10 w-10 mr-2" />
        <h2 className="text-lg font-bold">My Logo</h2>
      </div>

      {/* Flex container untuk mengisi ruang sidebar */}
      <ul className="flex flex-col flex-1">
        <li className="py-3"><Link to={route('data-santri')} className="hover:text-gray-400">Data Santri</Link></li>
        <li className="py-3"><Link to="/about" className="hover:text-gray-400">About</Link></li>
        <li className="py-3"><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
        <li className="py-3 md:hidden"><Link href={route('profile.edit')}>Profile</Link></li>
      </ul>
      
      {/* Garis Pembatas dan Logout di pojok bawah (hanya muncul di mobile) */}
      <div className="md:hidden">
        <hr className="border-gray-700 my-2" />
        {/* <Link href={route("logout")} method="post" className="block py-2 hover:text-gray-400 text-center">Logout</Link> */}
      </div>
    </aside>
  );
}
