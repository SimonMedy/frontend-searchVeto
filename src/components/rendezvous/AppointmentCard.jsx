import PropTypes from "prop-types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { useState } from "react";
import Button from "../../ui/Button";

const AppointmentCard = ({ appointment, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(appointment.id);
  };

  return (
    <li className="flex-none w-96 h-56 p-4 shadow card bg-base-100 shadow-xl overflow-hidden text-lg">
      <h2 className="text-xl font-bold truncate mt-2">
        {appointment.clinic?.name || "Nom de la clinique non disponible"}
      </h2>
      <p className="truncate mt-1">
        <span className="font-semibold">Animal : </span>
        {appointment.animal?.name || "Nom de l'animal non disponible"}
      </p>
      <p className="truncate mt-1">
        <span className="font-semibold">Date : </span>
        {format(new Date(appointment.date), "dd/MM/yy", { locale: fr })}
      </p>
      <p className="truncate mt-1">
        <span className="font-semibold">Heure : </span>
        {appointment.timeSlot?.timeRange || "Horaire non disponible"}
      </p>
      <div className="card-actions mt-4justify-end">
      <Button
        type="button"
        className="btn-secondary absolute bottom-2 btn-md right-2"
        onClick={handleDelete}
      >
        <span className="text-lg">Supprimer</span>
      </Button>
      <ConfirmDeleteModal
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      /></div>
    </li>
  );
};

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    clinic: PropTypes.shape({
      name: PropTypes.string,
    }),
    animal: PropTypes.shape({
      name: PropTypes.string,
    }),
    date: PropTypes.string.isRequired,
    timeSlot: PropTypes.shape({
      timeRange: PropTypes.string,
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AppointmentCard;
