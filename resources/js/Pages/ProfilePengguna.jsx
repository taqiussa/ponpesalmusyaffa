import Main from '@/Layouts/Main';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function ProfilePengguna({ user }) {
    const { data, setData, post, errors, reset } = useForm({
        id: user.id,
        name: user.name,
        password: '',
        password_confirmation: '',
        foto: null,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        setData('foto', e.target.files[0]);
    };

    const handleSubmitName = (e) => {
        e.preventDefault();
        post(route('profil-pengguna.nama'), {
            onSuccess: () => reset('name'),
        });
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        post(route('profil-pengguna.password'), {
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    };

    const handleSubmitFoto = (e) => {
        e.preventDefault();
        post(route('profil-pengguna.foto'), {
            onSuccess: () => reset('foto'),
        });
    };

    return (
        <Main>
            <Head title='Profile Pengguna' />
            <div className="mb-6 overflow-x-hidden">
                <h2 className="text-3xl font-bold text-blue-600">
                    Profile Pengguna
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card for updating name */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Update Name</h3>
                    <form onSubmit={handleSubmitName}>
                        <div className="mb-4">
                            <label className="block text-sm">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full"
                            />
                            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Update Name
                        </button>
                    </form>
                </div>

                {/* Card for updating password */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Update Password</h3>
                    <form onSubmit={handleSubmitPassword}>
                        <div className="mb-4">
                            <label className="block text-sm">New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full"
                            />
                            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm">Confirm Password</label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={handleChange}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Update Password
                        </button>
                    </form>
                </div>

                {/* Card for updating photo */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Update Photo</h3>
                    <form onSubmit={handleSubmitFoto} encType="multipart/form-data">
                        <div className="mb-4">
                            <label className="block text-sm">Photo</label>
                            <input
                                type="file"
                                name="foto"
                                onChange={handleFileChange}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full"
                            />
                            {errors.foto && <div className="text-red-600 text-sm mt-1">{errors.foto}</div>}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Update Photo
                        </button>
                    </form>
                </div>
            </div>
        </Main>
    );
}
