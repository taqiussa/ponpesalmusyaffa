import React from 'react';
import JenisKelamin from '@/Components/JenisKelamin';
import Tahun from '@/Components/Tahun';
import Main from '@/Layouts/Main';
import { Head, useForm } from '@inertiajs/react';
import { useFilter } from '@/hooks/useFilter';
import Pagination from '@/Components/Pagination';
import DataTable from '@/Components/DataTable';
import { formatTanggalLahir } from '@/hooks/formatTanggalLahir';
import FormField from '@/Components/FormField';

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

    const columns = [
        { label: 'No', field: 'no', render: (item, index) => index + 1 + (listSantri.current_page - 1) * listSantri.per_page, },
        { label: 'NIS', field: 'nis', render: (item) => item.santri.nis || <span className="text-red-300 italic">Data Kosong</span> },
        { label: 'Nama', field: 'name', render: (item) => item.santri.name || <span className="text-red-300 italic">Data Kosong</span> },
        { label: 'TTL', field: 'ttl', render: (item) => `${item.biodata.tempat_lahir}, ${item.biodata.tanggal_lahir ? formatTanggalLahir(item.biodata.tanggal_lahir) : ''}` },
        { label: 'NIK', field: 'nik', render: (item) => item.biodata.nik || <span className="text-red-300 italic">Data Kosong</span> },
        { label: 'Ayah', field: 'ayah', render: (item) => item.biodata.ayah || <span className="text-red-300 italic">Data Kosong</span> },
        { label: 'Ibu', field: 'ibu', render: (item) => item.biodata.ibu || <span className="text-red-300 italic">Data Kosong</span> },
        { label: 'Desa', field: 'desa', render: (item) => `${item.biodata.desa}, ${item.biodata.kecamatan}, ${item.biodata.kabupaten}, ${item.biodata.provinsi}` },
        { label: 'Telepon', field: 'telepon', render: (item) => item.biodata.telepon || <span className="text-red-300 italic">Data Kosong</span> }
    ];

    return (
        <Main>
            <Head title="Data Santri" />
            <div className="mb-4">
                <h2 className="text-3xl font-bold text-blue-400">Data Santri</h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent mt-1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
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

            <div className="grid grid-cols-1 mt-3 md:grid-cols-1 gap-4">
                <FormField label="Cari Santri" error={errors.search}>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={data.search}
                            autoComplete='off'
                        onChange={onHandleChange}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        placeholder="Cari Nama Santri . . ."
                    />
                </FormField>
            </div>

            <DataTable
                columns={columns}
                data={listSantri.data}
                loading={isProcessing}
                emptyMessage={data.search ? 'Data Santri Tidak Ditemukan.' : 'Data Santri Kosong.'}
            />

            {listSantri.links.length > 0 && (
                <Pagination links={listSantri.links} />
            )}
        </Main>
    );
}
