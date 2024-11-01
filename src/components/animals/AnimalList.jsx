import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Button from "../../ui/Button";
import EditAnimalModal from "./EditAnimalModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import PropTypes from "prop-types";

const AnimalList = () => {
  const { isAuthenticated, token, API_BASE_URL } = useAuth();
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        if (!isAuthenticated || !token) {
          console.error("Utilisateur non connecté ou token manquant");
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/animals`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data)) {
          setAnimals(response.data);
        } else {
          console.error("Données inattendues :", response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des animaux", error);
      }
    };

    fetchAnimals();
  }, [isAuthenticated, token, API_BASE_URL]);

  const deleteAnimal = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/animals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnimals(animals.filter((animal) => animal.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'animal", error);
    }
  };

  const handleDeleteClick = (animal) => {
    setAnimalToDelete(animal);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (animalToDelete) {
      deleteAnimal(animalToDelete.id);
      setShowDeleteModal(false);
    }
  };

  const handleEditClick = (animal) => {
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {  
    setIsModalOpen(false);
    setSelectedAnimal(null);
  };

  const handleAnimalUpdated = (updatedAnimal) => {
    setAnimals(
      animals.map((animal) =>
        animal.id === updatedAnimal.id ? updatedAnimal : animal
      )
    );
    handleModalClose();
  };

  if (animals.length === 0) {
    return (
      <div className="min-h-screen bg-base-200 container mt-4">
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Mes animaux</h2>
      <ul className="space-y-4">
        {animals.map((animal) => (
          <li
            key={animal.id}
            className="p-4 rounded-lg shadow-xl flex justify-between items-center bg-base-100 mt-6 mb-6"
          >
            <div>
              <h3 className="text-lg font-bold">{animal.name}</h3>
              <p>Race : {animal.race}</p>
              <p>Âge : {animal.age} ans</p>
            </div>
            <div className="flex space-x-2">
              <Button
                className="btn btn-warning text-lg"
                onClick={() => handleEditClick(animal)}
              >
                Modifier
              </Button>
              <Button
                className="btn btn-error text-lg"
                onClick={() => handleDeleteClick(animal)}
              >
                Supprimer
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedAnimal && (
        <EditAnimalModal
          animal={selectedAnimal}
          onAnimalUpdated={handleAnimalUpdated}
          onClose={handleModalClose}
        />
      )}
      <ConfirmDeleteModal
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        itemName={animalToDelete?.name}
      />
    </div>
  );
};

AnimalList.propTypes = {
  animals: PropTypes.array.isRequired,
  setAnimals: PropTypes.func.isRequired,
};

export default AnimalList;
