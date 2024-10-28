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
                <h2 className="text-3xl font-bold text-blue-400">Atur Role</h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent mt-2" />
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
                    <h3 className="text-xl font-bold mt-5 lg:mt-0 text-blue-400">
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

            <div className="mt-5 rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-gray-600 table-auto">
                    <thead className="text-xs text-white uppercase bg-gradient-to-r from-blue-400 to-blue-500">
                        <tr>
                            <th className="border-b px-4 py-3 w-12">No</th>
                            <th className="border-b px-4 py-3 text-center">Nama</th>
                            <th className="border-b px-4 py-3 text-center">Role</th>
                            <th className="border-b px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {listUser.map((user, index) => (
                            <tr key={user.id} className="bg-white hover:bg-gray-100">
                                <td className="px-2 py-2 text-center">{index + 1}.</td>
                                <td className="px-2 py-2 text-center">{user.name}</td>
                                <td colSpan={2} className="px-2 py-2">
                                    {user.roles.length > 0 ? (
                                        <div className="space-y-2">
                                            {user.roles.map((role, roleIndex) => (
                                                <div
                                                    key={role.name}
                                                    className={`grid grid-cols-2 ${roleIndex === 0 ? '' : 'border-t border-gray-300'} pt-2`}
                                                >
                                                    <div className="inline-block text-center bg-blue-500 text-white px-3 py-2 rounded">
                                                        {role.name}
                                                    </div>
                                                    <div className="text-center">
                                                        <Hapus ids={[user.id, role.name]} routes={"atur-role.hapus"} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2">
                                            <div className="inline-block text-center bg-red-500 text-white px-3 py-2 rounded italic">
                                                Tidak Memiliki Role
                                            </div>
                                            <div className="text-center">
                                                <span className="text-blue-600 text-2xl select-none">-</span>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </Main>
    );
}
