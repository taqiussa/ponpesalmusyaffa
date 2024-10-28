import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Main from '@/Layouts/Main';
import { Head, useForm } from '@inertiajs/react';
import FormField from '@/Components/FormField';
import Spinner from '@/Components/Spinner';
import ShowAlert from "@/Components/ShowAlert";

export default function EditDataPengguna({ user }) {
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
        <Main>
            <Head title='Edit Pengguna' />
            <div className="mb-6 overflow-x-hidden">
                <h2 className="text-3xl font-bold text-blue-400">
                    Edit Data Pengguna
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent mt-2" />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <FormField label="Nama" error={errors.name}>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            autoComplete='off'
                            onChange={(e) => setData("name", e.target.value)}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    <FormField label="Username" error={errors.username}>
                        <input
                            type="text"
                            name="username"
                            value={data.username}
                            autoComplete='off'
                            onChange={(e) => setData("username", e.target.value)}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        disabled={processing}
                    >
                        {processing ? <Spinner /> : "Simpan"}
                    </button>
                </div>
            </form>
        </Main>
    );
}
