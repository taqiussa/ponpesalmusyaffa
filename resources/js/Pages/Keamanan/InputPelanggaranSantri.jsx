import React, { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import ShowAlert from "@/Components/ShowAlert";
import Tahun from "@/Components/Tahun";
import JenisKelamin from "@/Components/JenisKelamin";
import Spinner from "@/Components/Spinner";
import dayjs from "dayjs";
import { useFilter } from "@/hooks/useFilter";
import Hapus from "@/hooks/Hapus";
import DataTable from "@/Components/DataTable";
import { formatTanggalLahir } from "@/hooks/formatTanggalLahir";
import InputField from "@/Components/InputField";
import SelectSantri from "@/Components/SelectSantri";
import SelectPelanggaran from "@/Components/SelectPelanggaran";

function InputPelanggaranSantri({
    initTahun,
    listSantri,
    listPeraturan,
    listPelanggaran,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tahun: initTahun,
        jenis_kelamin: "",
        tanggal: dayjs().format("YYYY-MM-DD"),
        jumlah: 1,
        pelanggaran_id: null,
        nis: null,
    });

    const [filteredSantri, setFilteredSantri] = useState([]);

    useEffect(() => {
        let filtered = listSantri.filter(
            (santri) => santri.tahun === data.tahun
        );
        if (data.jenis_kelamin) {
            filtered = filtered.filter(
                (santri) => santri.jenis_kelamin === data.jenis_kelamin
            );
        }
        setFilteredSantri(filtered);
    }, [data.tahun, data.jenis_kelamin, listSantri]);

    const { isProcessing } = useFilter({
        route: route("input-pelanggaran-santri"),
        values: data,
        depend: [data.tanggal],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("input-pelanggaran-santri.simpan"), {
            onSuccess: () => {
                ShowAlert({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data pelanggaran santri berhasil disimpan.",
                    timer: 3500,
                });
                reset();
            },
            onError: () => {
                ShowAlert({
                    icon: "error",
                    title: "Gagal!",
                    text: "Data pelanggaran santri gagal disimpan.",
                    timer: 3500,
                });
            },
        });
    };

    const columns = [
        { label: "No", field: "no" },
        { label: "NIS", field: "nis" },
        { label: "Nama Santri", field: "santriName" },
        { label: "Tanggal", field: "tanggal" },
        { label: "Pelanggaran", field: "pelanggaranName" },
        { label: "Kategori", field: "kategori" },
        { label: "Hukuman", field: "hukuman" },
        { label: "Jumlah", field: "jumlah" },
        { label: "Nama Pengurus", field: "pengurusName" },
        {
            label: "Aksi",
            field: "action",
            render: (item) => (
                <Hapus
                    ids={item.id}
                    routes={"input-pelanggaran-santri.hapus"}
                />
            ),
        },
    ];

    const tableData = listPelanggaran.map((list, index) => ({
        no: index + 1,
        nis: list?.nis,
        santriName: list?.santri?.name,
        tanggal: formatTanggalLahir(list?.tanggal),
        pelanggaranName: list?.pelanggaran?.nama,
        kategori: list?.pelanggaran?.kategori,
        hukuman: list?.pelanggaran?.hukuman,
        jumlah: list?.jumlah,
        pengurusName: list?.pengurus?.name,
        id: list.id,
    }));

    return (
        <>
            <Head title="Input Pelanggaran Santri" />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <Tahun
                        name="tahun"
                        id="tahun"
                        value={data.tahun}
                        handleChange={(e) => setData("tahun", e.target.value)}
                        message={errors.tahun}
                    />
                    <JenisKelamin
                        name="jenis_kelamin"
                        id="jenis_kelamin"
                        value={data.jenis_kelamin}
                        handleChange={(e) =>
                            setData("jenis_kelamin", e.target.value)
                        }
                        message={errors.jenis_kelamin}
                    />
                    <SelectSantri
                        options={filteredSantri}
                        value={data.nis}
                        onChange={(value) => setData("nis", value)}
                        error={errors.nis}
                    />
                    <SelectPelanggaran
                        options={listPeraturan}
                        value={data.pelanggaran_id}
                        onChange={(value) => setData("pelanggaran_id", value)}
                        error={errors.pelanggaran_id}
                    />
                    <InputField
                        label="Tanggal Melanggar"
                        type="date"
                        name="tanggal"
                        value={data.tanggal}
                        onChange={(e) => setData("tanggal", e.target.value)}
                        error={errors.tanggal}
                    />
                    <InputField
                        label="Jumlah Melanggar"
                        type="number"
                        name="jumlah"
                        value={data.jumlah}
                        onChange={(e) => setData("jumlah", e.target.value)}
                        placeholder="Masukkan jumlah"
                        error={errors.jumlah}
                    />
                </div>

                <div className="md:px-5 flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center">
                    <h3 className="text-xl font-bold text-[#0B6477]">
                        Santri Yang Melanggar Hari Ini
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
                data={tableData}
                loading={isProcessing}
                emptyMessage="Tidak ada santri yang melanggar hari ini."
            />
        </>
    );
}

InputPelanggaranSantri.layout = (page) => (
    <Layout children={page} title="Input Pelanggaran Santri" />
);

export default InputPelanggaranSantri;
