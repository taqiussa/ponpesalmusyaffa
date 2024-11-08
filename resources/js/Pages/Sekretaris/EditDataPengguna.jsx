import React from 'react';
import Layout from '@/Layouts/Layout';
import Main from '@/Layouts/Main';
import { Head, useForm } from '@inertiajs/react';
import FormField from '@/Components/FormField';
import Spinner from '@/Components/Spinner';
import ShowAlert from "@/Components/ShowAlert";

function EditDataPengguna({ user }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        id: user.id,
        name: user.name,
        username: user.username,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("data-pengguna.simpan"), {
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

    return (
        <>
            <Head title='Edit Pengguna' />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <FormField label="Nama" error={errors.name}>
                        <input
                            type="text"
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
                            name="username"
                            value={data.username}
                            autoComplete='off'
                            onChange={(e) => setData("username", e.target.value)}
                            className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                        />
                    </FormField>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    disabled={processing}
                >
                    {processing ? <Spinner /> : "Simpan"}
                </button>
            </form>
        </>
    );
}

EditDataPengguna.layout = (page) => <Layout children={page} title="Edit Data Pengguna" />;

export default EditDataPengguna;
