import React from "react";
import JenisKelamin from "@/Components/JenisKelamin";
import Tahun from "@/Components/Tahun";
import { Head, useForm } from "@inertiajs/react";
import { useFilter } from "@/hooks/useFilter";
import Pagination from "@/Components/Pagination";
import DataTable from "@/Components/DataTable";
import { formatTanggalLahir } from "@/hooks/formatTanggalLahir";
import Layout from "@/Layouts/Layout";
import InputField from "@/Components/InputField";

function DataSantri({ initTahun, listSantri }) {
    const { data, setData, errors } = useForm({
        tahun: initTahun,
        jenis_kelamin: "",
        search: "",
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const { isProcessing } = useFilter({ route: "data-santri", values: data });

    const columns = [
        {
            label: "No",
            field: "no",
            render: (item, index) =>
                index +
                1 +
                (listSantri.current_page - 1) * listSantri.per_page +
                ".",
        },
        {
            label: "NIS",
            field: "nis",
            render: (item) =>
                item.santri.nis || (
                    <span className="text-red-300 italic">Data Kosong</span>
                ),
        },
        {
            label: "Nama",
            field: "name",
            render: (item) =>
                item.santri.name || (
                    <span className="text-red-300 italic">Data Kosong</span>
                ),
        },
        {
            label: "TTL",
            field: "ttl",
            render: (item) =>
                `${item.biodata.tempat_lahir}, ${
                    item.biodata.tanggal_lahir
                        ? formatTanggalLahir(item.biodata.tanggal_lahir)
                        : ""
                }`,
        },
        {
            label: "NIK",
            field: "nik",
            render: (item) =>
                item.biodata.nik || (
                    <span className="text-red-300 italic">Data Kosong</span>
                ),
        },
        {
            label: "Ayah",
            field: "ayah",
            render: (item) =>
                item.biodata.ayah || (
                    <span className="text-red-300 italic">Data Kosong</span>
                ),
        },
        {
            label: "Ibu",
            field: "ibu",
            render: (item) =>
                item.biodata.ibu || (
                    <span className="text-red-300 italic">Data Kosong</span>
                ),
        },
        {
            label: "Desa",
            field: "desa",
            render: (item) => {
                const rtRw =
                    item.biodata?.rt && item.biodata?.rw
                        ? `RT ${item.biodata.rt} / RW ${item.biodata.rw}`
                        : "";
                const location = [
                    rtRw,
                    item.biodata?.desa,
                    item.biodata?.kecamatan,
                    item.biodata?.kabupaten,
                    item.biodata?.provinsi,
                ]
                    .filter(Boolean)
                    .join(", ");
                return (
                    location || <span className="text-red-300 italic">-</span>
                );
            },
        },
        {
            label: "Telepon",
            field: "telepon",
            render: (item) =>
                item.biodata.telepon || (
                    <span className="text-red-300 italic">Data Kosong</span>
                ),
        },
    ];

    return (
        <>
            <Head title="Data Santri" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                <Tahun
                    id="tahun"
                    name="tahun"
                    value={data.tahun}
                    message={errors.tahun}
                    handleChange={onHandleChange}
                />
                <JenisKelamin
                    name="jenis_kelamin"
                    id="jenis_kelamin"
                    value={data.jenis_kelamin}
                    handleChange={onHandleChange}
                />
            </div>

            <InputField
                label="Cari Santri"
                type="search"
                name="search"
                value={data.search}
                placeholder="Cari Nama Santri . . ."
                onChange={(e) => setData("search", e.target.value)}
                error={errors.search}
            />

            <DataTable
                columns={columns}
                data={listSantri.data}
                loading={isProcessing}
                emptyMessage={
                    data.search
                        ? "Data Santri Tidak Ditemukan."
                        : "Data Santri Kosong."
                }
            />

            {listSantri.links.length > 0 && (
                <div className="flex justify-center">
                    <Pagination links={listSantri.links} />
                </div>
            )}
        </>
    );
}

DataSantri.layout = (page) => <Layout children={page} title="Data Santri" />;

export default DataSantri;
