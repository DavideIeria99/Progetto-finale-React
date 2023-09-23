import { useEffect, useState } from "react";
import TitleName from "../Utilities/TitleName";
import CardHome from "../Components/CardHome";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [data, setData] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_RAWG_API_URL}games?&ordering=-added&key=${import.meta.env.VITE_RAWG_API_KEY
      }&ordering=+rating
    `)
      .then((r) => r.json())
      .then((r) => {
        // console.log(r);
        setData(() => r.results);
      });
  }, []);
  console.log();
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}>
      <div className="min-h-screen pt-12">
        <TitleName title={"Home"} />
        <div className="gap-12 md:px-12 py-12 md:flex md:py-24 bg-header-light dark:bg-header-dark">
          <div className="w-full   flex justify-between md:justify-around ">
            <h1 className="font-main  bg-[#283164] bg-gradient-to-r bg-clip-text pb-12 text-6xl font-extrabold text-transparent from-sky-600 to-sky-100">
              {t("home.title")}
            </h1>
            <p className=" font-main  bg-[#283164] bg-gradient-to-r bg-clip-text pb-2 text-3xl font-extrabold text-transparent from-sky-600 to-sky-100 md:text-5xl">
              {t("home.subtitle")}
            </p>
          </div>
        </div>
        <div>
          <h2 className=" font-main bg-[#283164] bg-gradient-to-r bg-clip-text pb-2 mt-5 text-3xl font-extrabold text-transparent from-sky-600 to-sky-100 md:text-5xl">
            {t("home.playMoment")}
          </h2>
        </div>
        <div className="flex justify-evenly flex-wrap" key={data}>
          {data
            ? data.map((game) => <CardHome key={game.id} game={game} />)
            : "loading"}
        </div>
      </div>
    </motion.div>
  );
}
