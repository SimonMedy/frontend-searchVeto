import { useState } from 'react';
import AddAnimalModal from './AddAnimalModal';
import AnimalList from './AnimalList';
import Button from '../../ui/Button';

const AnimalsPage = () => {
  const [animals, setAnimals] = useState([]);

  const handleAnimalAdded = (newAnimal) => {
    setAnimals((prevAnimals) => [...prevAnimals, newAnimal]);
    window.location.reload();
  };

  const openAddAnimalModal = () => {
    document.getElementById('add-animal-modal')?.showModal();
  };

  return (
    <div className="min-h-screen">
      <div className="p-8">
        <div className="mb-4">
          <Button type="button" className="btn-primary text-lg" onClick={openAddAnimalModal}>
            Ajouter un animal
          </Button>
        </div>
        <AnimalList animals={animals} setAnimals={setAnimals} />
        <AddAnimalModal onAnimalAdded={handleAnimalAdded} />
      </div>
    </div>
  );
};

export default AnimalsPage;
