import { useForm } from '@inertiajs/react'
import React from 'react'

export default function DataSantri({ initTahun, listSantri }) {
        const {data, setData, post, errors, processing} = useForm({
                tahun: initTahun,
                jenis_kelamin: ''
        });

        // data table santri
        // yang perlu tampil di table adalah:
        // nomor : index looping,
        // nis,
        // nama,
        // Tempat tanggal lahir / TTL :nama kolom (tempat_lahir, tanggal_lahir),
        // nik,
        // ayah (nama_ayah)
        // ibu (nama_ibu)
        // alamat (rt, rw, desa, kecamatan, kabupaten, provinsi)
        // kontak (telepon)
        return (
                <div>DataSantri</div>
        )
}
