import { useForm } from '@inertiajs/react';
import { Trash2 } from 'react-feather';
import ShowAlert from '@/Components/ShowAlert';
import Swal from 'sweetalert2';

export default function Hapus({ ids, customRoute, routes, method }) {
    const { delete: destroy, processing } = useForm({});

    const confirmDelete = () => {
        Swal.fire({
            title: 'Peringatan',
            text: 'Anda yakin ingin menghapus data ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                acceptDelete();
            }
        });
    };

    const acceptDelete = () => {
        // Check if ids is an array or a single value
        const idToDelete = Array.isArray(ids) ? ids : [ids];

        destroy(route(routes, { id: idToDelete }), {
            onSuccess: () => {
                if (method) method();
                ShowAlert({
                    icon: 'success',
                    title: 'Dihapus!',
                    text: 'Data telah berhasil dihapus.',
                    timer: 3500,
                });
            },
            onError: () => {
                ShowAlert({
                    icon: 'error',
                    title: 'Gagal!',
                    text: 'Data gagal dihapus.',
                    timer: 3500,
                });
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <button
            type="button"
            onClick={confirmDelete}
            className={`inline-flex items-center text-red-600 uppercase tracking-widest hover:text-red-500 active:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${processing && 'opacity-25'}`}
            disabled={processing}
        >
            <Trash2 />
        </button>
    );
}
