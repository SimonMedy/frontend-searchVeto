import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const InfoCard = ({
  title,
  description,
  linkText,
  linkUrl,
  bgColor,
  bgImage,
  btnLogo,
}) => {
  return (
    <div
      className={`card lg:card-side shadow-xl bg-${bgColor} sm:max-w-md md:max-w-2xl lg:max-w-7xl`}
    >
      <figure className="w-full lg:w-1/2 lg:max-w-xs">
        <img
          src={bgImage}
          alt={title}
          className="object-cover w-full h-full "
        />
      </figure>
      <div className="card-body text-base-100 p-8 w-full lg:w-1/2">
        <h2 className="card-title text-4xl font-bold">{title}</h2>
        <p className="mt-4 text-lg">{description}</p>
        <div className="mt-6 card-actions justify-end">
          <Link to={linkUrl} className="btn btn-base-300 text-lg">
            {btnLogo}
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  bgImage: PropTypes.string,
  btnLogo: PropTypes.node,
};

export default InfoCard;
