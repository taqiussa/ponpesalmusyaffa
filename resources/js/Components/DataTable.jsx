import React from 'react';
import Loading from '@/Components/Loading';

export default function DataTable({ columns, data, loading, emptyMessage = "Data Tidak Ditemukan" }) {
    return (
        <div className="mt-5 rounded-lg overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 table-auto">
                <thead className="text-xs text-white uppercase bg-gradient-to-r from-blue-400 to-blue-500">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} scope="col" className="px-2 py-4 text-center">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-4">
                                <Loading isProcessing={loading} />
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-4 text-red-600 italic">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex} className="bg-white hover:bg-gray-100 text-center">
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="px-2 py-4">
                                        {column.render ? column.render(item, rowIndex) : item[column.field]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
