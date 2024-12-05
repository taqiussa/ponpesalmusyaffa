import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import ShowAlert from "@/Components/ShowAlert";
import JenisKelamin from "@/Components/JenisKelamin";
import InputField from "@/Components/InputField";
import SelectField from "@/Components/SelectField";
import Spinner from "@/Components/Spinner";
import { useFilter } from "@/hooks/useFilter";

function TambahDataAlumni({ listProvinsi }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        nama: "",
        jenis_kelamin: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        nama_ayah: "",
        nama_ibu: "",
        rt: "",
        rw: "",
        desa: "",
        kecamatan: "",
        kabupaten: "",
        provinsi: "",
        telepon: "",
        status_nikah: "",
        status_pekerjaan: "",
        tahun_masuk: "",
        tingkat_terakhir: "",
    });

    const { isProcessing } = useFilter({
        route: "tambah-data-alumni",
        values: data,
    });

    const [kabupaten, setKabupaten] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [desa, setDesa] = useState([]);

    const handleFetch = async (url, setState) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error("Failed to fetch data", response.status, response.statusText);
                setState([]);
                return;
            }
            const result = await response.json();

            if (result && result.listKabupaten && Array.isArray(result.listKabupaten)) {
                const mappedData = result.listKabupaten.map(item => ({
                    value: item.code,
                    label: item.name,
                }));
                setState(mappedData);
            } else if (result && result.listKecamatan && Array.isArray(result.listKecamatan)) {
                const mappedData = result.listKecamatan.map(item => ({
                    value: item.code,
                    label: item.name,
                }));
                setState(mappedData);
            } else if (result && result.listDesa && Array.isArray(result.listDesa)) {
                const mappedData = result.listDesa.map(item => ({
                    value: item.code,
                    label: item.name,
                }));
                setState(mappedData);
            } else {
                setState([]);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setState([]);
        }
    };

    const handleProvinsiChange = (provinsiCode) => {
        setData({ ...data, provinsi: provinsiCode, kabupaten: "", kecamatan: "", desa: "" });
        setKabupaten([]);
        setKecamatan([]);
        setDesa([]);
        if (provinsiCode) {
            handleFetch(route("get-kabupaten") + `?provinceCode=${provinsiCode}`, setKabupaten);
        }
    };

    const handleKabupatenChange = (kabupatenCode) => {
        setData({ ...data, kabupaten: kabupatenCode, kecamatan: "", desa: "" });
        setKecamatan([]);
        setDesa([]);
        if (kabupatenCode) {
            handleFetch(route("get-kecamatan") + `?cityCode=${kabupatenCode}`, setKecamatan);
        }
    };

    const handleKecamatanChange = (kecamatanCode) => {
        setData({ ...data, kecamatan: kecamatanCode, desa: "" });
        setDesa([]);
        if (kecamatanCode) {
            handleFetch(route("get-desa") + `?districtCode=${kecamatanCode}`, setDesa);
        }
    };

    const handleDesaChange = (desaCode) => {
        setData({ ...data, desa: desaCode });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tambah-data-alumni.simpan"), {
            onSuccess: () => {
                ShowAlert({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data alumni berhasil ditambahkan.",
                    timer: 3500,
                });
                reset();
            },
            onError: () => {
                ShowAlert({
                    icon: "error",
                    title: "Gagal!",
                    text: "Data alumni gagal ditambahkan.",
                    timer: 3500,
                });
            },
        });
    };

    return (
        <>
            <Head title="Tambah Data Alumni" />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <InputField
                        label="Nama Lengkap"
                        name="nama"
                        value={data.nama}
                        placeholder="Masukan Nama Lengkap"
                        onChange={(e) => setData("nama", e.target.value)}
                        error={errors.nama}
                    />
                    <JenisKelamin
                        name="jenis_kelamin"
                        id="jenis_kelamin"
                        value={data.jenis_kelamin}
                        handleChange={(e) => setData("jenis_kelamin", e.target.value)}
                        message={errors.jenis_kelamin}
                    />
                    <InputField
                        label="Tempat Lahir"
                        name="tempat_lahir"
                        value={data.tempat_lahir}
                        placeholder="Masukan Tempat Lahir"
                        onChange={(e) => setData("tempat_lahir", e.target.value)}
                        error={errors.tempat_lahir}
                    />
                    <InputField
                        type="date"
                        label="Tanggal Lahir"
                        name="tanggal_lahir"
                        value={data.tanggal_lahir}
                        placeholder="Masukan Tanggal Lahir"
                        onChange={(e) => setData("tanggal_lahir", e.target.value)}
                        error={errors.tanggal_lahir}
                    />
                    <InputField
                        label="Nama Ayah"
                        name="nama_ayah"
                        value={data.nama_ayah}
                        placeholder="Masukan Nama Ayah"
                        onChange={(e) => setData("nama_ayah", e.target.value)}
                        error={errors.nama_ayah}
                    />
                    <InputField
                        label="Nama Ibu"
                        name="nama_ibu"
                        value={data.nama_ibu}
                        placeholder="Masukan Nama Ibu"
                        onChange={(e) => setData("nama_ibu", e.target.value)}
                        error={errors.nama_ibu}
                    />
                    <SelectField
                        label="Provinsi"
                        name="provinsi"
                        value={data.provinsi}
                        onChange={(e) => handleProvinsiChange(e.target.value)}
                        options={listProvinsi.map((prov) => ({
                            value: prov.code,
                            label: prov.name,
                        }))}
                        error={errors.provinsi}
                    />
                    <SelectField
                        label="Kabupaten"
                        name="kabupaten"
                        value={data.kabupaten}
                        onChange={(e) => handleKabupatenChange(e.target.value)}
                        options={kabupaten}
                        error={errors.kabupaten}
                        disabled={!kabupaten.length}
                    />
                    <SelectField
                        label="Kecamatan"
                        name="kecamatan"
                        value={data.kecamatan}
                        onChange={(e) => handleKecamatanChange(e.target.value)}
                        options={kecamatan}
                        error={errors.kecamatan}
                        disabled={!kecamatan.length}
                    />
                    <SelectField
                        label="Desa"
                        name="desa"
                        value={data.desa}
                        onChange={(e) => handleDesaChange(e.target.value)}
                        options={desa}
                        error={errors.desa}
                        disabled={!desa.length}
                    />
                    <InputField
                        label="RW"
                        name="rw"
                        value={data.rw}
                        placeholder="Masukan RW"
                        onChange={(e) => setData("rw", e.target.value)}
                        error={errors.rw}
                    />
                    <InputField
                        label="RT"
                        name="rt"
                        value={data.rt}
                        placeholder="Masukan RT"
                        onChange={(e) => setData("rt", e.target.value)}
                        error={errors.rt}
                    />
                    <InputField
                        label="Nomor Telepon"
                        name="telepon"
                        type="text"
                        value={data.telepon}
                        placeholder="Masukan Nomor Telepon"
                        onChange={(e) => setData("telepon", e.target.value)}
                        error={errors.telepon}
                    />
                    <SelectField
                        label="Status Pernikahan"
                        name="status_nikah"
                        value={data.status_nikah}
                        onChange={(e) => setData("status_nikah", e.target.value)}
                        options={[
                            { value: "Menikah", label: "Menikah" },
                            { value: "Belum Menikah", label: "Belum Menikah" },
                            { value: "Duda", label: "Duda" },
                            { value: "Janda", label: "Janda" },
                        ]}
                        error={errors.status_nikah}
                    />
                    <SelectField
                        label="Sudah Bekerja?"
                        name="status_pekerjaan"
                        value={data.status_pekerjaan}
                        onChange={(e) => setData("status_pekerjaan", e.target.value)}
                        options={[
                            { value: "Bekerja", label: "Bekerja" },
                            { value: "Tidak Bekerja", label: "Tidak Bekerja" },
                        ]}
                        error={errors.status_pekerjaan}
                    />
                    <InputField
                        label="Tahun Masuk Pondok"
                        name="tahun_masuk"
                        value={data.tahun_masuk}
                        placeholder="Masukan Tahun Masuk Pondok"
                        onChange={(e) => setData("tahun_masuk", e.target.value)}
                        error={errors.tahun_masuk}
                    />
                    <InputField
                        label="Tingkat Terakhir"
                        name="tingkat_terakhir"
                        value={data.tingkat_terakhir}
                        placeholder="Masukan Tingkat Terakhir"
                        onChange={(e) =>
                            setData("tingkat_terakhir", e.target.value)
                        }
                        error={errors.tingkat_terakhir}
                    />
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                        disabled={processing}
                    >
                        {processing ? <Spinner /> : "Simpan Data"}
                    </button>
                </div>
            </form>
        </>
    );
}

export default TambahDataAlumni;
