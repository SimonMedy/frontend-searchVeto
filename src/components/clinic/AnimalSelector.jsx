import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const AnimalSelector = ({ selectedAnimal, onAnimalSelect }) => {
  const { isAuthenticated, token } = useAuth();
  const [animals, setAnimals] = useState([]);

  const API_BASE_URL = "http://localhost:5000";

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
  }, [isAuthenticated, token]);

  const selectedAnimalName = animals.find(
    (animal) => animal.id === parseInt(selectedAnimal, 10)
  )?.name;

  return (
    <div className="dropdown dropdown-hover">
      <h2 className="text-xl font-semibold mt-4 mb-2">
        Sélectionnez votre Animal
      </h2>
      <label
        tabIndex={0}
        className="btn btn-secondary flex justify-between items-center w-full md:w-64"
      >
        {selectedAnimalName || "Vos animaux"}
        <ChevronDownIcon className="w-5 h-5 ml-2" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full md:w-64 p-2 shadow max-h-60 overflow-y-auto"
      >
        {animals.map((animal) => (
          <li
            key={animal.id}
            className="hover:bg-secondary-focus"
            onClick={() => onAnimalSelect(animal.id.toString())}
          >
            <a className="flex justify-between">
              <span className="text-base-content">{animal.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

AnimalSelector.propTypes = {
  selectedAnimal: PropTypes.string.isRequired,
  onAnimalSelect: PropTypes.func.isRequired,
};

export default AnimalSelector;
