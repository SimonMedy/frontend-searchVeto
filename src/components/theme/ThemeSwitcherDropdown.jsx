import PropTypes from "prop-types";

const themes = [
  { name: "light", color: "bg-gray-300" },
  { name: "cupcake", color: "bg-[#65c3c8]" },
  { name: "synthwave", color: "bg-purple-900" },
  { name: "dark", color: "bg-gray-800" },
];

const ThemeSwitcherDropdown = ({ className }) => {
  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`} style={{ cursor: 'default' }}>
      {themes.map((theme) => (
        <div
          key={theme.name}
          className={`cursor-pointer ${theme.color} btn-sm glass btn-circle`}
          onClick={() => changeTheme(theme.name)}
          title={theme.name}
        />
      ))}
    </div>
  );
};

ThemeSwitcherDropdown.propTypes = {
  className: PropTypes.string,
};

export default ThemeSwitcherDropdown;
