import PropTypes from "prop-types";

const themes = [
  { name: "light", color: "bg-gray-300" },
  { name: "cupcake", color: "bg-[#65c3c8]" },
  { name: "synthwave", color: "bg-purple-900" },
  { name: "dark", color: "bg-gray-800" },
];

const ThemeSwitcher = ({ className }) => {
  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className={`flex space-x-3 ${className}`}>
      {themes.map((theme) => (
        <div
          key={theme.name}
          className={`${theme.color} btn glass btn-circle`}
          onClick={() => changeTheme(theme.name)}
        />
      ))}
    </div>
  );
};

ThemeSwitcher.propTypes = {
  className: PropTypes.string,
};

export default ThemeSwitcher;
