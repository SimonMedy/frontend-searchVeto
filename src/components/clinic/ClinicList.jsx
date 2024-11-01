import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import Button from "../../ui/Button";

const ClinicList = () => {
  const { isAuthenticated, token, isAdmin, API_BASE_URL } = useAuth();
  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clinicToDelete, setClinicToDelete] = useState(null);

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 8000);
      return () => clearTimeout(timer);
    }

    const fetchClinics = async () => {
      try {
        if (!isAuthenticated || !token) {
          console.error("Utilisateur non connecté ou token manquant");
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/clinics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data)) {
          setClinics(response.data);
        } else {
          console.error("Données inattendues :", response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des cliniques", error);
      }
    };

    fetchClinics();
  }, [isAuthenticated, token, location.state, API_BASE_URL]);

  const toggleAvailability = async (id, currentAvailability) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/clinics/${id}`,
        { available: !currentAvailability },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClinics(
        clinics.map((clinic) =>
          clinic.id === id
            ? { ...clinic, available: response.data.available }
            : clinic
        )
      );
    } catch (error) {
      console.error("Erreur lors du changement de disponibilité", error);
    }
  };

  const deleteClinic = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/clinics/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClinics(clinics.filter((clinic) => clinic.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la clinique", error);
    }
  };

  const handleDeleteClick = (clinic) => {
    setClinicToDelete(clinic);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (clinicToDelete) {
      deleteClinic(clinicToDelete.id);
      setShowDeleteModal(false);
    }
  };

  const filteredClinics = clinics.filter(
    (clinic) =>
      (clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filter === "all" ||
        (filter === "available" && clinic.available) ||
        (filter === "unavailable" && !clinic.available))
  );

  if (clinics.length === 0) {
    return (
      <div id="clinic-top" className="min-h-screen bg-base-200 container p-8">
        {successMessage && (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}
        <div className="flex justify-between mb-4 items-center">
          {isAdmin && (
            <Link to="/clinics/create" className="btn btn-primary text-lg mr-4">
              Créer une nouvelle clinique
            </Link>
          )}
        </div>
        <div role="alert" className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="text-lg">
            Vous n&apos;avez pas encore ajouté d&apos;animaux.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen">
      {successMessage && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}
      <div className="flex justify-between mb-4 items-center">
        {isAdmin && (
          <Link to="/clinics/create" className="btn btn-primary text-lg mr-4">
            Créer une nouvelle clinique
          </Link>
        )}
        <div className="flex-grow flex justify-center">
          <div className="join">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered join-item pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="select select-bordered join-item"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="available">Disponible</option>
              <option value="unavailable">Non disponible</option>
            </select>
            <button className="btn join-item btn-secondary text-lg">
              Rechercher
            </button>
          </div>
        </div>
      </div>
      <ul className="space-y-4">
        {filteredClinics.map((clinic) => (
          <li
            key={clinic.id}
            className="p-4 rounded-lg shadow-xl flex justify-between items-center bg-base-100 mt-6 mb-6"
          >
            {clinic.available ? (
              <Link to={`/clinics/${clinic.id}`}>
                <div>
                  <h3 className="text-lg font-bold">{clinic.name}</h3>
                  <p>{clinic.address}</p>
                  <span
                    className={
                      clinic.available ? "text-green-500" : "text-red-500"
                    }
                  >
                    {clinic.available ? "Disponible" : "Non disponible"}
                  </span>
                </div>
              </Link>
            ) : (
              <div>
                <h3 className="text-lg font-bold">{clinic.name}</h3>
                <p>{clinic.address}</p>
                <span
                  className={
                    clinic.available ? "text-green-500" : "text-red-500"
                  }
                >
                  {clinic.available ? "Disponible" : "Non disponible"}
                </span>
              </div>
            )}
            <div className="flex space-x-2">
              {isAdmin && (
                <>
                  <Button
                    className="btn btn-warning text-lg"
                    onClick={() =>
                      toggleAvailability(clinic.id, clinic.available)
                    }
                  >
                    {clinic.available
                      ? "Rendre indisponible"
                      : "Rendre disponible"}
                  </Button>
                  <Button
                    className="btn text-lg btn-error"
                    onClick={() => handleDeleteClick(clinic)}
                  >
                    Supprimer
                  </Button>
                </>
              )}
              {clinic.available ? (
                <Link
                  to={`/clinics/${clinic.id}`}
                  className="btn btn-primary text-lg"
                >
                  Prendre rendez-vous
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      <ConfirmDeleteModal
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        itemName={clinicToDelete?.name}
      />
    </div>
  );
};

export default ClinicList;
