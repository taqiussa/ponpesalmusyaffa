import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import FormField from '@/Components/FormField';
import ShowAlert from '@/Components/ShowAlert';
import axios from 'axios';
import getKabupaten from '@/Functions/getKabupaten';
import getKecamatan from '@/Functions/getKecamatan';
import getDesa from '@/Functions/getDesa';

function TambahDataAlumni({ listProvinsi }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        nama: '',
        jenis_kelamin: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        nama_ayah: '',
        nama_ibu: '',
        rt: '',
        rw: '',
        desa: '',
        kecamatan: '',
        kabupaten: '',
        provinsi: '',
        telepon: '',
        status_nikah: '',
        status_pekerjaan: '',
        tahun_masuk: '',
        tingkat_terakhir: ''
    });


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

    const handleChange = (e) => {
        setData(e.target.name, e.target.type == 'file' ? e.target.files[0] : e.target.value)
    }

    const [listKabupaten, setListKabupaten] = useState([])
    const [listKecamatan, setListKecamatan] = useState([])
    const [listDesa, setListDesa] = useState([])

    async function getDataKabupaten() {
        const res = await getKabupaten(data.provinsi)
        setListKabupaten(res.listKabupaten)
    }

    async function getDataKecamatan() {
        const res = await getKecamatan(data.kabupaten)
        setListKecamatan(res.listKecamatan)
    }

    async function getDataDesa() {
        const res = await getDesa(data.kecamatan)
        setListDesa(res.listDesa)
    }

    useEffect(() => {
        if (isEmpty(data.provinsi)) {
            setData({
                ...data,
                kabupaten: '',
                kecamatan: '',
                desa: ''
            })
            setListKabupaten([])
        } else {
            trackPromise(getDataKabupaten())
        }
    }, [data.provinsi])

    useEffect(() => {
        if (isEmpty(data.kabupaten)) {
            setData({
                ...data,
                kecamatan: '',
                desa: ''
            })
            setListKecamatan([])
        } else {
            trackPromise(getDataKecamatan())
        }
    }, [data.kabupaten])

    useEffect(() => {
        if (isEmpty(data.kecamatan)) {
            setData({
                ...data,
                desa: ''
            })
            setListDesa([])
        } else {
            trackPromise(getDataDesa())
        }
    }, [data.kecamatan])

    return (
        <>
            <Head title='Data Alumni' />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <div>
                        <FormField label="Nama Lengkap" error={errors.nama}>
                            <input
                                type="text"
                                id="nama"
                                name="nama"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                placeholder="Masukkan Nama Lengkap"
                                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                            />
                        </FormField>
                    </div>

                    <div>
                        <FormField label="Jenis Kelamin" error={errors.jenis_kelamin}>
                            <select
                                id="jenis_kelamin"
                                name="jenis_kelamin"
                                value={data.jenis_kelamin}
                                onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </FormField>
                    </div>

                    <div>
                        <FormField label="Tempat Lahir" error={errors.tempat_lahir}>
                            <input
                                type="text"
                                id="tempat_lahir"
                                name="tempat_lahir"
                                value={data.tempat_lahir}
                                onChange={(e) => setData('tempat_lahir', e.target.value)}
                                placeholder="Masukkan Tempat Lahir"
                                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                            />
                        </FormField>
                    </div>

                    <div>
                        <FormField label="Tanggal Lahir" error={errors.tanggal_lahir}>
                            <input
                                type="date"
                                id="tanggal_lahir"
                                name="tanggal_lahir"
                                value={data.tanggal_lahir}
                                onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                placeholder="Tanggal Lahir"
                                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                            />
                        </FormField>
                    </div>

                    <div>
                        <FormField label="Nama Ayah" error={errors.ayah}>
                            <input
                                type="text"
                                id="ayah"
                                name="ayah"
                                value={data.ayah}
                                onChange={(e) => setData('ayah', e.target.value)}
                                placeholder="Masukkan Nama Ayah"
                                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                            />
                        </FormField>
                    </div>

                    <div>
                        <FormField label="Nama Ibu" error={errors.ibu}>
                            <input
                                type="text"
                                id="ibu"
                                name="ibu"
                                value={data.ibu}
                                onChange={(e) => setData('ibu', e.target.value)}
                                placeholder="Masukkan Nama Ibu"
                                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                            />
                        </FormField>
                    </div>

                    <div>
                        <FormField label="Alamat Tinggal Sekarang" error={errors.desa}>
                            <div className="grid grid-cols-3 gap-2">
                                <input
                                    type="text"
                                    name="rt"
                                    placeholder="RT"
                                    value={data.rt}
                                    onChange={(e) => setData('rt', e.target.value)}
                                    className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                                />
                                <input
                                    type="text"
                                    name="rw"
                                    placeholder="RW"
                                    value={data.rw}
                                    onChange={(e) => setData('rw', e.target.value)}
                                    className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                                />
                            </div>
                        </FormField>
                    </div>

                    <div>
                        <FormField label="Nomor HP" error={errors.telephon}>
                            <input
                                type="text"
                                id="telephon"
                                name="telephon"
                                value={data.telephon}
                                onChange={(e) => setData('telephon', e.target.value)}
                                placeholder="Masukkan Nomor HP"
                                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                            />
                        </FormField>
                    </div>

                    <div>
                        <FormField label="Status" error={errors.status}>
                            <select
                                id="status"
                                name="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                            >
                                <option value="">Pilih Status</option>
                                <option value="Menikah">Menikah</option>
                                <option value="Belum Menikah">Belum Menikah</option>
                                <option value="Duda">Duda</option>
                                <option value="Janda">Janda</option>
                            </select>
                        </FormField>
                    </div>

                    <div>
                        <FormField label="Sudah Bekerja?" error={errors.sudah_bekerja}>
                            <select
                                id="sudah_bekerja"
                                name="sudah_bekerja"
                                value={data.sudah_bekerja}
                                onChange={(e) => setData('sudah_bekerja', e.target.value)}
                                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                            >
                                <option value="">Pilih</option>
                                <option value="Ya">Ya</option>
                                <option value="Tidak">Tidak</option>
                            </select>
                        </FormField>
                    </div>

                    <div>
                        <FormField label="Tahun Masuk Pondok" error={errors.tahun_masuk_pondok}>
                            <input
                                type="text"
                                id="tahun_masuk_pondok"
                                name="tahun_masuk_pondok"
                                value={data.tahun_masuk_pondok}
                                onChange={(e) => setData('tahun_masuk_pondok', e.target.value)}
                                placeholder="Masukkan Tahun Masuk Pondok"
                                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                            />
                        </FormField>
                    </div>

                    <div>
                        <FormField label="Tingkat Terakhir" error={errors.tingkat_terakhir}>
                            <input
                                type="text"
                                id="tingkat_terakhir"
                                name="tingkat_terakhir"
                                value={data.tingkat_terakhir}
                                onChange={(e) => setData('tingkat_terakhir', e.target.value)}
                                placeholder="Masukkan Tingkat Terakhir"
                                className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                            />
                        </FormField>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    disabled={processing}
                >
                    {processing ? "Memproses..." : "Simpan"}
                </button>
            </form>
        </>
    );
}

TambahDataAlumni.layout = (page) => <Layout children={page} title="Data Alumni" />;

export default TambahDataAlumni;
