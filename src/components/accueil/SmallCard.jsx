import PropTypes from "prop-types";

const SmallCard = ({ logo, title, description, buttonText, buttonLink, bgColor, btnColor, btnTextColor }) => {
  return (
    <div className={`card ${bgColor} shadow-xl lg:w-100 lg:h-100 w-80 h-120`}>
      <div className="card-body flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-2">{logo}</div>
        <h2 className="card-title text-2xl font-bold text-base-100">{title}</h2>
        <h2 className="mt-4 text-lg text-base-100">{description}</h2>
        <div className="card-actions justify-center mt-4">
          <a href={buttonLink} className={`btn text-lg ${btnColor} ${btnTextColor}`}>
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

SmallCard.propTypes = {
  logo: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  btnColor: PropTypes.string,
  btnTextColor: PropTypes.string
};

export default SmallCard;
