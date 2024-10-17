import React from "react";
import Main from "@/Layouts/Main";
import { Head, useForm, router } from "@inertiajs/react";
import ShowAlert from "@/Components/ShowAlert";
import FormField from "@/Components/FormField";
import Spinner from "@/Components/Spinner";
import Hapus from "@/hooks/Hapus";

export default function DataPeraturan({ listPeraturan }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        kategori: "",
        hukuman: "",
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

    return (
        <Main>
            <Head title="Data Peraturan" />
            <div className="mb-6 overflow-x-hidden">
                <h2 className="text-3xl font-bold text-blue-600">
                    Tambah Peraturan
                </h2>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-2" />
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
                    <h3 className="text-xl font-bold mt-5 lg:mt-0">
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

            <div className="border border-blue-200 mt-5 rounded-xl overflow-x-auto shadow-lg">
                <table className="w-full text-base text-slate-600 overflow-hidden">
                    <thead className="text-base text-white bg-blue-600">
                        <tr className="whitespace-nowrap text-center uppercase font-semibold">
                            <th className="py-2 px-4">No</th>
                            <th className="py-2 px-4">Keterangan Peraturan</th>
                            <th className="py-2 px-4">Kategori</th>
                            <th className="py-2 px-4">Keterangan Hukuman</th>
                            <th className="py-2 px-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPeraturan.length > 0 ? (
                            listPeraturan.map((peraturan, index) => (
                                <tr
                                    key={peraturan.id}
                                    className="bg-white border-b text-center whitespace-nowrap hover:bg-slate-100 transition duration-200"
                                >
                                    <td className="py-2 px-4">
                                        {index + 1}.
                                    </td>
                                    <td className="py-2 px-4">
                                        {peraturan.nama}
                                    </td>
                                    <td className="py-2 px-4">
                                        {peraturan.kategori}
                                    </td>
                                    <td className="py-2 px-4">
                                        {peraturan.hukuman}
                                    </td>
                                    <td className="py-2 px-4">
                                        <Hapus
                                            ids={peraturan.id}
                                            routes={"data-peraturan.hapus"}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-4 text-gray-500 select-none italic"
                                >
                                    Tidak ada data peraturan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Main>
    );
}
