import React, { useEffect, useState } from 'react';
import JenisKelamin from '@/Components/JenisKelamin';
import Tahun from '@/Components/Tahun';
import Main from '@/Layouts/Main';
import { Head, Link, useForm } from '@inertiajs/react';
import { useFilter } from '@/hooks/useFilter';

export default function DataSantri({ initTahun, listSantri }) {
    const { data, setData, errors } = useForm({
        tahun: initTahun,
        jenis_kelamin: '',
        search: '',
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };  

    const { isProcessing } = useFilter({
        route: 'data-santri',
        values: data
    });

    const [loadingWidth, setLoadingWidth] = useState(0);

    useEffect(() => {
        let interval;
        if (isProcessing) {
            interval = setInterval(() => {
                setLoadingWidth((prevWidth) => (prevWidth >= 100 ? 0 : prevWidth + 10));
            }, 100);
        } else {
            setLoadingWidth(0);
        }
        return () => clearInterval(interval);
    }, [isProcessing]);

    const formatTanggalLahir = (dateString) => {
        const months = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
    
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
    
        return `${day} ${month} ${year}`;
    };

    return (
        <Main>
            <Head title="Data Santri" />
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Data Santri</h2>
                <div className="w-2/3 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-1" />
            </div>

            <div className="grid md:grid-cols-2 gap-2 pb-2 lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0">
                <Tahun
                    id="tahun"
                    name="tahun"
                    value={data.tahun}
                    message={errors.tahun}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring}"
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

            <div className="flex flex-col capitalize text-slate-600 py-2 pb-3">
                <label htmlFor="search">Cari</label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={data.search}
                    onChange={onHandleChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                    placeholder="Cari Nama Santri . . ."
                />
            </div>

            {isProcessing ? (
                <div className="relative w-full h-24 flex items-center justify-center">
                    <div className="relative h-2 my-auto w-1/2 bg-gray-200 rounded-lg">
                        <div
                            style={{
                                width: `${loadingWidth}%`,
                                height: '100%',
                                backgroundColor: 'blue',
                                borderRadius: 10,
                                transition: 'width 0.1s ease-in-out'
                            }}
                        />
                    </div>
                    <div className="absolute top-[60%] text-sm text-center font-semibold text-gray-700">
                        Memuat Halaman...
                    </div>
                </div>
            ) : (
                <div className="border border-blue-50 mt-3 rounded-xl overflow-x-auto">
                    <table className="w-full text-sm text-slate-600 overflow-hidden">
                        <thead className="text-sm text-slate-600 bg-gray-50">
                            <tr>
                                <th className="px-2 py-3">No.</th>
                                <th className="px-2 py-3 text-left">NIS</th>
                                <th className="px-2 py-3 text-left">Nama</th>
                                <th className="px-2 py-3 text-left">TTL</th>
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
                                    <td colSpan="9" className="select-none text-center py-4 text-red-600 italic">
                                        {data.search ? 'Data Santri Tidak Ditemukan.' : 'Data Santri Kosong.'}
                                    </td>
                                </tr>
                            ) : (
                                listSantri.data.map((santri, index) => (
                                    <tr key={santri.nis} className="bg-white border-b whitespace-nowrap hover:bg-slate-300 odd:bg-slate-200">
                                        <td className="px-2 py-2 text-center">
                                            {index + 1 + (listSantri.current_page - 1) * listSantri.per_page}.
                                        </td>
                                        <td className="px-2 py-2">{santri.santri.nis || <span className="text-red-300 text-center select-none italic">Data Kosong</span>}</td>
                                        <td className="px-2 py-2">{santri.santri.name || <span className="text-red-300 text-center select-none italic">Data Kosong</span>}</td>
                                        <td className="px-2 py-2">
                                            {santri.biodata.tempat_lahir}, {santri.biodata.tanggal_lahir ? formatTanggalLahir(santri.biodata.tanggal_lahir) : ''}
                                        </td>
                                        <td className="px-2 py-2">{santri.biodata.nik || <span className="text-red-300 text-center select-none italic">Data Kosong</span>}</td>
                                        <td className="px-2 py-2">{santri.biodata.ayah || <span className="text-red-300 text-center select-none italic">Data Kosong</span>}</td>
                                        <td className="px-2 py-2">{santri.biodata.ibu || <span className="text-red-300 text-center select-none italic">Data Kosong</span>}</td>
                                        <td className="px-2 py-2">
                                            {santri.biodata.rt && <span>RT {santri.biodata.rt}, </span>}
                                            {santri.biodata.rw && <span>RW {santri.biodata.rw}, </span>}
                                            {santri.biodata.desa && <span>{santri.biodata.desa}, </span>}
                                            {santri.biodata.kecamatan && <span>{santri.biodata.kecamatan}, </span>}
                                            {santri.biodata.kabupaten && <span>{santri.biodata.kabupaten}, </span>}
                                            {santri.biodata.provinsi && <span>{santri.biodata.provinsi}</span>}
                                        </td>
                                        <td className="px-2 py-2">{santri.biodata.telepon || <span className="text-red-300 text-center select-none italic">Data Kosong</span>}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

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

                                if (!link.url) {
                                    return (
                                        <li key={index} className={`mx-1 ${link.active ? 'font-bold' : ''}`}>
                                            <span
                                                className={`px-4 py-2 border rounded-md text-gray-700 ${link.active ? 'bg-blue-600 text-white' : 'bg-white border-gray-300 text-sm'}`}
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
                                            className={`px-4 py-2 border rounded-md text-gray-700 ${link.active ? 'bg-blue-600 text-white' : 'bg-white border-gray-300 hover:bg-blue-400 hover:text-white'} text-sm`}
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
            )}
        </Main>
    );
}
