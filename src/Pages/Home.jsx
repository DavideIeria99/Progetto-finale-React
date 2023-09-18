import { useEffect, useState } from "react";
import TitleName from "../Utilities/TitleName";
import CardHome from "../Components/CardHome";
import { useTranslation } from "react-i18next";


export default function Home() {
  const [data, setData] = useState(null);
  const { t } = useTranslation()
  useEffect(() => {
    fetch(`${import.meta.env.VITE_RAWG_API_URL
      }games?&ordering=-added&key=${import.meta.env.VITE_RAWG_API_KEY
      }&ordering=+rating
    `)
      .then((r) => r.json())
      .then((r) => {
        // console.log(r);
        setData(() => r.results);
      });
  }, []);
  return (
    <>
      <TitleName title={"Home"} />
      <div className="min-h-screen pt-24">
        <div className="gap-12 px-12 py-12 md:flex md:py-24">
          <div className="w-full md:w-2/5">
            <h1 className="font-main bg-[#283164] bg-gradient-to-r from-primary to-accent bg-clip-text pb-12 text-6xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100">
              {t("home.title")}
            </h1>
            <p className=" pb-2 font-main bg-[#283164] bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100 md:text-5xl">
              {t("home.subtitle")}
            </p>
          </div>
        </div>
        <div>
          <h2 className=" pb-2 font-main bg-[#283164] bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100 md:text-5xl">
            {t("home.playMoment")}
          </h2>
        </div>
        <div className="flex flex-wrap" key={data}>
          {data ? data.map((game) => <CardHome key={game.id} game={game} />) : "loading"}
        </div>
      </div>
    </>
  );
}
