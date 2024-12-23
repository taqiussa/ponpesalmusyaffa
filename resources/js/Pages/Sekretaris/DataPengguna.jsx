import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Plus, Edit } from "react-feather";
import Hapus from "@/hooks/Hapus";
import { useFilter } from "@/hooks/useFilter";
import DataTable from "@/Components/DataTable";
import Layout from "@/Layouts/Layout";

function DataPengguna({ listUser }) {
    const { data } = useForm();

    const { isProcessing } = useFilter({
        route: "data-pengguna",
        values: data,
    });

    const columns = [
        { label: "No", render: (item, index) => index + 1 },
        { label: "Name", render: (item) => item.name },
        { label: "Username", render: (item) => item.username },
        { label: "Role", render: (item) => item.roles.length > 0 ? item.roles.map((role) => role.name).join(", ") : <p className="text-red-300 select-none italic">Data Kosong</p> },
        { label: "Aksi",
            render: (item) => (
                <div className="flex justify-center gap-2">
                    <Link href={route("data-pengguna.edit", item.id)} className="inline-flex items-center text-blue-600 uppercase tracking-widest hover:text-blue-500 active:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150" >
                        
                        <Edit />
                    </Link>
                    <Hapus ids={item.id} routes={"data-pengguna.hapus"} />
                </div>
            )
        },
    ];

    return (
        <>
            <Head title="Data Pengguna" />
            <div className="flex justify-between items-center mb-6">
                <Link
                    href={route("tambah-data-pengguna")}
                    className="bg-[#45DFB1] px-4 py-2 rounded-full flex items-center transition duration-150 shadow"
                >
                    <Plus className="w-5 h-5 mr-1" />
                    Tambah Pengguna
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={listUser || []}
                loading={isProcessing}
                emptyMessage={"Data Pengguna Kosong."}
            />
        </>
    );
}

DataPengguna.layout = (page) => <Layout children={page} title="Data Pengguna" />;

export default DataPengguna;