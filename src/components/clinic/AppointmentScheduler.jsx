import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import TimeSlotList from "./TimeSlotList";
import PropTypes from "prop-types";
import { format } from "date-fns";

const API_BASE_URL = "http://127.0.0.1:5000";

const AppointmentScheduler = ({ clinicId, animalId }) => {
  const { isAuthenticated, token } = useAuth();
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [message, setMessage] = useState("");

  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        if (!isAuthenticated || !token) {
          console.error("Utilisateur non connecté ou token manquant");
          return;
        }

        const formattedDate = formatDate(date);
        const response = await axios.get(
          `${API_BASE_URL}/timeSlots?clinicId=${clinicId}&date=${formattedDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTimeSlots(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des plages horaires",
          error
        );
      }
    };

    fetchTimeSlots();
  }, [date, clinicId, isAuthenticated, token]);

  const handleTimeSlotSelect = (timeSlotId) => {
    setSelectedTimeSlot(timeSlotId);
  };

  const handleAppointmentBooking = async () => {
    if (!selectedTimeSlot) {
      setMessage("Veuillez sélectionner une plage horaire.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/appointments`,
        {
          animalId,
          clinicId,
          date: formatDate(date),
          timeSlotId: selectedTimeSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setSelectedTimeSlot(null);
      setTimeSlots((prevTimeSlots) =>
        prevTimeSlots.map((slot) =>
          slot.id === selectedTimeSlot ? { ...slot, available: false } : slot
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de la prise de rendez-vous.";
      setMessage(errorMessage);
    }
  };

  const disablePastDates = ({ date, view }) => {
    return view === "month" && date < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Prendre un Rendez-vous</h2>
      <Calendar
        onChange={setDate}
        value={date}
        className={"bg-base-100"}
        tileDisabled={disablePastDates}
      />
      <TimeSlotList
        timeSlots={timeSlots}
        onTimeSlotSelect={handleTimeSlotSelect}
        selectedTimeSlot={selectedTimeSlot}
      />
      <button
        onClick={handleAppointmentBooking}
        className="btn btn-primary text-lg mt-2"
        disabled={!selectedTimeSlot}
      >
        Réserver ce créneau
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

AppointmentScheduler.propTypes = {
  clinicId: PropTypes.number.isRequired,
  animalId: PropTypes.number.isRequired,
};

export default AppointmentScheduler;
