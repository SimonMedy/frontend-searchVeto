import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnimalSelector from "./AnimalSelector";
import AppointmentScheduler from "./AppointmentScheduler";
import TimeslotManager from "./TimeSlotManager";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const ClinicDetail = () => {
  const { id } = useParams();
  const clinicId = parseInt(id, 10);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [clinic, setClinic] = useState(null);
  const { isAdmin, token, API_BASE_URL } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/clinics/${clinicId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const clinicData = response.data;
        setClinic(clinicData);
        if (!clinicData.available) {
          navigate("/clinics");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la clinique:",
          error
        );
      }
    };

    fetchClinic();
  }, [clinicId, token, navigate, API_BASE_URL]);

  return (
    <div className="min-h-screen container mx-auto mt-4 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Détails de la Clinique
      </h1>
      {clinic ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-base-100 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-1">{clinic.name}</h2>
            <p className="mb-2 text-xl ">{clinic.address}</p>
            <AnimalSelector
              selectedAnimal={selectedAnimal}
              onAnimalSelect={setSelectedAnimal}
            />
            {selectedAnimal && (
              <div className="mt-4">
                <AppointmentScheduler
                  clinicId={clinicId}
                  animalId={parseInt(selectedAnimal, 10)}
                />
              </div>
            )}
          </div>
          {isAdmin && (
            <div className="bg-base-100 shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">
                Gestion des Plages Horaires
              </h3>
              <TimeslotManager clinicId={clinicId} />
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-red-500">
          Cette clinique n&apos;existe pas...
        </p>
      )}
    </div>
  );
};

export default ClinicDetail;
