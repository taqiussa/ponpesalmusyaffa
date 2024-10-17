import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Main from '@/Layouts/Main';
import { Head } from '@inertiajs/react';
import FormField from '@/Components/FormField';

export default function EditDataPengguna({ user }) {
    const [form, setForm] = useState({
        id: user.id,
        name: user.name || '',
        username: user.username || '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('data-pengguna.simpan'), form, {
            onError: (err) => {
                setErrors(err);
            }
        });
    };

    return (
        <Main>
            <Head title='Edit Pengguna' />
            <h1 className="text-xl font-bold mb-4">Edit Data Pengguna</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <FormField label="Nama" error={errors.name}>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    <FormField label="Username" error={errors.username}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </Main>
    );
}
