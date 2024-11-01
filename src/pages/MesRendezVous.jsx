import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import AppointmentCard from "../components/rendezvous/AppointmentCard";
import { parse } from "date-fns";

const MesRendezVous = () => {
  const { isAuthenticated, token, API_BASE_URL } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!isAuthenticated || !token) {
          setError("Vous devez être connecté pour voir vos rendez-vous.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError(
          "Session expirée. Veuillez vous connecter de nouveau pour voir vos rendez-vous."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [isAuthenticated, token, API_BASE_URL]);

  if (loading) {
    return <p>Chargement des rendez-vous...</p>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 container mx-auto mt-8 p-4">
        <div role="alert" className="alert alert-error">
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
          <span className="text-lg text-red-500">{error}</span>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="min-h-screen bg-base-200 container mx-auto mt-8 p-4">
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
            Vous n&apos;avez aucun rendez-vous prévu pour le moment.
          </span>
        </div>
      </div>
    );
  }

  const currentDateTime = new Date();

  const upcomingAppointments = appointments.filter((appointment) => {
    const appointmentDateTime = parse(
      `${appointment.date} ${appointment.timeSlot?.timeRange.split("-")[0]}`,
      "yyyy-MM-dd HH:mm",
      new Date()
    );
    return appointmentDateTime >= currentDateTime;
  });

  const expiredAppointments = appointments.filter((appointment) => {
    const appointmentDateTime = parse(
      `${appointment.date} ${appointment.timeSlot?.timeRange.split("-")[0]}`,
      "yyyy-MM-dd HH:mm",
      new Date()
    );
    return appointmentDateTime < currentDateTime;
  });

  const deleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/appointments/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        )
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 container mx-auto mt-8 p-4">
      <div className="flex flex-col items-center md:items-start space-y-8 md:space-y-4 gap-8">
        <h1 className="text-5xl font-bold">Mes Rendez-vous</h1>
        {upcomingAppointments.length > 0 && (
          <div className="flex flex-col items-center md:items-start space-y-4 w-full md:w-auto">
            <div className="w-full md:w-96 flex justify-center md:justify-start">
              <div className="text-3xl font-bold alert alert-success flex items-center space-x-2 justify-center md:justify-start w-96">
                <CheckBadgeIcon className="h-8 w-8 text-base" />
                <span>À venir!</span>
              </div>
            </div>
            <ul className="flex flex-wrap justify-center md:justify-start gap-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onDelete={deleteAppointment}
                />
              ))}
            </ul>
          </div>
        )}
        {expiredAppointments.length > 0 && (
          <div className="w-full md:w-auto mt-8 flex flex-col items-center md:items-start space-y-4">
            <div className="w-full md:w-96 flex justify-center md:justify-start">
              <div className="text-3xl font-bold alert alert-error flex items-center space-x-2 justify-center md:justify-start w-96">
                <XCircleIcon className="h-8 w-8 text-base" />
                <span>Expiré!</span>
              </div>
            </div>
            <ul className="flex flex-wrap justify-center md:justify-start gap-4">
              {expiredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onDelete={deleteAppointment}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MesRendezVous;
