import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Main from "@/Layouts/Main";
import { Plus, Edit } from "react-feather";
import Hapus from "@/hooks/Hapus";
import Loading from "@/Components/Loading";
import { useFilter } from "@/hooks/useFilter";

export default function DataPengguna({ listUser }) {
    const { data } = useForm();

    const { isProcessing } = useFilter({
        route: "data-pengguna",
        values: data,
    });

    return (
        <Main>
            <Head title="Data Pengguna" />
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-blue-600">
                        Data Pengguna
                    </h2>
                    <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-1" />
                </div>
                <Link
                    href={route("tambah-data-pengguna")}
                    className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-green-600 transition duration-150 shadow"
                >
                    <Plus className="w-5 h-5 mr-1" />
                    Tambah Pengguna
                </Link>
            </div>

            <div className="border border-blue-200 mt-5 rounded-xl overflow-x-auto shadow-lg">
                <table className="w-full text-base text-slate-600 overflow-hidden">
                    <thead className="text-base text-white bg-blue-600">
                        <tr className="whitespace-nowrap text-center uppercase font-semibold">
                            <th className="px-2 py-4 w-12">No</th>
                            <th className="px-2 py-4">Name</th>
                            <th className="px-2 py-4">Username</th>
                            <th className="px-2 py-4">Role</th>
                            <th className="px-2 py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isProcessing ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4">
                                    <Loading isProcessing={isProcessing} />
                                </td>
                            </tr>
                        ) : listUser.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="select-none text-center py-4 text-red-600 italic">
                                        <p>Data Pengguna Kosong.</p>
                                    </td>
                                </tr>
                            ) : (
                                listUser.map((user, index) => ( 
                                   <tr key={user.id} className="bg-white border-b whitespace-nowrap text-center hover:bg-slate-300 odd:bg-slate-200">
                                            <td className="py-2 px-4 w-12">{index + 1}.</td>
                                        <td className="px-2 py-3">{user.name}</td>
                                        <td className="px-2 py-3">
                                                {user.username}
                                        </td>
                                        <td className="px-2 py-3">
                                                {user.roles.length > 0
                                                ? user.roles
                                                        .map((role) => role.name)
                                                        .join(", ")
                                                : <p className="text-red-300 select-none italic">Data Kosong</p>}
                                        </td>
                                        <td className="px-2 py-3 flex justify-center gap-2">
                                                <Link
                                                href={route(
                                                        "data-pengguna.edit",
                                                        user.id
                                                )}
                                                className="inline-flex items-center text-blue-600 uppercase tracking-widest hover:text-blue-500 active:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                >
                                                <Edit />
                                                </Link>
                                                <Hapus
                                                ids={user.id}
                                                routes={"data-pengguna.hapus"}
                                                />
                                        </td>
                                    </tr>
                                )
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </Main>
    );
}
