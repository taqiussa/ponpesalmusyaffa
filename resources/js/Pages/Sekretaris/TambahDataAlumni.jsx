import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import FormField from '@/Components/FormField';

function TambahDataAlumni() {
    const { data, setData, errors } = useForm({
        name: '',
        jenis_kelamin: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        ayah: '',
        ibu: '',
        desa: '',
        rt: '',
        rw: '',
        kecamatan: '',
        kabupaten: '',
        provinsi: '',
        telephon: '',
        status: '',
        nama_pasangan: '',
        sudah_bekerja: '',
        tahun_masuk_pondok: '',
        tingkat_terakhir: '',
    });

    return (
        <>
            <Head title='Data Alumni' />
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-4">
                    <div>
                        <FormField label="Nama Lengkap" error={errors.name}>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
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
                                    name="desa"
                                    placeholder="Desa"
                                    value={data.desa}
                                    onChange={(e) => setData('desa', e.target.value)}
                                    className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                                />
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
                                <input
                                    type="text"
                                    name="kecamatan"
                                    placeholder="Kecamatan"
                                    value={data.kecamatan}
                                    onChange={(e) => setData('kecamatan', e.target.value)}
                                    className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                                />
                                <input
                                    type="text"
                                    name="kabupaten"
                                    placeholder="Kabupaten"
                                    value={data.kabupaten}
                                    onChange={(e) => setData('kabupaten', e.target.value)}
                                    className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                                />
                                <input
                                    type="text"
                                    name="provinsi"
                                    placeholder="Provinsi"
                                    value={data.provinsi}
                                    onChange={(e) => setData('provinsi', e.target.value)}
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

                    {(data.status === 'Menikah') && (
                        <div>
                            <FormField label="Nama Istri/Suami" error={errors.nama_pasangan}>
                                <input
                                    type="text"
                                    id="nama_pasangan"
                                    name="nama_pasangan"
                                    value={data.nama_pasangan}
                                    onChange={(e) => setData('nama_pasangan', e.target.value)}
                                    placeholder="Masukkan Nama Istri/Suami"
                                    className="border-gray-300 focus:border-[#0B6477] focus:ring-[#14919B] rounded-md shadow-md w-full shadow-[#14919B] focus:ring"
                                />
                            </FormField>
                        </div>
                    )}

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

                    {(data.status !== 'Menikah') ? (
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
                    ) : null}
                </div>
                
                {(data.status === 'Menikah') && (
                    <div className="grid grid-cols-1 mb-4">
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
                )}
            </form>
        </>
    );
}

TambahDataAlumni.layout = (page) => <Layout children={page} title="Data Alumni" />;

export default TambahDataAlumni;
