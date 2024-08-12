import Swal from 'sweetalert2'

interface Props {
    handleClick: Function
}

function CancelButton({ handleClick }: Props) {

    function handleCancel() {

        //alert if cancel or to stay.
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I am sure!"
        }).then((result) => {
            if (result.isConfirmed) {
                handleClick();
            }
        });
    }

    return (
        <button type="button" className="w-auto cursor-pointer rounded-lg border border-black bg-black p-4 text-white transition hover:bg-opacity-90"
            onClick={handleCancel}>
            Cancel
        </button>

    );
}

export default CancelButton;