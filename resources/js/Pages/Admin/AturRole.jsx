import Main from "@/Layouts/Main";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import ShowAlert from "@/Components/ShowAlert";
import Hapus from "@/hooks/Hapus";
import FormField from "@/Components/FormField";
import Spinner from "@/Components/Spinner"; // Make sure you import your Spinner component

export default function AturRole({ listRole = [], listUser = [] }) {
    const { post, setData, data, processing, errors } = useForm({
        user_id: "",
        role: "",
    });

    const handleAssignRole = (e) => {
        e.preventDefault();
        post(route("atur-role.simpan"), {
            preserveScroll: true,
            onSuccess: () => {
                ShowAlert({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Role berhasil disimpan",
                    timer: 3500,
                });
            },
            onError: () => {
                ShowAlert({
                    icon: "error",
                    title: "Gagal!",
                    text: "Gagal menyimpan role",
                    timer: 3500,
                });
            },
        });
    };

    return (
        <Main>
            <Head title="Atur Role" />
            <div className="mb-6 overflow-x-hidden">
                <h2 className="text-3xl font-bold text-blue-600">Atur Role</h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-2" />
            </div>

            <form onSubmit={handleAssignRole} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Nama" error={errors.user_id}>
                        <select
                            id="user-select"
                            onChange={(e) => setData("user_id", e.target.value)}
                            value={data.user_id}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        >
                            <option value="">Pilih User</option>
                            {listUser.length > 0 ? (
                                listUser.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">Tidak ada pengguna</option>
                            )}
                        </select>
                    </FormField>

                    <FormField label="Role" error={errors.role}>
                        <select
                            id="role-select"
                            onChange={(e) => setData("role", e.target.value)}
                            value={data.role}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        >
                            <option value="">Pilih Role</option>
                            {listRole.length > 0 ? (
                                listRole.map((role) => (
                                    <option key={role.name} value={role.name}>
                                        {role.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">Tidak ada peran</option>
                            )}
                        </select>
                    </FormField>
                </div>

                <div className="mt-4 flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center">
                    <h3 className="text-xl font-bold mt-5 lg:mt-0">
                        Daftar Role Pengguna
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

        <div className="mt-6">
                {listUser.length > 0 ? (
                        <div className="border border-blue-200 mt-5 rounded-xl overflow-x-auto shadow-lg">
                        <table className="w-full text-base text-slate-600 overflow-hidden">
                                <thead className="text-base text-white bg-blue-600">
                                <tr className="whitespace-nowrap text-center uppercase font-semibold">
                                        <th className="border-b px-4 py-3 w-12">No</th>
                                        <th className="border-b px-4 py-3">Nama</th>
                                        <th className="border-b px-4 py-3">Role</th>
                                        <th className="border-b px-4 py-3">Aksi</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listUser.map((user, index) => (
                                        <tr key={user.id} className="bg-white border-b whitespace-nowrap hover:bg-slate-100 transition duration-200">
                                        <td className="px-4 py-2 text-center w-12">{index + 1}.</td>
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">
                                                {user.roles.length > 0 ? (
                                                        <div className="flex flex-col">
                                                                {user.roles.map((role, roleIndex) => (
                                                                <div key={role.name} className={`flex flex-col py-1 ${roleIndex < user.roles.length - 1 ? 'border-b border-blue-500 py-3 my-1' : ''}`}>
                                                                        <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded">
                                                                                {role.name}
                                                                        </span>
                                                                </div>
                                                                ))}
                                                        </div>
                                                ) : (
                                                        <div className="flex flex-col">
                                                                <span className="inline-block bg-red-500 text-white my-2 px-3 py-1 rounded select-none italic">Tidak Memiliki Role</span>
                                                        </div>
                                                )}
                                        </td>
                                        <td className="px-4 py-2">
                                                {user.roles.length > 0 ? (
                                                user.roles.map((role, roleIndex) => (
                                                        <div key={role.name} className={`flex flex-col py-1 ${roleIndex < user.roles.length - 1 ? 'border-b border-blue-500 py-3 my-4' : ''}`}>
                                                                <Hapus
                                                                        ids={[user.id, role.name]}
                                                                        routes={"atur-role.hapus"}
                                                                />
                                                        </div>
                                                ))
                                                ) : (
                                                        <span className="text-blue-600 text-2xl select-none">-</span>
                                                )}
                                        </td>
                                        </tr>
                                ))}
                                </tbody>
                        </table>
                        </div>
                ) : (
                        <p>Tidak ada pengguna yang memiliki role.</p>
                )}
        </div>
        </Main>
    );
}
