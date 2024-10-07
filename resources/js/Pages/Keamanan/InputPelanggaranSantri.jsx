import React, { useEffect } from 'react';
import Main from '@/Layouts/Main';
import { Head, useForm } from '@inertiajs/react';
import JenisKelamin from '@/Components/JenisKelamin';
import Tahun from '@/Components/Tahun';
import Select from 'react-select';

export default function InputPelanggaranSantri({ initTahun, listSantri, listPeraturan }) {
    const { data, setData, post, processing, errors } = useForm({
        tahun: initTahun,
        jenis_kelamin: '',
        tanggal: '',
        jumlah: 0,
        pelanggaran_id: null,
        nis: null,
    });

    const [filteredSantri, setFilteredSantri] = React.useState([]);

    useEffect(() => {
        let filtered = listSantri.filter(santri => santri.tahun === data.tahun);
        if (data.jenis_kelamin) {
            filtered = filtered.filter(santri => santri.jenis_kelamin === data.jenis_kelamin);
        }
        setFilteredSantri(filtered);
    }, [data.tahun, data.jenis_kelamin, listSantri]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('input-pelanggaran-santri.simpan'));
    };

    return (
        <Main>
            <Head title='Input Pelanggaran Santri' />
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Input Pelanggaran Santri</h2>
                <div className="w-2/3 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-1" />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Tahun 
                            name="tahun" 
                            id="tahun" 
                            value={data.tahun} 
                            handleChange={e => setData('tahun', e.target.value)} 
                        />
                        {errors.tahun && <div className="text-red-500">{errors.tahun}</div>}
                    </div>

                    <div>
                        <JenisKelamin 
                            name="jenis_kelamin" 
                            id="jenis_kelamin" 
                            value={data.jenis_kelamin} 
                            handleChange={e => setData('jenis_kelamin', e.target.value)} 
                        />
                        {errors.jenis_kelamin && <div className="text-red-500">{errors.jenis_kelamin}</div>}
                    </div>

                    <div className="mt-4">
                        <label className="block text-slate-600 capitalize mb-2">Pilih Santri</label>
                        <Select
                            options={filteredSantri}
                            value={data.nis}
                            onChange={selectedOption => setData('nis', selectedOption)}
                            placeholder="Cari Santri..."
                            isSearchable
                            className="w-full"
                            getOptionLabel={santri => santri.santri.name}
                            getOptionValue={santri => santri.id}
                        />
                        {errors.nis && <div className="text-red-500">{errors.nis}</div>}
                    </div>

                    <div className="mt-4">
                        <label className="block text-slate-600 capitalize mb-2">Pilih Peraturan</label>
                        <Select
                            options={listPeraturan}
                            value={listPeraturan.find(peraturan => peraturan.id === data.pelanggaran_id) || null}  // Ensure it's the full object
                            onChange={selectedOption => setData('pelanggaran_id', selectedOption ? selectedOption.id : null)}
                            placeholder="Cari Peraturan..."
                            isSearchable
                            className="w-full"
                            getOptionLabel={peraturan => peraturan.nama}
                            getOptionValue={peraturan => peraturan.id}
                        />
                        {errors.pelanggaran_id && <div className="text-red-500">{errors.pelanggaran_id}</div>}
                    </div>

                    <div className="mt-4">
                        <label className="block text-slate-600 capitalize mb-2">Tanggal</label>
                        <input
                            type="date"
                            value={data.tanggal}
                            onChange={e => setData('tanggal', e.target.value)}
                            className="border rounded p-2 w-full"
                        />
                        {errors.tanggal && <div className="text-red-500">{errors.tanggal}</div>}
                    </div>

                    <div className="mt-4">
                        <label className="block text-slate-600 capitalize mb-2">Jumlah</label>
                        <input
                            type="number"
                            value={data.jumlah}
                            onChange={e => setData('jumlah', e.target.value)}
                            className="border rounded p-2 w-full"
                            placeholder="Masukkan jumlah"
                        />
                        {errors.jumlah && <div className="text-red-500">{errors.jumlah}</div>}
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition duration-200"
                        disabled={processing}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </form>
        </Main>
    );
}
