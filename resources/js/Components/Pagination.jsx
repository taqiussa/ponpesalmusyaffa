import React from 'react';
import { Link } from '@inertiajs/react';

const Pagination = ({ links }) => {
    if (!links.length) return null;

    return (
        <div className="p-4">
            <nav className="flex justify-center">
                <ul className="flex flex-wrap justify-center md:gap-0 gap-y-4 space-x-1">
                    {links.map((link, index) => {
                        const label = link.label
                            .replace('Next', '')
                            .replace('Previous', '')
                            .replace('&laquo;', '«')
                            .replace('&raquo;', '»');

                        if (!link.url) {
                            return (
                                <li key={index} className={`mx-1 ${link.active ? 'font-bold' : ''}`}>
                                    <span
                                        className={`px-4 py-2 border rounded-md text-gray-700 ${link.active ? 'bg-blue-400 text-white' : 'bg-white border-gray-300 text-sm'}`}
                                    >
                                        {label.trim()}
                                    </span>
                                </li>
                            );
                        }

                        return (
                            <li key={index} className={`mx-1 ${link.active ? 'font-bold' : ''}`}>
                                <Link
                                    href={link.url}
                                    method="get"
                                    as="a"
                                    className={`px-4 py-2 border rounded-md text-gray-700 ${link.active ? 'bg-blue-400 text-white' : 'bg-white border-gray-300 hover:bg-blue-400 hover:text-white'} text-sm`}
                                    preserveState
                                    replace
                                >
                                    {label.trim()}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
