import JenisKelamin from '@/Components/JenisKelamin';
import Tahun from '@/Components/Tahun';
import Main from '@/Layouts/Main';
import { Head, Link, useForm } from '@inertiajs/react';
import { useFilter } from '@/hooks/useFilter';
import React from 'react';

export default function DataSantri({ initTahun, listSantri }) {
    const { data, setData, errors } = useForm({
        tahun: initTahun,
        jenis_kelamin: '',
        search: '' // Add search to form state
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const { isProcessing } = useFilter({
        route: 'data-santri',
        values: data
    });

    return (
        <Main>
            <Head title="Data Santri" />
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Data Santri</h2>
                <div className="w-2/3 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-2 pb-2 lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0">
                <Tahun
                    id="tahun"
                    name="tahun"
                    value={data.tahun}
                    message={errors.tahun}
                    handleChange={onHandleChange}
                />
                <JenisKelamin
                    id="jenis_kelamin"
                    name="jenis_kelamin"
                    value={data.jenis_kelamin}
                    message={errors.jenis_kelamin}
                    handleChange={onHandleChange}
                />
            </div>

            {/* Search Input */}
            <div className="flex flex-col capitalize text-slate-600 py-2 pb-3">
                <label htmlFor="search">Cari</label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={data.search}
                    onChange={onHandleChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                    placeholder="Cari Nama Santri...."
                />
            </div>

            {isProcessing ? (
                <div>Loading...</div>
            ) : (
                <div className="pt-2 overflow-x-auto">
                    <table className="w-full text-sm text-slate-600 border border-gray-300 rounded-xl overflow-hidden">
                        <thead className="text-sm text-slate-600 bg-gray-50">
                            <tr>
                                <th className="px-2 py-3">No.</th>
                                <th className="px-2 py-3 text-left">NIS</th>
                                <th className="px-2 py-3 text-left">Nama</th>
                                <th className="px-2 py-3 text-left">NIK</th>
                                <th className="px-2 py-3 text-left">Ayah</th>
                                <th className="px-2 py-3 text-left">Ibu</th>
                                <th className="px-2 py-3 text-left">Desa</th>
                                <th className="px-2 py-3 text-left">Telepon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listSantri.data.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-4">
                                        <span className="text-red-600 cursor-default" style={{ userSelect: 'none' }}>
                                            {data.search ? 'Tidak ada data yang ditemukan untuk pencarian ini.' : 'Data kosong.'}
                                        </span>
                                    </td>
                                </tr>
                            ) : (
                                listSantri.data.map((santri, index) => (
                                    <tr key={santri.nis} className="bg-white border-b whitespace-nowrap hover:bg-slate-300 odd:bg-slate-200">
                                        <td className="px-2 py-2 text-center">
                                            {index + 1 + (listSantri.current_page - 1) * listSantri.per_page}.
                                        </td>
                                        <td className="px-2 py-2">{santri.nis || <span className="text-gray-400 text-center select-none italic">Data Kosong</span>}</td>
                                        <td className="px-2 py-2">{santri.santri.name || <span className="text-gray-400 text-center select-none italic">Data Kosong</span>}</td>
                                        <td className="px-2 py-2">{santri.biodata.nik || <span className="text-gray-400 text-center select-none italic">Data Kosong</span>}</td>
                                        <td className="px-2 py-2">{santri.biodata.ayah || <span className="text-gray-400 text-center select-none italic">Data Kosong</span>}</td>
                                        <td className="px-2 py-2">{santri.biodata.ibu || <span className="text-gray-400 text-center select-none italic">Data Kosong</span>}</td>
                                        <td className="px-2 py-2">
                                            {santri.biodata.rt && <span>RT {santri.biodata.rt}, </span>}
                                            {santri.biodata.rw && <span>RW {santri.biodata.rw}, </span>}
                                            {santri.biodata.desa && <span>{santri.biodata.desa}, </span>}
                                            {santri.biodata.kecamatan && <span>{santri.biodata.kecamatan}, </span>}
                                            {santri.biodata.kabupaten && <span>{santri.biodata.kabupaten}, </span>}
                                            {santri.biodata.provinsi && <span>{santri.biodata.provinsi}</span>}
                                        </td>
                                        <td className="px-2 py-2">{santri.biodata.telepon || <span className="text-gray-400 text-center select-none italic">Data Kosong</span>}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination Controls */}
            {listSantri.links.length > 0 && (
                <div className="p-4">
                    <nav className="flex justify-center">
                        <ul className="flex flex-wrap justify-center md:gap-0 gap-y-4 space-x-1">
                            {listSantri.links.map((link, index) => {
                                const label = link.label
                                    .replace('Next', '')
                                    .replace('Previous', '')
                                    .replace('&laquo;', '«')
                                    .replace('&raquo;', '»');

                                return (
                                    <li key={index} className={`mx-1 ${link.active ? 'font-bold' : ''}`}>
                                        <Link
                                            href={link.url}
                                            className={`px-4 py-2 border rounded-md text-gray-700 ${link.active ? 'bg-blue-600 text-white' : 'bg-white border-gray-300 hover:bg-blue-400 hover:text-white'} text-sm`}
                                        >
                                            {label.trim()}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            )}
        </Main>
    );
}
