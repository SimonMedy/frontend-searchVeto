import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../ui/Button";

const ConfirmDeleteModal = ({ show, onConfirm, onCancel, itemName }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (show && modalRef.current) {
      modalRef.current.showModal();
    } else if (modalRef.current) {
      modalRef.current.close();
    }
  }, [show]);

  const handleConfirm = () => {
    onConfirm();
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    onCancel();
  };

  return (
    <dialog ref={modalRef} id="delete-modal" className="modal">
      <div className="modal-box max-w-lg px-6 pb-2">
        <form method="dialog">
          <Button
            type="button"
            className="btn-circle btn-ghost absolute hover:bg-red-500 text-base-content hover:text-white right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </Button>
        </form>
        <h2 className="text-2xl font-bold text-base-content mb-1">
          Confirmation
        </h2>
        <p className="text-base-content">
          Voulez-vous vraiment supprimer{" "}
          {itemName ? ` "${itemName}"` : "cet élément"} ?
        </p>
        <div className="modal-action mt-6 mb-2">
          <Button type="button" className="btn-primary" onClick={handleConfirm}>
            Supprimer
          </Button>
          <Button
            type="button"
            className="btn btn-secondary btn-outline"
            onClick={handleClose}
          >
            Annuler
          </Button>
        </div>
      </div>
    </dialog>
  );
};

ConfirmDeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  itemName: PropTypes.string,
};

export default ConfirmDeleteModal;
