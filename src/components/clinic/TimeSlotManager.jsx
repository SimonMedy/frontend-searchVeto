import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isAfter } from "date-fns";

const TimeslotManager = ({ clinicId }) => {
  const { isAdmin, token, API_BASE_URL } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [message, setMessage] = useState("");

  const handleAddTimeslot = async () => {
    if (!isAdmin) {
      setMessage(
        "Vous devez être administrateur pour ajouter des plages horaires."
      );
      return;
    }

    if (!selectedDate || !startTime || !endTime) {
      setMessage(
        "Veuillez sélectionner une date, une heure de début et une heure de fin."
      );
      return;
    }

    if (!isAfter(endTime, startTime)) {
      setMessage("L'heure de fin doit être postérieure à l'heure de début.");
      return;
    }

    const timeRange = `${format(startTime, "HH:mm")}-${format(
      endTime,
      "HH:mm"
    )}`;

    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/timeSlots`,
        { clinicId, date: formattedDate, timeRange },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de l'ajout de la plage horaire.";
      setMessage(errorMessage);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Créer une plage horaire :</h2>
      <div className="mx-4 mt-4">
        <label className="block mb-2 text-lg font-bold">Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setStartTime(null);
            setEndTime(null);
          }}
          dateFormat="dd/MM/yyyy"
          className="input input-bordered mb-2 min-w-64"
          placeholderText="Sélectionner une date"
          minDate={new Date()}
        />
      </div>
      {selectedDate && (
        <>
          <div className="mb-4 mx-4">
            <label className="block mb-2 text-lg font-bold">
              Heure de début
            </label>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Heure"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              className="input input-bordered mb-2 min-w-64"
              placeholderText="Sélectionner l'heure de début"
            />
          </div>
          <div className="mx-4">
            <label className="block mb-2 text-lg font-bold">Heure de fin</label>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Heure"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              minTime={startTime || new Date().setHours(0, 0)}
              maxTime={new Date(startTime).setHours(23, 59)}
              className="input input-bordered mb-2 min-w-64"
              placeholderText="Sélectionner l'heure de fin"
            />
          </div>
        </>
      )}
      <button
        onClick={handleAddTimeslot}
        className="btn btn-primary text-lg mx-4 mt-4"
      >
        Ajouter Plage Horaire
      </button>
      {message && <p className="mt-4 mx-4">{message}</p>}
    </div>
  );
};

TimeslotManager.propTypes = {
  clinicId: PropTypes.number.isRequired,
};

export default TimeslotManager;
