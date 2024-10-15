import React from 'react';
import Main from '@/Layouts/Main';
import { Head, useForm, router } from '@inertiajs/react';
import ShowAlert from '@/Components/ShowAlert';
import FormField from '@/Components/FormField';
import Spinner from '@/Components/Spinner';
import Hapus from '@/hooks/Hapus';

export default function DataPeraturan({ listPeraturan }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        kategori: '',
        hukuman: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('data-peraturan.simpan'), {
            onSuccess: () => {
                ShowAlert({ icon: 'success', title: 'Berhasil!', text: 'Peraturan berhasil ditambahkan.', timer: 3500 });
                reset();
            },
            onError: () => {
                ShowAlert({ icon: 'error', title: 'Gagal!', text: 'Peraturan gagal ditambahkan.', timer: 3500 });
            }
        });
    };

    return (
        <Main>
            <Head title="Data Peraturan" />
            <div className="mb-6 overflow-x-hidden">
                <h2 className="text-3xl font-bold text-blue-600">Tambah Peraturan</h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-2" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Kategori */}
                <FormField label="Kategori" error={errors.kategori}>
                    <select
                        id="kategori"
                        value={data.kategori}
                        onChange={e => setData('kategori', e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md md:w-1/2 lg:w-1/2 sm:w-full w-full shadow-blue-300 focus:ring"
                    >
                        <option value="">Pilih Kategori</option>
                        <option value="ringan">Ringan</option>
                        <option value="sedang">Sedang</option>
                        <option value="berat">Berat</option>
                    </select>
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    {/* Keterangan Peraturan */}
                    <FormField label="Keterangan Peraturan" error={errors.nama}>
                        <textarea
                            id="nama"
                            value={data.nama}
                            autoComplete="off"
                            onChange={e => setData('nama', e.target.value)}
                            className="border-gray-300 h-24 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    {/* Hukuman */}
                    <FormField label="Keterangan Hukuman" error={errors.hukuman}>
                        <textarea
                            id="hukuman"
                            value={data.hukuman}
                            autoComplete="off"
                            onChange={e => setData('hukuman', e.target.value)}
                            className="border-gray-300 h-24 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-200"
                        disabled={processing}
                    >
                        {processing ? <Spinner /> : 'Simpan'}
                    </button>
                </div>
            </form>

            {/* Tabel Peraturan */}
            <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">List Peraturan</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="text-left py-2 px-4 border-r">No</th>
                                <th className="text-left py-2 px-4 border-r">Keterangan Peraturan</th>
                                <th className="text-left py-2 px-4 border-r">Kategori</th>
                                <th className="text-left py-2 px-4 border-r">Keterangan Hukuman</th>
                                <th className="text-left py-2 px-4 border-r">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listPeraturan.length > 0 ? (
                                listPeraturan.map((peraturan, index) => (
                                    <tr key={peraturan.id} className="border-b">
                                        <td className="py-2 px-4 border-r">{index + 1}</td>
                                        <td className="py-2 px-4 border-r">{peraturan.nama}</td>
                                        <td className="py-2 px-4 border-r">{peraturan.kategori}</td>
                                        <td className="py-2 px-4 border-r">{peraturan.hukuman}</td>
                                        <td className="py-2 px-4 border-r">
                                        <Hapus
                                                id={peraturan.id}
                                                routes={'data-peraturan.hapus'}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        Tidak ada data peraturan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Main>
    );
}
