import React from "react";
import Layout from "@/Layouts/Layout";
import { Head, useForm, router } from "@inertiajs/react";
import ShowAlert from "@/Components/ShowAlert";
import FormField from "@/Components/FormField";
import Spinner from "@/Components/Spinner";
import Hapus from "@/hooks/Hapus";
import Loading from "@/Components/Loading";
import { useFilter } from "@/hooks/useFilter";
import DataTable from "@/Components/DataTable";

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
        { label: "Aksi", render: (item) => ( <Hapus ids={item.id} routes={"data-peraturan.hapus"} /> ) },
    ];

    return (
        <>
            <Head title="Data Peraturan" />
            <form onSubmit={handleSubmit}>
                <FormField label="Kategori" error={errors.kategori}>
                    <select
                        id="kategori"
                        value={data.kategori}
                        onChange={(e) => setData("kategori", e.target.value)}
                        className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md md:w-1/2 lg:w-1/2 sm:w-full w-full shadow-[#14919B] focus:ring"
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
                            className="border-gray-300 h-24 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
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
                            className="border-gray-300 h-24 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                        />
                    </FormField>
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

DataPeraturan.layout = (page) => <Layout children={page} title="Data Peraturan" />;

export default DataPeraturan;
