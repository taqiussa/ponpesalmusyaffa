import { useForm } from '@inertiajs/react';
import { Trash2 } from 'react-feather';
import Swal from 'sweetalert2';

export default function Hapus({ id, customRoute, routes, method }) {
    const { delete: destroy, processing } = useForm({});

    const confirmDelete = () => {
        Swal.fire({
            title: 'Peringatan',
            text: 'Anda yakin ingin menghapus data ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545', // Red color for confirm button
            cancelButtonColor: '#6c757d',  // Gray color for cancel button
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                acceptDelete(); // Call the delete function if confirmed
            }
        });
    };

    const acceptDelete = () => {
        destroy(route(routes, { id, customRoute }), {
            onSuccess: () => {
                method && method();
                Swal.fire('Dihapus!', 'Data telah berhasil dihapus.', 'success'); // Show success message
            },
            onError: () => {
                Swal.fire('Gagal!', 'Data gagal dihapus.', 'error'); // Show error message
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
