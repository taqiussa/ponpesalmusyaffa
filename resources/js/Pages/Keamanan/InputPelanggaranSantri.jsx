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
import Loading from '@/Components/Loading';
import Hapus from '@/hooks/Hapus';

export default function InputPelanggaranSantri({ initTahun, listSantri, listPeraturan, listPelanggaran }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tahun: initTahun,
        jenis_kelamin: '',
        tanggal: dayjs().format('YYYY-MM-DD'), // ini harus nya di inisialisasi seperti tahun ada initTahunnya tahu kan penggunaan dayjs ini untuk apa ?
        jumlah: 1,
        pelanggaran_id: null,
        nis: null,
    });

    console.log(listPelanggaran);

    const [filteredSantri, setFilteredSantri] = useState([]);

    // Filter santri berdasarkan tahun dan jenis kelamin
    useEffect(() => {
        let filtered = listSantri.filter(santri => santri.tahun === data.tahun);
        if (data.jenis_kelamin) {
            filtered = filtered.filter(santri => santri.jenis_kelamin === data.jenis_kelamin);
        }
        setFilteredSantri(filtered);
    }, [data.tahun, data.jenis_kelamin, listSantri]);

    // Filter pelanggaran berdasarkan tanggal
    // useEffect(() => {
    //     const filtered = listPelanggaran.filter(pelanggaran => pelanggaran.tanggal === data.tanggal);
    //     setFilteredPelanggaran(filtered);
    //     console.log('Filtered Pelanggaran:', filtered);
    // }, [data.tanggal, listPelanggaran]);
    // ini harusnya pakai usefilter bukan seperti ini

    // sudah saya buatkan usefilter yang dependencie nya bisa di custom jadi hanya mereload data
    // yang dependencie nya di sebutkan, semacam di useeffect, pada function dibawah ini akan terpicu
    // jika data.tanggal ganti, selain itu tidak memicu usefilter

    const { isProcessing } = useFilter({
        route: route('input-pelanggaran-santri'),
        values: data,
        depend: [data.tanggal]
    })

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

    return (
        <Main>
            <Head title="Input Pelanggaran Santri" />
            <div className="mb-6 overflow-x-hidden">
                <h2 className="text-3xl font-bold text-blue-600">Input Pelanggaran Santri</h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-2" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    {/* Tahun Component */}
                    <FormField error={errors.tahun}>
                        <Tahun
                            name="tahun"
                            id="tahun"
                            value={data.tahun}
                            handleChange={e => setData('tahun', e.target.value)}
                            message={errors.tahun}
                        />
                    </FormField>

                    {/* Jenis Kelamin Component */}
                    <FormField error={errors.jenis_kelamin}>
                        <JenisKelamin
                            name="jenis_kelamin"
                            id="jenis_kelamin"
                            value={data.jenis_kelamin}
                            handleChange={e => setData('jenis_kelamin', e.target.value)}
                            message={errors.jenis_kelamin}
                        />
                    </FormField>

                    {/* Pilih Santri */}
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

                    {/* Pilih Peraturan */}
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

                    {/* Tanggal */}
                    <FormField label="Tanggal Melanggar" error={errors.tanggal}>
                        <input
                            type="date"
                            value={data.tanggal}
                            onChange={e => setData('tanggal', e.target.value)}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    {/* Jumlah */}
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
                    <h3 className="text-xl font-bold mt-5 lg:mt-0">Santri Yang Melanggar Hari Ini</h3>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md items-end py-2 px-3 hover:bg-blue-600 transition duration-200 md:w-auto lg:w-auto sm:w-20 w-20 mb-4"
                        disabled={processing}
                    >
                        {processing ? <Spinner /> : 'Simpan'}
                    </button>
                </div>
            </form>

            {/* Data Table */}
            <div className="border border-blue-200 mt-5 rounded-xl overflow-x-auto shadow-lg">
                <table className="w-full text-base text-slate-600 overflow-hidden">
                    <thead className="text-base text-white bg-blue-600">
                        <tr className="whitespace-nowrap text-center uppercase font-semibold">
                            <th className="py-3 px-4 border-b">No</th>
                            <th className="py-3 px-4 border-b">NIS</th>
                            <th className="py-3 px-4 border-b">Nama Santri</th>
                            <th className="py-3 px-4 border-b">Pelanggaran</th>
                            <th className="py-3 px-4 border-b">Kategori</th>
                            <th className="py-3 px-4 border-b">Hukuman</th>
                            <th className="py-3 px-4 border-b">Jumlah</th>
                            <th className="py-3 px-4 border-b">Nama Pengurus</th>
                            <th className="py-3 px-4 border-b">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isProcessing ? (
                            <tr>
                                <td colSpan="9">
                                    <Loading isProcessing={isProcessing} />
                                </td>
                            </tr>
                        ) : listPelanggaran && listPelanggaran.length > 0 ? (
                            listPelanggaran.map((list, index) => (
                                <tr key={index} className="bg-white border-b whitespace-nowrap text-center hover:bg-slate-100 transition duration-200">
                                    <td className="py-3 px-4">{index + 1}.</td>
                                    <td className="py-3 px-4">{list?.nis}</td>
                                    <td className="py-3 px-4">{list?.santri?.name}</td>
                                    <td className="py-3 px-4">{list?.pelanggaran?.nama}</td>
                                    <td className="py-3 px-4">{list?.pelanggaran?.kategori}</td>
                                    <td className="py-3 px-4">{list?.pelanggaran?.hukuman}</td>
                                    <td className="py-3 px-4">{list?.jumlah}</td>
                                    <td className="py-3 px-4">{list?.pengurus?.name}</td>
                                    <td className="py-3 px-4">
                                        <Hapus
                                            id={list.id}
                                            routes={'input-pelanggaran-santri.hapus'}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-5 text-red-600 italic">
                                    Tidak ada santri yang melanggar hari ini.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Main>
    );
}
