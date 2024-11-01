import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SectionWithImage = ({
  imageSrc,
  title,
  content,
  buttonLink,
  buttonText,
  buttonIcon,
  buttonColor,
  onButtonClick,
  reverse,
  reverseButtonText,
}) => {
  return (
    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center mt-16">
      <div
        className={`flex justify-center md:order-1 lg:${
          reverse ? "justify-end" : "justify-start"
        } ${reverse ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}
      >
        <img src={imageSrc} className="rounded-lg" />
      </div>
      <div
        className={`md:text-center sm:text-left lg:text-left lg:px-0 md:px-8 ${
          reverse ? "order-1 lg:order-1" : "order-2 lg:order-2"
        } flex justify-center lg:${reverse ? "justify-start" : "justify-end"}`}
      >
        <div>
          <h2 className="text-4xl font-bold mb-3">{title}</h2>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {buttonLink && buttonText && (
            <div className="mt-3 lg:mt-6 flex justify-center lg:justify-center">
              {buttonLink.startsWith("#") ? (
                <a
                  href={buttonLink}
                  className={`btn ${buttonColor} btn-outline lg:btn-lg group text-lg`}
                  onClick={onButtonClick}
                >
                  {reverseButtonText ? (
                    <>
                      {buttonIcon}
                      {buttonText}
                    </>
                  ) : (
                    <>
                      {buttonText}
                      {buttonIcon}
                    </>
                  )}
                </a>
              ) : (
                <Link
                  to={buttonLink}
                  className={`btn ${buttonColor} btn-outline lg:btn-lg group text-lg`}
                  onClick={onButtonClick}
                >
                  {reverseButtonText ? (
                    <>
                      {buttonIcon}
                      {buttonText}
                    </>
                  ) : (
                    <>
                      {buttonText}
                      {buttonIcon}
                    </>
                  )}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

SectionWithImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonLink: PropTypes.string,
  buttonText: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonIcon: PropTypes.node,
  onButtonClick: PropTypes.func,
  reverse: PropTypes.bool,
  reverseButtonText: PropTypes.bool,
};

export default SectionWithImage;
