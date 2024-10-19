import Main from '@/Layouts/Main';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import ShowAlert from '@/Components/ShowAlert';
import FormField from '@/Components/FormField';

export default function ProfilePengguna({ user }) {
    const defaultPhoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ891HLuugNKthcStMIQ3VD_phd6XrcYAhkjA&s';
    const currentPhotoUrl = user.foto ? `/storage/${user.foto}` : defaultPhoto;

    const { data, setData, post, errors, reset } = useForm({
        id: user.id,
        name: user.name,
        password: '',
        password_confirmation: '',
        foto: null,
    });

    const [newPhotoPreview, setNewPhotoPreview] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('foto', file);

        if (file) {
            setNewPhotoPreview(URL.createObjectURL(file));
        } else {
            setNewPhotoPreview(null);
        }
    };

    const handleSubmitName = (e) => {
        e.preventDefault();
        post(route('profil-pengguna.nama'), {
            onSuccess: () => {
                ShowAlert({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Nama berhasil diperbarui.",
                    timer: 3500,
                });
                reset('name');
            },
            onError: () => {
                ShowAlert({
                    icon: "error",
                    title: "Gagal!",
                    text: "Nama gagal diperbarui.",
                    timer: 3500,
                });
            },
        });
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        post(route('profil-pengguna.password'), {
            onSuccess: () => {
                ShowAlert({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Password berhasil diperbarui.",
                    timer: 3500,
                });
                reset('password', 'password_confirmation');
            },
            onError: () => {
                ShowAlert({
                    icon: "error",
                    title: "Gagal!",
                    text: "Password gagal diperbarui.",
                    timer: 3500,
                });
            },
        });
    };

    const handleSubmitFoto = (e) => {
        e.preventDefault();
        post(route('profil-pengguna.foto'), {
            onSuccess: () => {
                ShowAlert({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Foto berhasil diperbarui.",
                    timer: 3500,
                });
                reset('foto');
                setNewPhotoPreview(null);
            },
            onError: () => {
                ShowAlert({
                    icon: "error",
                    title: "Gagal!",
                    text: "Foto gagal diperbarui.",
                    timer: 3500,
                });
            },
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-blue-500 shadow-md rounded-lg p-6 flex flex-col justify-star">
                    <h3 className="text-lg font-semibold mb-4">Update Nama</h3>
                    <form onSubmit={handleSubmitName} className="flex flex-col h-full">
                        <FormField label="Nama" error={errors.name}>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                            />
                        </FormField>
                        
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-3 py-1 ml-auto rounded hover:bg-blue-600 transition duration-200 mt-auto self-start"
                        >
                            Update Nama
                        </button>
                    </form>
                </div>

                <div className="bg-white shadow-blue-500 shadow-md rounded-lg p-6 flex flex-col justify-between h-full">
                    <h3 className="text-lg font-semibold mb-4">Update Password</h3>
                    <form onSubmit={handleSubmitPassword} className="flex flex-col">
                        <FormField label="Password" error={errors.password}>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    placeholder='Masukan Password Baru Anda...'
                                    onChange={(e) => setData("password", e.target.value)}
                                    className="border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                                />
                                <div
                                    className="absolute right-3 top-3 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </div>
                            </div>
                        </FormField>
                        <FormField label="Konfirmasi Password" error={errors.password_confirmation}>
                            <div className="relative">
                                <input
                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    placeholder='Konfirmasi Password Anda...'
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                    className="border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                                />
                                <div
                                    className="absolute right-3 top-3 cursor-pointer"
                                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                >
                                    {showPasswordConfirmation ? <Eye size={20} /> : <EyeOff size={20} />}
                                </div>
                            </div>
                        </FormField>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-3 py-1 ml-auto rounded hover:bg-blue-600 transition duration-200 mt-2 self-start"
                        >
                            Update Password
                        </button>
                    </form>
                </div>

                <div className="bg-white shadow-blue-500 shadow-md rounded-lg p-6 flex flex-col justify-between h-full">
                    <h3 className="text-lg font-semibold mb-4">Update Foto</h3>
                    <form onSubmit={handleSubmitFoto} encType="multipart/form-data" className="flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <div className={`flex flex-col ${newPhotoPreview ? "items-center" : ""}`}>
                                <label className="block text-sm">Foto Saat Ini</label>
                                <img
                                    src={currentPhotoUrl}
                                    alt="Current Profile"
                                    className="w-auto max-h-28 rounded-md object-cover my-1"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                {newPhotoPreview && (
                                    <>
                                        <label className="block text-sm">Foto Baru</label>
                                        <img
                                            src={newPhotoPreview}
                                            alt="Foto"
                                            className="w-auto max-h-28 rounded-md object-cover my-1"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <FormField label="Ganti Foto" error={errors.foto}>
                                <input
                                    type="file"
                                    name="foto"
                                    onChange={handleFileChange}
                                    className="border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                                />
                            </FormField>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-3 py-1 ml-auto rounded hover:bg-blue-600 transition duration-200 mt-2 self-start"
                        >
                            Update Foto
                        </button>
                    </form>
                </div>

            </div>
        </Main>
    );
}
