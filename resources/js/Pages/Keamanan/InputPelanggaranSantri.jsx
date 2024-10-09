import React, { useEffect, useState } from 'react';
import Main from '@/Layouts/Main';
import { Head, useForm } from '@inertiajs/react';
import Select from 'react-select';
import Swal from 'sweetalert2';

const FormField = ({ label, error, children }) => (
    <div className="mb-4">
        <label className="block text-slate-600 capitalize mb-1">{label}</label>
        {children}
        {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
);

export default function InputPelanggaranSantri({ initTahun, listSantri, listPeraturan }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tahun: initTahun,
        jenis_kelamin: '',
        tanggal: '',
        jumlah: 0,
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

    const showAlert = (icon, title, text, timer = null) => {
        Swal.fire({
            icon,
            title,
            text,
            showConfirmButton: !timer,
            timer,
            customClass: {
                popup: 'bg-white shadow-lg rounded-lg p-6',
                title: 'text-xl font-semibold',
                htmlContainer: 'text-lg',
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('input-pelanggaran-santri.simpan'), {
            onSuccess: () => {
                showAlert('success', 'Berhasil!', 'Data pelanggaran santri berhasil disimpan.', 3500);
                reset();
            },
            onError: () => {
                showAlert('error', 'Gagal!', 'Data pelanggaran santri gagal disimpan.');
            }
        });
    };

    return (
        <Main>
            <Head title="Input Pelanggaran Santri" />
            <div className="mb-6 overflow-x-hidden">
                <h2 className="text-3xl font-bold text-blue-600">Input Pelanggaran Santri</h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-2" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <FormField label="Pilih Tahun" error={errors.tahun}>
                        <select
                            value={data.tahun}
                            onChange={e => setData('tahun', e.target.value)}
                            className="border border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full p-2"
                        >
                            <option value="">Pilih Tahun</option>
                            {Array.from({ length: 5 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                    <option key={year} value={`${year} / ${year + 1}`}>
                                        {`${year} / ${year + 1}`}
                                    </option>
                                );
                            })}
                        </select>
                    </FormField>

                    <FormField label="Jenis Kelamin" error={errors.jenis_kelamin}>
                        <select
                            value={data.jenis_kelamin}
                            onChange={e => setData('jenis_kelamin', e.target.value)}
                            className="border border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full p-2"
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
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
                            className="border border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full"
                        />
                    </FormField>

                    <FormField label="Pilih Peraturan" error={errors.pelanggaran_id}>
                        <Select
                            options={listPeraturan}
                            value={listPeraturan.find(peraturan => peraturan.id === data.pelanggaran_id) || null}
                            onChange={selectedOption => setData('pelanggaran_id', selectedOption ? selectedOption.id : null)}
                            placeholder="Cari Peraturan..."
                            isSearchable
                            getOptionLabel={peraturan => peraturan.nama}
                            getOptionValue={peraturan => peraturan.id}
                            className="border border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full"
                        />
                    </FormField>

                    <FormField label="Tanggal" error={errors.tanggal}>
                        <input
                            type="date"
                            value={data.tanggal}
                            onChange={e => setData('tanggal', e.target.value)}
                            className="border border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full p-2"
                        />
                    </FormField>

                    <FormField label="Jumlah" error={errors.jumlah}>
                        <input
                            type="number"
                            value={data.jumlah}
                            onChange={e => setData('jumlah', e.target.value)}
                            className="border border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full p-2"
                            placeholder="Masukkan jumlah"
                        />
                    </FormField>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-200"
                        disabled={processing}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </form>
        </Main>
    );
}
