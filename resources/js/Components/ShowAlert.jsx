import Swal from 'sweetalert2';

const ShowAlert = ({ icon, title, text, timer = null }) => {
    Swal.fire({
        icon,
        title,
        text,
        showConfirmButton: !timer,
        timer,
        customClass: {
            popup: 'bg-white shadow-lg rounded-lg p-6',
            title: 'text-xl font-semibold',
            htmlContainer: 'text-lg',
        },
    });
};

export default ShowAlert;
