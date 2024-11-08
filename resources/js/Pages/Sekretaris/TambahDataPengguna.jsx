import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import FormField from '@/Components/FormField';
import Spinner from '@/Components/Spinner';
import Hapus from '@/hooks/Hapus';
import { Edit } from 'react-feather';
import { useFilter } from '@/hooks/useFilter';
import ShowAlert from '@/Components/ShowAlert';
import DataTable from '@/Components/DataTable';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function TambahDataPengguna({ listUser }) {
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

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

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
        <>
            <Head title='Tambah Data Pengguna' />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <FormField label="Nama" error={errors.name}>
                        <input
                            type="text"
                            placeholder="Masukan Nama....."
                            name="name"
                            value={data.name}
                            autoComplete='off'
                            onChange={(e) => setData("name", e.target.value)}
                            className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                        />
                    </FormField>

                    <FormField label="Username" error={errors.username}>
                        <input
                            type="text"
                            placeholder="Masukan Username....."
                            name="username"
                            value={data.username}
                            autoComplete='off'
                            onChange={(e) => setData("username", e.target.value)}
                            className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                        />
                    </FormField>

                    <FormField label="Password" error={errors.password}>
                        <div className="flex items-center border-gray-300 focus:border-[#0B6477] focus:ring-[#0B6477] rounded-md shadow-md shadow-[#0B6477] focus:ring">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Masukan Password....."
                                name="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="border-none rounded-tl-md rounded-bl-md focus:border-[#0B6477] focus:ring-[#0B6477] shadow-[#0B6477] focus:ring pl-2 w-full"
                            />
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                size="medium"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </div>
                    </FormField>

                    <FormField label="Konfirmasi Password" error={errors.password_confirmation}>
                        <div className="flex items-center border-gray-300 focus:border-[#0B6477] focus:ring-[#0B6477] rounded-md shadow-md shadow-[#0B6477] focus:ring">
                            <input
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                placeholder="Konfirmasi Password Anda....."
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                className="border-none rounded-tl-md rounded-bl-md focus:border-[#0B6477] focus:ring-[#0B6477] shadow-[#0B6477] focus:ring pl-2 w-full" // Removed border for seamless design
                            />
                            <IconButton
                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                size="medium"
                            >
                                {showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </div>
                    </FormField>
                </div>
                
                <div className="md:px-5 flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center">
                    <h3 className="text-xl font-bold text-[#0B6477]">
                        Data Pengguna
                    </h3>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md py-2 px-3 hover:bg-blue-600 transition duration-200"
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
        </>
    );
}

TambahDataPengguna.layout = (page) => <Layout children={page} title="Tambah Data Pengguna" />;

export default TambahDataPengguna;