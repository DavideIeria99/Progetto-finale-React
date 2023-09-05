/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import GetTimeRange from "../Utilities/GetTimeRange";
import TitleName from "../Utilities/TitleName";
import CardHome from "../Components/CardHome";
export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_RAWG_API_URL
      }games?dates=${GetTimeRange()}&ordering=-added&key=${import.meta.env.VITE_RAWG_API_KEY
      }&ordering=+rating
    `)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setData(() => r.results);
      });
  }, []);
  return (
    <>
      <TitleName title={"Home"} />
      <div className="min-h-screen">
        <div className="gap-12 px-12 py-12 md:flex md:py-24">
          <div className="w-full md:w-2/5">
            <h1 className="font-main bg-[#283164] bg-gradient-to-r from-primary to-accent bg-clip-text pb-12 text-6xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100">
              {import.meta.env.VITE_PROJECT_NAME}
            </h1>
            <p className="font-main bg-[#283164] bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100 md:text-5xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo,
              necessitatibus
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-main bg-[#283164] bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100 md:text-5xl">
            le ultime uscite nel mondo
          </h2>
        </div>
        <div className="flex flex-wrap" key={data}>
          {data ? data.map((game) => <CardHome key={game.id} game={game} />) : "loading"}
        </div>
      </div>
    </>
  );
}
