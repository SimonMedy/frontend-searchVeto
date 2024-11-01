import { useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../ui/Button";

const LogoutModal = ({ setShowLogoutModal }) => {
  const { logout } = useContext(AuthContext);
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
      setShowLogoutModal(false);
    }
  };

  return (
    <dialog ref={modalRef} id="logout-modal" className="modal">
      <div className="modal-box max-w-sm px-6 pb-2">
        <form method="dialog">
          <Button
            type="button"
            className="btn-circle btn-ghost absolute hover:bg-red-500 text-base-content hover:text-white right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </Button>
        </form>
        <h2 className="text-2xl font-bold text-base-content mb-1">Déconnexion</h2>
        <p className="text-base-content">Voulez-vous vraiment vous déconnecter ?</p>
        <div className="modal-action mt-6 mb-2">
          <Button
            type="button"
            className="btn-accent"
            onClick={handleLogout}
          >
            Confirmer
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

LogoutModal.propTypes = {
  setShowLogoutModal: PropTypes.func.isRequired,
};

export default LogoutModal;
