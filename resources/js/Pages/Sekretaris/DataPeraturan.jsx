import React from "react";
import Layout from "@/Layouts/Layout";
import { Head, useForm, router } from "@inertiajs/react";
import ShowAlert from "@/Components/ShowAlert";
import FormField from "@/Components/FormField";
import Spinner from "@/Components/Spinner";
import Hapus from "@/hooks/Hapus";
import { useFilter } from "@/hooks/useFilter";
import DataTable from "@/Components/DataTable";
import TextareaField from "@/Components/TextareaField";
import SelectField from "@/Components/SelectField";

function DataPeraturan({ listPeraturan }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        kategori: "",
        hukuman: "",
    });

    const { isProcessing } = useFilter({
        route: "data-peraturan",
        values: data,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("data-peraturan.simpan"), {
            onSuccess: () => {
                ShowAlert({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Peraturan berhasil ditambahkan.",
                    timer: 3500,
                });
                reset();
            },
            onError: () => {
                ShowAlert({
                    icon: "error",
                    title: "Gagal!",
                    text: "Peraturan gagal ditambahkan.",
                    timer: 3500,
                });
            },
        });
    };

    const columns = [
        { label: "No", render: (item, index) => index + 1 },
        { label: "Keterangan Peraturan", render: (item) => item.nama },
        { label: "Kategori", render: (item) => item.kategori },
        { label: "Keterangan Hukuman", render: (item) => item.hukuman },
        {
            label: "Aksi",
            render: (item) => (
                <Hapus ids={item.id} routes={"data-peraturan.hapus"} />
            ),
        },
    ];

    return (
        <>
            <Head title="Data Peraturan" />
            <form onSubmit={handleSubmit}>
                <SelectField
                    label="Kategori"
                    name="kategori"
                    value={data.kategori}
                    onChange={(e) => setData("kategori", e.target.value)}
                    options={[
                        { value: "Ringan", label: "Ringan" },
                        { value: "Sedang", label: "Sedang" },
                        { value: "Berat", label: "Berat" },
                    ]}
                    error={errors.kategori}
                    placeholder="Pilih Kategori"
                />

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <TextareaField
                        label="Keterangan Peraturan"
                        name="nama"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                        placeholder="Masukan Peraturan....."
                        error={errors.nama}
                        required
                    />
                    <TextareaField
                        label="Keterangan Hukuman"
                        name="hukuman"
                        value={data.hukuman}
                        onChange={(e) => setData("hukuman", e.target.value)}
                        placeholder="Masukan Hukuman....."
                        error={errors.hukuman}
                        required
                    />
                </div>

                <div className="md:px-5 flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center">
                    <h3 className="text-xl font-bold text-[#0B6477]">
                        List Peraturan
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
                data={listPeraturan}
                loading={isProcessing}
                emptyMessage={"Data Peraturan Kosong."}
            />
        </>
    );
}

DataPeraturan.layout = (page) => (
    <Layout children={page} title="Data Peraturan" />
);

export default DataPeraturan;
