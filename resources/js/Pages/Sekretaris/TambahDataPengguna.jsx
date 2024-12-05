import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import FormField from "@/Components/FormField";
import Spinner from "@/Components/Spinner";
import Hapus from "@/hooks/Hapus";
import { Edit } from "react-feather";
import { useFilter } from "@/hooks/useFilter";
import ShowAlert from "@/Components/ShowAlert";
import DataTable from "@/Components/DataTable";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputField from "@/Components/InputField";
import PasswordField from "@/Components/PasswordField";

function TambahDataPengguna({ listUser }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        username: "",
        password: "",
        password_confirmation: "",
    });

    const { isProcessing } = useFilter({
        route: "tambah-data-pengguna",
        values: data,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tambah-data-pengguna.simpan"), {
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

    const columns = [
        { label: "No", render: (item, index) => index + 1 },
        { label: "Name", render: (item) => item.name },
        { label: "Username", render: (item) => item.username },
        {
            label: "Role",
            render: (item) =>
                item.roles.length > 0 ? (
                    item.roles.map((role) => role.name).join(", ")
                ) : (
                    <p className="text-red-300 select-none italic">
                        Data Kosong
                    </p>
                ),
        },
        {
            label: "Aksi",
            render: (item) => (
                <div className="flex justify-center gap-2">
                    <Link
                        href={route("data-pengguna.edit", item.id)}
                        className="inline-flex items-center text-blue-600 uppercase tracking-widest hover:text-blue-500 active:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <Edit />
                    </Link>
                    <Hapus ids={item.id} routes={"data-pengguna.hapus"} />
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Tambah Data Pengguna" />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <InputField
                        label="Nama"
                        name="name"
                        placeholder="Masukan Nama....."
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                    />
                    <InputField
                        label="Username"
                        name="username"
                        placeholder="Masukan Username....."
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        error={errors.username}
                    />
                    <PasswordField
                        label="Password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="Masukan Password....."
                        error={errors.password}
                    />
                    <PasswordField
                        label="Konfirmasi Password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        placeholder="Konfirmasi Password Anda....."
                        error={errors.password_confirmation}
                    />
                </div>

                <div className="md:px-5 flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center">
                    <h3 className="text-xl font-bold text-[#0B6477]">
                        Data Pengguna
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

            <DataTable
                columns={columns}
                data={listUser || []}
                loading={isProcessing}
                emptyMessage={"Data Pengguna Kosong."}
            />
        </>
    );
}

TambahDataPengguna.layout = (page) => (
    <Layout children={page} title="Tambah Data Pengguna" />
);

export default TambahDataPengguna;
