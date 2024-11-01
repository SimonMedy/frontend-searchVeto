import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../ui/Button';
import PropTypes from 'prop-types';

const API_BASE_URL = 'http://localhost:5000';

const EditAnimalModal = ({ animal, onAnimalUpdated, onClose }) => {
  const { isAuthenticated, token } = useContext(AuthContext);
  const [name, setName] = useState(animal.name);
  const [race, setRace] = useState(animal.race);
  const [age, setAge] = useState(animal.age);

  useEffect(() => {
    setName(animal.name);
    setRace(animal.race);
    setAge(animal.age);
  }, [animal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !token) {
      console.error('Utilisateur non connecté ou token manquant');
      return;
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/animals/${animal.id}`, 
        { name, race, age },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      onAnimalUpdated(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la modification de l\'animal', error);
    }
  };

  return (
    <dialog id="edit-animal-modal" open className="modal">
      <div className="modal-box w-11/12 max-w-5xl max-h-[90vh] px-6 pb-2 overflow-y-auto">
        <form method="dialog">
          <Button
            type="button"
            className="btn-circle btn-ghost absolute hover:bg-red-500 hover:text-white right-2 top-2"
            onClick={onClose}
          >
            ✕
          </Button>
        </form>
        <h2 className="text-2xl font-bold">Modifier l&apos;animal</h2>
        <form className="py-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label" htmlFor="animal-name">
              <span className="label-text">Nom</span>
            </label>
            <input
              type="text"
              id="animal-name"
              placeholder="Nom de l'animal..."
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-control mt-4">
            <label className="label" htmlFor="animal-race">
              <span className="label-text">Race</span>
            </label>
            <input
              type="text"
              id="animal-race"
              placeholder="Race de l'animal..."
              className="input input-bordered"
              value={race}
              onChange={(e) => setRace(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-control mt-4">
            <label className="label" htmlFor="animal-age">
              <span className="label-text">Âge</span>
            </label>
            <input
              type="number"
              id="animal-age"
              placeholder="Âge de l'animal..."
              className="input input-bordered"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="modal-action mt-6">
            <Button type="submit" className="btn-accent">
              Modifier
            </Button>
            <Button
              type="button"
              className="btn btn-secondary btn-outline"
              onClick={onClose}
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

EditAnimalModal.propTypes = {
  animal: PropTypes.object.isRequired,
  onAnimalUpdated: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditAnimalModal;
