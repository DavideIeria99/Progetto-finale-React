import { ReactComponent as Bars } from "../assets/icons/Bars.svg";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeSwitcher from "./Switchers/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./Switchers/LanguageSwitcher";
import DefaultDropdown from "./UI/DefaultDropdown";
import { supabase } from "../supabase/client";
import useAuthStore from "../Zustand/authStore";
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const profile = useAuthStore((state) => state.profile);
  const setLoggedOut = useAuthStore((state) => state.setLoggedOut);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setLoggedOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="fixed z-30 flex h-14 w-screen justify-between items-center bg-[#14496c]  px-2">
        {/* link principali */}
        <div className="flex w-1/4   justify-around text-white md:w-1/3">
          <Link to="/" className=" font-main font-bold tracking-widest ">
            Home
          </Link>
          <Link to="/search-page" className="font-main font-bold hidden md:inline  ">
            {t("common.search")}
          </Link>
        </div>
        {/* titolo */}
        <div className="flex w-1/3 justify-center  text-white md:w-1/3">
          <h1 className="font-main bg-[#283164] bg-gradient-to-r bg-clip-text p-12  text-6xl font-extrabold text-transparent from-sky-600 to-sky-100">
            {import.meta.env.VITE_PROJECT_NAME}
          </h1>
        </div>
        {/* link secondari */}
        <div className=" w-1/4 items-center justify-around hidden md:flex  text-white">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <DefaultDropdown />
        </div>
        <button onClick={() => setOpen(!open)} className="me-4 md:hidden">
          <Bars />
        </button>
      </nav>
      {/* navBar mobile */}
      <nav
        className={
          "fixed right-0 z-20 h-screen w-full overflow-y-auto bg-gray-300 bg-opacity-80 p-4 pt-20 backdrop-blur-sm  transition-transform dark:bg-sky-900 dark:bg-opacity-80 " +
          (open ? "" : "translate-x-full")
        }
      >
        <div className="flex flex-col">
          <Link to="/" className="font-main py-10 font-bold tracking-widest ">
            Home
          </Link>
          <Link to="/search-page" className="font-main py-10 font-bold  ">
            {t("common.search")}
          </Link>
          {profile ?
            <>
              <Link to="/profile" className="font-main py-10 font-bold  ">
                {profile.username}
              </Link>
              {/* <Link to="/update" className="font-main py-10 font-bold">
                Modifica profilo
              </Link> */}
              <Link to="/" className="font-main py-10 font-bold">
                preferiti
              </Link>
              <div className="font-main">
                <button onClick={logOut}>
                  LogOut
                </button>
              </div>
            </>
            :
            <>
              <Link to="/login" className="font-main py-10 font-bold  ">
                login
              </Link>
              <Link to="/signIn" className="font-main py-10 font-bold  ">
                {t("common.register")}
              </Link>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </>}


        </div>
      </nav>
    </>
  );
}
