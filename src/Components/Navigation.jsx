import { ReactComponent as Bars } from "../assets/icons/Bars.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import ThemeSwitcher from "./Switchers/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./Switchers/LanguageSwitcher";
import DefaultDropdown from "./UI/DefaultDropdown";
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <nav className="fixed z-30 flex h-14 w-screen items-center bg-[#14496c]  px-2">
        {/* link principali */}
        <div className="flex w-1/3  justify-around text-white md:w-1/3">
          <Link to="/" className="font-main font-bold tracking-widest ">
            Home
          </Link>
          <Link to="/search-page" className="font-main hidden md:inline ">
            {t("common.search")}
          </Link>
        </div>
        {/* titolo */}
        <div className="flex w-1/3 justify-center text-white md:w-1/3">
          <h1 className="font-main bg-[#283164] bg-gradient-to-r bg-clip-text p-12  text-6xl font-extrabold text-transparent from-sky-600 to-sky-100">
            {import.meta.env.VITE_PROJECT_NAME}
          </h1>
        </div>
        {/* link secondari */}
        <div className="flex w-1/3 items-center justify-around text-white">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <DefaultDropdown />
          <button onClick={() => setOpen(!open)} className="ml-4 md:hidden">
            <Bars />
          </button>
        </div>
      </nav>
      {/* navBar mobile */}
      <nav
        className={
          "fixed right-0 z-20 h-screen w-full overflow-y-auto bg-gray-300 bg-opacity-80 p-4 pt-20 backdrop-blur-sm  transition-transform dark:bg-sky-900 dark:bg-opacity-80 " +
          (open ? "" : "translate-x-full")
        }
      >
        <div className="flex flex-col">
          <Link to="/" className="font-main py-12 font-bold tracking-widest ">
            Home
          </Link>
          <Link to="/search" className="font-main py-12 ">
            search
          </Link>
          <Link to="/" className="font-main py-12 ">
            home
          </Link>
          <Link to="/" className="font-main py-12 ">
            home
          </Link>
        </div>
      </nav>
    </>
  );
}
