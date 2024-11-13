import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import FormField from '@/Components/FormField';
import ShowAlert from '@/Components/ShowAlert';
import axios from 'axios';

function TambahDataAlumni() {
    const { data, setData, post, processing, reset, errors } = useForm({
        nama: '', jenis_kelamin: '', tempat_lahir: '', tanggal_lahir: '',
        nama_ayah: '', nama_ibu: '', rt: '', rw: '', desa: '', kecamatan: '',
        kabupaten: '', provinsi: '', telepon: '', status_nikah: '',
        status_pekerjaan: '', tahun_masuk: '', tingkat_terakhir: ''
    });

    // const [provinces, setProvinces] = useState([]);
    // const [cities, setCities] = useState([]);
    // const [districts, setDistricts] = useState([]);
    // const [villages, setVillages] = useState([]);

    // useEffect(() => {
    //     axios.get('/api/provinces').then(response => {
    //         setProvinces(response.data);
    //     });
    // }, []);

    // const handleProvinceChange = (e) => {
    //     setData('provinsi', e.target.value);
    //     setData('kabupaten', '');
    //     setData('kecamatan', '');
    //     setData('desa', '');
    //     setCities([]);
    //     setDistricts([]);
    //     setVillages([]);

    //     axios.get(`/provinces/${e.target.value}/cities`).then(response => {
    //         setCities(response.data);
    //     });
    // };

    // const handleCityChange = (e) => {
    //     setData('kabupaten', e.target.value);
    //     setData('kecamatan', '');
    //     setData('desa', '');
    //     setDistricts([]);
    //     setVillages([]);

    //     axios.get(`/cities/${e.target.value}/districts`).then(response => {
    //         setDistricts(response.data);
    //     });
    // };

    // const handleDistrictChange = (e) => {
    //     setData('kecamatan', e.target.value);
    //     setData('desa', '');
    //     setVillages([]);

    //     axios.get(`/districts/${e.target.value}/villages`).then(response => {
    //         setVillages(response.data);
    //     });
    // };

    // const handleVillageChange = (e) => {
    //     setData('desa', e.target.value);
    // };

const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    useEffect(() => {
        // Fetch Provinces when component mounts
        fetch('/api/provinces')
            .then(response => response.json())
            .then(data => setProvinces(data));
    }, []);

    useEffect(() => {
        // Fetch Cities based on selected Province
        if (data.provinsi) {
            fetch(`/api/cities/${data.provinsi}`)
                .then(response => response.json())
                .then(data => setCities(data));
        } else {
            setCities([]);
            setDistricts([]);
            setVillages([]);
        }
    }, [data.provinsi]);

    useEffect(() => {
        // Fetch Districts based on selected City
        if (data.kabupaten) {
            fetch(`/api/districts/${data.kabupaten}`)
                .then(response => response.json())
                .then(data => setDistricts(data));
        } else {
            setDistricts([]);
            setVillages([]);
        }
    }, [data.kabupaten]);

    useEffect(() => {
        // Fetch Villages based on selected District
        if (data.kecamatan) {
            fetch(`/api/villages/${data.kecamatan}`)
                .then(response => response.json())
                .then(data => setVillages(data));
        } else {
            setVillages([]);
        }
    }, [data.kecamatan]);

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
                                {/* <select
                                    id="provinsi"
                                    name="provinsi"
                                    value={data.provinsi}
                                    onChange={handleProvinceChange}
                                    className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                                >
                                    <option value="">Pilih Provinsi</option>
                                    {provinces.map(province => (
                                        <option key={province.id} value={province.code}>{province.name}</option>
                                    ))}
                                </select>
                                <select
                                    id="kabupaten"
                                    name="kabupaten"
                                    value={data.kabupaten}
                                    onChange={handleCityChange}
                                    className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                                    disabled={!data.provinsi}
                                >
                                    <option value="">Pilih Kabupaten</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.code}>{city.name}</option>
                                    ))}
                                </select>
                                <select
                                    id="kecamatan"
                                    name="kecamatan"
                                    value={data.kecamatan}
                                    onChange={handleDistrictChange}
                                    className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                                    disabled={!data.kabupaten}
                                >
                                    <option value="">Pilih Kecamatan</option>
                                    {districts.map(district => (
                                        <option key={district.id} value={district.code}>{district.name}</option>
                                    ))}
                                </select>
                                <select
                                    id="desa"
                                    name="desa"
                                    value={data.desa}
                                    onChange={handleVillageChange}
                                    className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                                    disabled={!data.kecamatan}
                                >
                                    <option value="">Pilih Desa</option>
                                    {villages.map(village => (
                                        <option key={village.id} value={village.code}>{village.name}</option>
                                    ))}
                                </select> */}
                                
                                <select
                                    value={data.provinsi}
                                    onChange={(e) => setData('provinsi', e.target.value)}
                                >
                                    <option value="">Pilih Provinsi</option>
                                    {provinces.map((province) => (
                                        <option key={province.code} value={province.code}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={data.kabupaten}
                                    onChange={(e) => setData('kabupaten', e.target.value)}
                                    disabled={!data.provinsi}
                                >
                                    <option value="">Pilih Kabupaten</option>
                                    {cities.map((city) => (
                                        <option key={city.code} value={city.code}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={data.kecamatan}
                                    onChange={(e) => setData('kecamatan', e.target.value)}
                                    disabled={!data.kabupaten}
                                >
                                    <option value="">Pilih Kecamatan</option>
                                    {districts.map((district) => (
                                        <option key={district.code} value={district.code}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={data.desa}
                                    onChange={(e) => setData('desa', e.target.value)}
                                    disabled={!data.kecamatan}
                                >
                                    <option value="">Pilih Desa</option>
                                    {villages.map((village) => (
                                        <option key={village.code} value={village.code}>
                                            {village.name}
                                        </option>
                                    ))}
                                </select>
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
