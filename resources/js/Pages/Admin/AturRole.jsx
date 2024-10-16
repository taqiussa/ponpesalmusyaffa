import Main from '@/Layouts/Main';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import ShowAlert from "@/Components/ShowAlert";

export default function AturRole({ listRole = [], listUser = [] }) {
    const { post, delete: destroy, setData, data, processing, errors } = useForm({
        user_id: '',
        role: '',
    });

    const handleAssignRole = (e) => {
        e.preventDefault();
        post(route('atur-role.simpan'), {
            preserveScroll: true,
            onSuccess: () => {
                ShowAlert({
                    icon: "success",
                    title: "Berhasil!",
                    text: 'Role berhasil disimpan',
                    timer: 3500
                });
            },
            onError: () => {
                ShowAlert({
                    icon: "error",
                    title: "Gagal!",
                    text: 'Gagal menyimpan role',
                    timer: 3500,
                });
            }
        });
    };

    const handleDeleteRole = (userId, roleName) => {
        destroy(route('atur-role.hapus', { id: [userId, roleName] }), {
            preserveScroll: true,
            onSuccess: () => {
                ShowAlert({
                    icon: "success",
                    title: "Berhasil!",
                    text: 'Role berhasil dihapus',
                    timer: 3500
                });
            },
            onError: () => {
                ShowAlert({
                    icon: "error",
                    title: "Gagal!",
                    text: 'Gagal menghapus role',
                    timer: 3500,
                });
            }
        });
    };

    return (
        <Main>
            <Head title="Atur Role" />
            <div className="mb-6 overflow-x-hidden">
                <h2 className="text-3xl font-bold text-blue-600">Atur Role</h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-2" />
            </div>
            
            <form onSubmit={handleAssignRole} className="space-y-4">
                <div>
                    <label htmlFor="user-select" className="block font-bold">Pilih User</label>
                    <select
                        id="user-select"
                        onChange={(e) => setData('user_id', e.target.value)}
                        value={data.user_id}
                        className="w-full p-2 border rounded"
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
                    {errors.user_id && <span className="text-red-600">{errors.user_id}</span>}
                </div>

                <div>
                    <label htmlFor="role-select" className="block font-bold">Pilih Role</label>
                    <select
                        id="role-select"
                        onChange={(e) => setData('role', e.target.value)}
                        value={data.role}
                        className="w-full p-2 border rounded"
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
                    {errors.role && <span className="text-red-600">{errors.role}</span>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Simpan Role
                </button>
            </form>

            <div className="mt-6">
                <h3 className="text-xl font-bold">Hapus Role</h3>
                {listUser.length > 0 && listRole.length > 0 ? (
                    listUser.map((user) => (
                        <div key={user.id} className="mt-4">
                            <h4 className="font-bold">{user.name}</h4>
                            {listRole.map((role) => (
                                <button
                                    key={role.name}
                                    onClick={() => handleDeleteRole(user.id, role.name)}
                                    className="text-red-600"
                                >
                                    Hapus {role.name}
                                </button>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>Tidak ada pengguna atau peran yang tersedia untuk dihapus</p>
                )}
            </div>
        </Main>
    );
}
