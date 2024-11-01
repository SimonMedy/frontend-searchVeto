import PropTypes from "prop-types";

const Notification = ({ title, message, bgColor, textColor, onClose }) => {
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 card ${bgColor} ${textColor} shadow-xl`}
    >
      <div className="card-body">
        <h2 className="card-title flex justify-between items-center text-2xl">
          {title}
          <button
            className="btn btn-sm btn-circle btn-ghost text-current"
            onClick={onClose}
          >
            ✕
          </button>
        </h2>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
