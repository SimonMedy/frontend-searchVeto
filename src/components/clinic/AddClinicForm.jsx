import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000";

const AddClinicForm = () => {
  const { isAuthenticated, token, isAdmin } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const checkForDuplicateClinic = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clinics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const existingClinics = response.data;

      const duplicate = existingClinics.some(
        (clinic) =>
          (clinic.name.toLowerCase() === name.toLowerCase() &&
            clinic.address.toLowerCase() === address.toLowerCase()) ||
          clinic.name.toLowerCase() === name.toLowerCase() ||
          clinic.address.toLowerCase() === address.toLowerCase()
      );

      return duplicate;
    } catch (error) {
      console.error("Erreur lors de la vérification des doublons", error);
      setErrorMessage("Erreur lors de la vérification des doublons");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !token) {
      setErrorMessage("Utilisateur non connecté ou token manquant");
      return;
    }
    if (!isAdmin) {
      setErrorMessage("L'utilisateur n'est pas un administrateur");
      return;
    }

    const isDuplicate = await checkForDuplicateClinic();
    if (isDuplicate) {
      setErrorMessage(
        "Une clinique avec le même nom ou la même adresse existe déjà."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/clinics`,
        { name, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setName("");
      setAddress("");
      setSuccessMessage("Clinique créée avec succès!");
      setTimeout(() => {
        navigate("/clinics");
      }, 2000);
    } catch (error) {
      setErrorMessage("Erreur lors de l'ajout de la clinique");
      console.error("Erreur lors de l'ajout de la clinique", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-base-100 rounded-xl shadow-md space-y-4 mt-8">
      <h2 className="text-2xl font-bold">Ajouter une clinique</h2>
      {errorMessage && (
        <div role="alert" className="alert alert-error">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input input-bordered w-full mt-1 "
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Adresse :</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="input input-bordered w-full mt-1"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddClinicForm;
