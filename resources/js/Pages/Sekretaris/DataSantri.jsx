import React, { useEffect, useState } from 'react';
import JenisKelamin from '@/Components/JenisKelamin';
import Tahun from '@/Components/Tahun';
import Main from '@/Layouts/Main';
import { Head, Link, useForm } from '@inertiajs/react';
import { useFilter } from '@/hooks/useFilter';
import Loading from '@/Components/Loading';
import Pagination from '@/Components/Pagination';
import { formatTanggalLahir } from '@/hooks/formatTanggalLahir';

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
        values: data,
    });

    return (
        <Main>
            <Head title="Data Santri" />
            <div className="mb-4">
                <h2 className="text-3xl font-bold text-blue-600">Data Santri</h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-1" />
            </div>

            <div className="grid md:grid-cols-2 gap-2 pb-2 lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0">
                <Tahun
                    id="tahun"
                    name="tahun"
                    value={data.tahun}
                    message={errors.tahun}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
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

            <div className="border border-blue-200 mt-5 rounded-xl overflow-x-auto shadow-lg">
                <table className="w-full text-base text-slate-600 overflow-hidden">
                    <thead className="text-base text-white bg-blue-600">
                        <tr className="whitespace-nowrap text-center uppercase font-semibold">
                            <th className="px-2 py-4">No</th>
                            <th className="px-2 py-4">NIS</th>
                            <th className="px-2 py-4">Nama</th>
                            <th className="px-2 py-4">TTL</th>
                            <th className="px-2 py-4">NIK</th>
                            <th className="px-2 py-4">Ayah</th>
                            <th className="px-2 py-4">Ibu</th>
                            <th className="px-2 py-4">Desa</th>
                            <th className="px-2 py-4">Telepon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isProcessing ? (
                            <tr>
                                <td colSpan="9" className="text-center py-4">
                                    <Loading isProcessing={isProcessing} />
                                </td>
                            </tr>
                        ) : listSantri.data.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="select-none text-center py-4 text-red-600 italic">
                                    {data.search ? 'Data Santri Tidak Ditemukan.' : 'Data Santri Kosong.'}
                                </td>
                            </tr>
                        ) : (
                            listSantri.data.map((santri, index) => (
                                <tr key={santri.nis} className="bg-white border-b whitespace-nowrap text-center hover:bg-slate-300 odd:bg-slate-200">
                                    <td className="px-2 py-3">
                                        {index + 1 + (listSantri.current_page - 1) * listSantri.per_page}.
                                    </td>
                                    <td className="px-2 py-3">{santri.santri.nis || <span className="text-red-300 select-none italic">Data Kosong</span>}</td>
                                    <td className="px-2 py-3">{santri.santri.name || <span className="text-red-300 select-none italic">Data Kosong</span>}</td>
                                    <td className="px-2 py-3">
                                        {santri.biodata.tempat_lahir}, {santri.biodata.tanggal_lahir ? formatTanggalLahir(santri.biodata.tanggal_lahir) : ''}
                                    </td>
                                    <td className="px-2 py-3">{santri.biodata.nik || <span className="text-red-300 select-none italic">Data Kosong</span>}</td>
                                    <td className="px-2 py-3">{santri.biodata.ayah || <span className="text-red-300 select-none italic">Data Kosong</span>}</td>
                                    <td className="px-2 py-3">{santri.biodata.ibu || <span className="text-red-300 select-none italic">Data Kosong</span>}</td>
                                    <td className="px-2 py-3">
                                        {santri.biodata.rt && <span>RT {santri.biodata.rt}, </span>}
                                        {santri.biodata.rw && <span>RW {santri.biodata.rw}, </span>}
                                        {santri.biodata.desa && <span>{santri.biodata.desa}, </span>}
                                        {santri.biodata.kecamatan && <span>{santri.biodata.kecamatan}, </span>}
                                        {santri.biodata.kabupaten && <span>{santri.biodata.kabupaten}, </span>}
                                        {santri.biodata.provinsi && <span>{santri.biodata.provinsi}</span>}
                                    </td>
                                    <td className="px-2 py-3">{santri.biodata.telepon || <span className="text-red-300 select-none italic">Data Kosong</span>}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {listSantri.links.length > 0 && (
                <Pagination links={listSantri.links} />
            )}
        </Main>
    );
}
