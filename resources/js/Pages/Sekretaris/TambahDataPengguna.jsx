import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Main from '@/Layouts/Main';
import FormField from '@/Components/FormField';
import Spinner from '@/Components/Spinner';
import Hapus from '@/hooks/Hapus';
import { Edit } from 'react-feather';
import { useFilter } from '@/hooks/useFilter';
import Loading from '@/Components/Loading';
import ShowAlert from '@/Components/ShowAlert';
import DataTable from '@/Components/DataTable'; 
export default function TambahDataPengguna({ listUser }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        password: '',
        password_confirmation: ''
    });

    const { isProcessing } = useFilter({
        route: "tambah-data-pengguna",
        values: data,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tambah-data-pengguna.simpan"), {
            onSuccess: () => {
                ShowAlert({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Pengguna berhasil ditambahkan.",
                    timer: 3500,
                });
                reset();
            },
            onError: () => {
                ShowAlert({
                    icon: "error",
                    title: "Gagal!",
                    text: "Pengguna gagal ditambahkan.",
                    timer: 3500,
                });
            },
        });
    };

    const columns = [
        { label: "No", render: (item, index) => index + 1 },
        { label: "Name", render: (item) => item.name },
        { label: "Username", render: (item) => item.username },
        { 
            label: "Role",
            render: (item) => item.roles.length > 0 ? item.roles.map((role) => role.name).join(", ") : 
            <p className="text-red-300 select-none italic">
                Data Kosong
            </p>
        },
        {
            label: "Aksi",
            render: (item) => (

                <div className="flex justify-center gap-2">
                    <Link href={route("data-pengguna.edit", item.id)} className="inline-flex items-center text-blue-600 uppercase tracking-widest hover:text-blue-500 active:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150" >
                        
                        <Edit />
                    </Link>
                    <Hapus ids={item.id} routes={"data-pengguna.hapus"} />
                </div>
            )
        },
    ];

    return (
        <Main>
            <Head title='Tambah Data Pengguna' />
            <div className="mb-6 overflow-x-hidden">
                <h2 className="text-3xl font-bold text-blue-400">
                    Tambah Data Pengguna
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent mt-2" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <FormField label="Nama" error={errors.name}>
                        <input
                            type="text"
                            placeholder="Masukan Nama....."
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    <FormField label="Username" error={errors.username}>
                        <input
                            type="text"
                            placeholder="Masukan Username....."
                            name="username"
                            value={data.username}
                            onChange={(e) => setData("username", e.target.value)}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    <FormField label="Password" error={errors.password}>
                        <input
                            type="password"
                            placeholder="Masukan Password....."
                            name="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    <FormField label="Konfirmasi Password" error={errors.password_confirmation}>
                        <input
                            type="password"
                            placeholder="Konfirmasi Password Anda....."
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>
                </div>

                <div className="mt-4 flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center sm:flex-col sm:justify-between sm:items-center">
                    <h3 className="text-xl font-bold mt-5 lg:mt-0 text-blue-400">
                        Data Pengguna
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

            
            <DataTable
                columns={columns}
                data={listUser || []}
                loading={isProcessing}
                emptyMessage={"Data Pengguna Kosong."}
            />
        </Main>
    );
}
