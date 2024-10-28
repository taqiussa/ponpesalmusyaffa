import React from "react";
import Main from "@/Layouts/Main";
import { Head, useForm, router } from "@inertiajs/react";
import ShowAlert from "@/Components/ShowAlert";
import FormField from "@/Components/FormField";
import Spinner from "@/Components/Spinner";
import Hapus from "@/hooks/Hapus";
import Loading from "@/Components/Loading";
import { useFilter } from "@/hooks/useFilter";
import DataTable from "@/Components/DataTable";

export default function DataPeraturan({ listPeraturan }) {
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
        { label: "Aksi", render: (item) => ( <Hapus ids={item.id} routes={"data-peraturan.hapus"} /> ) },
    ];

    return (
        <Main>
            <Head title="Data Peraturan" />
            <div className="mb-6 overflow-x-hidden">
                <h2 className="text-3xl font-bold text-blue-400">
                    Data Peraturan
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent mt-2" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField label="Kategori" error={errors.kategori}>
                    <select
                        id="kategori"
                        value={data.kategori}
                        onChange={(e) => setData("kategori", e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md md:w-1/2 lg:w-1/2 sm:w-full w-full shadow-blue-300 focus:ring"
                    >
                        <option value="">Pilih Kategori</option>
                        <option value="ringan">Ringan</option>
                        <option value="sedang">Sedang</option>
                        <option value="berat">Berat</option>
                    </select>
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <FormField label="Keterangan Peraturan" error={errors.nama}>
                        <textarea
                            id="nama"
                            value={data.nama}
                            autoComplete="off"
                            placeholder="Masukan Peraturan....."
                            onChange={(e) => setData("nama", e.target.value)}
                            required
                            className="border-gray-300 h-24 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>

                    <FormField
                        label="Keterangan Hukuman"
                        error={errors.hukuman}
                    >
                        <textarea
                            id="hukuman"
                            value={data.hukuman}
                            autoComplete="off"
                            placeholder="Masukan Hukuman....."
                            onChange={(e) => setData("hukuman", e.target.value)}
                            required
                            className="border-gray-300 h-24 focus:border-blue-500 focus:ring-blue-300 rounded-md shadow-md w-full shadow-blue-300 focus:ring"
                        />
                    </FormField>
                </div>

                <div className="mt-4 flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center sm:flex-col sm:justify-between sm:items-center">
                    <h3 className="text-xl font-bold mt-5 lg:mt-0 text-blue-400">
                        List Peraturan
                    </h3>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md items-end py-2 px-3 hover:bg-blue-600 transition duration-200 md:w-auto lg:w-auto sm:w-20 w-20 mb-4"
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
        </Main>
    );
}
