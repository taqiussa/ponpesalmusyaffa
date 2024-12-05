import { Head, useForm } from "@inertiajs/react";
import React from "react";
import ShowAlert from "@/Components/ShowAlert";
import Hapus from "@/hooks/Hapus";
import Spinner from "@/Components/Spinner";
import Layout from "@/Layouts/Layout";
import SelectField from "@/Components/SelectField";

function AturRole({ listRole = [], listUser = [] }) {
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
        <>
            <Head title="Atur Role" />
            <form onSubmit={handleAssignRole}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <SelectField
                        label="Nama"
                        name="user_id"
                        value={data.user_id}
                        onChange={(e) => setData("user_id", e.target.value)}
                        options={listUser.map((user) => ({ value: user.id, label: user.name }))}
                        error={errors.user_id}
                        placeholder="Pilih User"
                    />
                    <SelectField
                        label="Role"
                        name="role"
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        options={listRole.map((role) => ({ value: role.name, label: role.name }))}
                        error={errors.role}
                        placeholder="Pilih Role"
                    />
                </div>
                
                <div className="md:px-5 flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center">
                    <h3 className="text-xl font-bold text-[#0B6477]">
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
                    <thead className="text-xs text-white uppercase bg-[#0B6477]">
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
                                <td className="px-2 py-2 text-center">{index + 1}</td>
                                <td className="px-2 py-2 text-center">{user.name}</td>
                                <td colSpan={2} className="px-2 py-2">
                                    {user.roles.length > 0 ? (
                                        <div className="space-y-2">
                                            {user.roles.map((role, roleIndex) => (
                                                <div
                                                    key={role.name}
                                                    className={`grid grid-cols-2 ${roleIndex === 0 ? '' : 'border-t border-gray-300'} pt-2`}
                                                >
                                                    <div className="inline-block text-center bg-[#0B6477] text-white px-3 py-2 rounded">
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
        </>
    );
}

AturRole.layout = (page) => <Layout children={page} title="Atur Role" />;

export default AturRole;
