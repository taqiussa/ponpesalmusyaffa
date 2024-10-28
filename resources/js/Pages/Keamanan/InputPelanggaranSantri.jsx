import React, { useEffect, useState } from 'react';
import Main from '@/Layouts/Main';
import { Head, useForm } from '@inertiajs/react';
import Select from 'react-select';
import ShowAlert from '@/Components/ShowAlert';
import FormField from '@/Components/FormField';
import Tahun from '@/Components/Tahun';
import JenisKelamin from '@/Components/JenisKelamin';
import Spinner from '@/Components/Spinner';
import dayjs from 'dayjs';
import { useFilter } from '@/hooks/useFilter';
import Hapus from '@/hooks/Hapus';
import DataTable from '@/Components/DataTable';

export default function InputPelanggaranSantri({ initTahun, listSantri, listPeraturan, listPelanggaran }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tahun: initTahun,
        jenis_kelamin: '',
        tanggal: dayjs().format('YYYY-MM-DD'),
        jumlah: 1,
        pelanggaran_id: null,
        nis: null,
    });

    const [filteredSantri, setFilteredSantri] = useState([]);

    useEffect(() => {
        let filtered = listSantri.filter(santri => santri.tahun === data.tahun);
        if (data.jenis_kelamin) {
            filtered = filtered.filter(santri => santri.jenis_kelamin === data.jenis_kelamin);
        }
        setFilteredSantri(filtered);
    }, [data.tahun, data.jenis_kelamin, listSantri]);

    const { isProcessing } = useFilter({
        route: route('input-pelanggaran-santri'),
        values: data,
        depend: [data.tanggal]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('input-pelanggaran-santri.simpan'), {
            onSuccess: () => {
                ShowAlert({ icon: 'success', title: 'Berhasil!', text: 'Data pelanggaran santri berhasil disimpan.', timer: 3500 });
                reset();
            },
            onError: () => {
                ShowAlert({ icon: 'error', title: 'Gagal!', text: 'Data pelanggaran santri gagal disimpan.', timer: 3500 });
            }
        });
    };

    const columns = [
        { label: 'No', field: 'no' },
        { label: 'NIS', field: 'nis' },
        { label: 'Nama Santri', field: 'santriName' },
        { label: 'Pelanggaran', field: 'pelanggaranName' },
        { label: 'Kategori', field: 'kategori' },
        { label: 'Hukuman', field: 'hukuman' },
        { label: 'Jumlah', field: 'jumlah' },
        { label: 'Nama Pengurus', field: 'pengurusName' },
        { label: 'Aksi', field: 'action', render: (item) => (
            <Hapus
                ids={item.id}
                routes={'input-pelanggaran-santri.hapus'}
            />
        ) }
    ];

    const tableData = listPelanggaran.map((list, index) => ({
        no: index + 1,
        nis: list?.nis,
        santriName: list?.santri?.name,
        pelanggaranName: list?.pelanggaran?.nama,
        kategori: list?.pelanggaran?.kategori,
        hukuman: list?.pelanggaran?.hukuman,
        jumlah: list?.jumlah,
        pengurusName: list?.pengurus?.name,
        id: list.id
    }));

    return (
        <Main>
            <Head title="Input Pelanggaran Santri" />
            <div className="mb-6 overflow-x-hidden">
                <h2 className="text-3xl font-bold text-blue-400">Input Pelanggaran Santri</h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent mt-2" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <FormField error={errors.tahun}>
                        <Tahun
                            name="tahun"
                            id="tahun"
                            value={data.tahun}
                            handleChange={e => setData('tahun', e.target.value)}
                            message={errors.tahun}
                        />
                    </FormField>

                    <FormField error={errors.jenis_kelamin}>
                        <JenisKelamin
                            name="jenis_kelamin"
                            id="jenis_kelamin"
                            value={data.jenis_kelamin}
                            handleChange={e => setData('jenis_kelamin', e.target.value)}
                            message={errors.jenis_kelamin}
                        />
                    </FormField>

                    <FormField label="Pilih Santri" error={errors.nis}>
                        <Select
                            options={filteredSantri}
                            value={filteredSantri.find(santri => santri.nis === data.nis) || null}
                            onChange={selectedOption => setData('nis', selectedOption ? selectedOption.nis : null)}
                            placeholder="Cari Santri..."
                            isSearchable
                            getOptionLabel={santri => santri.santri.name}
                            getOptionValue={santri => santri.nis}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    <FormField label="Pilih Pelanggaran" error={errors.pelanggaran_id}>
                        <Select
                            options={listPeraturan}
                            value={listPeraturan.find(peraturan => peraturan.id === data.pelanggaran_id) || null}
                            onChange={selectedOption => setData('pelanggaran_id', selectedOption ? selectedOption.id : null)}
                            placeholder="Cari Peraturan..."
                            isSearchable
                            getOptionLabel={peraturan => peraturan.nama}
                            getOptionValue={peraturan => peraturan.id}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    <FormField label="Tanggal Melanggar" error={errors.tanggal}>
                        <input
                            type="date"
                            value={data.tanggal}
                            onChange={e => setData('tanggal', e.target.value)}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    <FormField label="Jumlah Melanggar" error={errors.jumlah}>
                        <input
                            type="number"
                            value={data.jumlah}
                            onChange={e => setData('jumlah', e.target.value)}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                            placeholder="Masukkan jumlah"
                        />
                    </FormField>
                </div>

                <div className="mt-4 flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center sm:flex-col sm:justify-between sm:items-center">
                    <h3 className="text-xl font-bold mt-5 lg:mt-0 text-blue-400">
                        Santri Yang Melanggar Hari Ini
                    </h3>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md items-end py-2 px-3 hover:bg-blue-600 transition duration-200 md:w-auto lg:w-auto sm:w-20 w-20 mb-4"
                        disabled={processing}
                    >
                        {processing ? <Spinner /> : 'Simpan'}
                    </button>
                </div>
            </form>

            <DataTable 
                columns={columns}
                data={tableData}
                loading={isProcessing}
                emptyMessage="Tidak ada santri yang melanggar hari ini."
            />
        </Main>
    );
}
