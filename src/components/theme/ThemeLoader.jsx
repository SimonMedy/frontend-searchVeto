import { useEffect } from "react";

const ThemeLoader = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  return null;
};

export default ThemeLoader;
