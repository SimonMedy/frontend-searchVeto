import PropTypes from "prop-types";
import { BookmarkIcon, CheckCircleIcon } from "@heroicons/react/16/solid";

const TimeSlotList = ({ timeSlots, onTimeSlotSelect, selectedTimeSlot }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mt-4 mb-2">
        Plages Horaires Disponibles :
      </h3>
      <ul className="list-none pl-0 m-4">
        {timeSlots.length === 0 ? (
          <li>Aucune plage horaire disponible</li>
        ) : (
          timeSlots.map((slot) => (
            <li key={slot.id} className="my-2">
              <button
                className={`btn flex items-center justify-between ${
                  selectedTimeSlot === slot.id
                    ? "btn-secondary"
                    : slot.available
                    ? "btn-success"
                    : "btn-disabled"
                }`}
                onClick={() => slot.available && onTimeSlotSelect(slot.id)}
                disabled={!slot.available}
              >
                <span className="flex items-center space-x-2">
                  <span>{slot.timeRange}</span>
                  {selectedTimeSlot === slot.id ? (
                    <BookmarkIcon className="h-4 w-4 text-secondary-content" />
                  ) : slot.available ? (
                    <CheckCircleIcon className="h-4 w-4 text-sucess-content" />
                  ) : null}
                  <span>
                    {selectedTimeSlot === slot.id
                      ? "(Sélectionné)"
                      : slot.available
                      ? "(Disponible)"
                      : "(Indisponible)"}
                  </span>
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

TimeSlotList.propTypes = {
  timeSlots: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      timeRange: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onTimeSlotSelect: PropTypes.func.isRequired,
  selectedTimeSlot: PropTypes.number,
};

export default TimeSlotList;
