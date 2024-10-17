import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Main from '@/Layouts/Main';
import { Head, Link } from '@inertiajs/react';
import FormField from '@/Components/FormField';
import Spinner from '@/Components/Spinner';
import Hapus from '@/hooks/Hapus';
import { Edit } from 'react-feather';
import { useFilter } from '@/hooks/useFilter';
import Loading from '@/Components/Loading';

export default function TambahDataPengguna({ listUser }) {
    const [form, setForm, processing, data ] = useState({
        name: '',
        username: '',
        password: '',
        password_confirmation: ''
    });

    const { isProcessing } = useFilter({
        route: "tambah-data-pengguna",
        values: data,
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('tambah-data-pengguna.simpan'), form, {
            onSuccess: () => {
                setForm({ name: '', username: '', password: '', password_confirmation: '' });
                setErrors({});
            },
            onError: (err) => {
                setErrors(err);
            }
        });
    };

    return (
        <Main>
            <Head title='Tambah Data Pengguna' />
            <div className="mb-6 overflow-x-hidden">
                <h2 className="text-3xl font-bold text-blue-600">
                    Tambah Data Pengguna
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-2" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <FormField label="Nama" error={errors.name}>
                        <input
                            type="text"
                            placeholder="Masukan Nama....."
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    <FormField label="Username" error={errors.username}>
                        <input
                            type="text"
                            placeholder="Masukan Username....."
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    <FormField label="Password" error={errors.password}>
                        <input
                            type="password"
                            placeholder="Masukan Password....."
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    <FormField label="Konfirmasi Password" error={errors.password_confirmation}>
                        <input
                            type="password"
                            placeholder="Konfirmasi Password Anda....."
                            name="password_confirmation"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>
                </div>

                <div className="mt-4 flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center sm:flex-col sm:justify-between sm:items-center">
                    <h3 className="text-xl font-bold mt-5 lg:mt-0">
                        List Peraturan
                    </h3>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md items-end py-2 px-3 hover:bg-blue-600 transition duration-200 md:w-auto lg:w-auto sm:w-20 w-20 mb-4"
                        disabled={processing}
                    >
                        {processing ? <Spinner /> : "Simpan"}
                    </button>
                </div>
            </form>

            {/* <h2 className="text-xl font-bold mb-4">List Pengguna</h2> */}
            <div className="border border-blue-200 mt-5 rounded-xl overflow-x-auto shadow-lg">
                <table className="w-full text-base text-slate-600 overflow-hidden">
                    <thead className="text-base text-white bg-blue-600">
                        <tr className="whitespace-nowrap text-center uppercase font-semibold">
                            <th className="py-2 px-4 w-12">No</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Username</th>
                            <th className="py-2 px-4">Roles</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isProcessing ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    <Loading isProcessing={isProcessing} />
                                </td>
                            </tr>
                        ) : listUser.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="select-none text-center py-4 text-red-600 italic">
                                    <p>Data Pengguna Kosong.</p>
                                </td>
                            </tr>
                        ) : (
                            listUser.map((user, index) => ( 
                                <tr key={user.id} className="bg-white border-b whitespace-nowrap text-center hover:bg-slate-300 odd:bg-slate-200">
                                    <td className="py-2 px-4 w-12">{index + 1}.</td>
                                    <td className="py-2 px-4">{user.name}</td>
                                    <td className="py-2 px-4">{user.username}</td>
                                    <td className="py-2 px-4">
                                        {user.roles.length > 0
                                            ? user.roles.map((role) => role.name).join(", ")
                                            : <p className="text-red-300 select-none italic">Data Kosong</p>}
                                    </td>
                                    <td className="px-2 py-3 flex justify-center gap-2">
                                        <Link
                                            href={route('data-pengguna.edit', user.id)}
                                            className="inline-flex items-center text-blue-600 uppercase tracking-widest hover:text-blue-500 active:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            <Edit />
                                        </Link>
                                        <Hapus ids={user.id} routes={"tambah-data-pengguna.hapus"} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Main>
    );
}
