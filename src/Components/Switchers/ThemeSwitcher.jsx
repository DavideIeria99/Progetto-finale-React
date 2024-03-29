import { ReactComponent as Sun } from "../../assets/icons/Sun.svg";
import { ReactComponent as Moon } from "../../assets/icons/Moon.svg";
import { useState } from "react";

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const handleThemeChange = () => {
    setIsDark((isDark) => !isDark);

    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return <span onClick={handleThemeChange}>{isDark ? <Sun /> : <Moon />}</span>;
}
