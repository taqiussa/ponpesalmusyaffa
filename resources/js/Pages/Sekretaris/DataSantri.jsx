import React from 'react';
import Main from '@/Layouts/Main';
import { Head, Link, useForm } from '@inertiajs/react';
import JenisKelamin from '@/Components/JenisKelamin';
import Tahun from '@/Components/Tahun';

export default function DataSantri({ initTahun, listSantri }) {
    const {data, setData, post, errors, processing} = useForm({
        tahun: initTahun,
        jenis_kelamin: ''
    });

    console.log(initTahun);
    console.log(listSantri);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        submitForm();
    };

    const handleSearch = (e) => {
        setData('search', e.target.value);
        submitForm();
    };

    const submitForm = () => {
        get(route('santri.index'));
    };

    return (
        <Main>
            <Head title="Data Santri" />
            <div className="flex flex-col h-full">
                {/* Title */}
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-blue-600 mb-2">Data Santri</h1>
                    <hr className="border-blue-600 mb-4" />
                </div>

                <div className="px-4 flex flex-col md:flex-row md:space-x-4">
                    <Tahun
                        name="tahun"
                        value={data.tahun}
                        handleChange={handleChange}
                        className="flex-1 mb-4 md:mb-0 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <JenisKelamin
                        name="jenis_kelamin"
                        value={data.jenis_kelamin}
                        handleChange={handleChange}
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="p-4 pt-10">
                    <input
                        type="search"
                        placeholder="Cari Nama Santri..."
                        value={data.search}
                        onChange={handleSearch}
                        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex-grow overflow-y-auto rounded-xl">
                    <table className="text-left text-sm text-gray-700 w-full">
                        <thead className="bg-blue-600">
                            <tr className="font-medium text-center uppercase text-white">
                                <th className="px-6 py-3">No</th>
                                <th className="px-6 py-3">NIS</th>
                                <th className="px-6 py-3">Nama Santri</th>
                                <th className="px-6 py-3">TTL</th>
                                <th className="px-6 py-3">NIK</th>
                                <th className="px-6 py-3">Ayah</th>
                                <th className="px-6 py-3">Ibu</th>
                                <th className="px-6 py-3">Desa</th>
                                <th className="px-6 py-3">Telepon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listSantri.data.map((santri, index) => (
                                <tr key={santri.nis} className="border-b whitespace-nowrap hover:bg-blue-200 hover:text-black odd:bg-blue-100 odd:text-black">
                                    <td className="px-6 py-4">{(listSantri.current_page - 1) * listSantri.per_page + index + 1}</td>
                                    <td className="px-6 py-4">{santri.nis}</td>
                                    <td className="px-6 py-4">{santri.santri.name}</td>
                                    <td className="px-6 py-4">
                                        {santri.biodata.tempat_lahir}, {new Date(santri.biodata.tanggal_lahir).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">{santri.biodata.nik}</td>
                                    <td className="px-6 py-4">{santri.biodata.ayah}</td>
                                    <td className="px-6 py-4">{santri.biodata.ibu}</td>
                                    <td className="px-6 py-4">
                                        RT {santri.biodata.rt}, RW {santri.biodata.rw}, {santri.biodata.desa}, {santri.biodata.kecamatan}, {santri.biodata.kabupaten}, {santri.biodata.provinsi}
                                    </td>
                                    <td className="px-6 py-4">{santri.biodata.telepon}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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
            </div>
        </Main>
    );
}
