'use client';

import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import GenresList from "../Components/GenresList";
import Card from "../Components/Card";
import StoresList from "../Components/StoresList";
import { motion } from "framer-motion";
import { Accordion } from 'flowbite-react';


import Button from "../Components/UI/Button";
import { useTranslation } from "react-i18next";
import TitleName from "../Utilities/TitleName";

export default function SearchPage() {
  const { genres, stores } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    const qs = [...searchParams].map((el) => `&${el[0]}=${el[1]}`).join("");
    fetch(
      `${import.meta.env.VITE_RAWG_API_URL}games?&key=${import.meta.env.VITE_RAWG_API_KEY
      }&page_size=${page_size}&search_precise=true&ordering=-rating${qs}`,
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setGames(r);
      });
  }, [searchParams]);

  const [games, setGames] = useState(null);
  const [searched, setSearched] = useState("");

  const page_size = 12;

  const handlePage = (order) => {
    const allParams = Object.fromEntries([...searchParams]);

    if (order === "next") {
      setSearchParams({
        ...allParams,
        page: allParams.page ? +allParams.page + 1 : 2,
      });
    } else {
      setSearchParams({
        ...allParams,
        page: allParams.page == 1 || !allParams.page ? 1 : +allParams.page - 1,
      });
    }
  };

  const handleSearched = () => {
    setSearchParams({ search: searched });
  };


  return (
    <div className="flex">
      <TitleName title={"Search"} />
      <div className="flex w-1/5 flex-col  pt-24">
        <div className="mb-24">
          <input
            className="peer block w-full appearance-none rounded-md border-0  bg-slate-200  p-2.5 text-gray-900  focus:outline-none focus:ring-0  dark:bg-sky-950 dark:text-white"
            type="search"
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
            placeholder="Scrivi. Muoviti."
          />
          <div className="mt-3 text-right">
            <Button type="button" onClick={handleSearched} label="Search" />
          </div>
        </div>
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="text-xl">{t("search.genres")}</p>
            </Accordion.Title>
            <Accordion.Content>
              <GenresList
                genres={genres}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <p className=" text-xl">{t("search.stores")}</p>
            </Accordion.Title>
            <Accordion.Content>
              <StoresList
                stores={stores}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
      <div className="w-4/5">
        <motion.div
          className="min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}>
          {games && (
            <>
              <div className="flex flex-wrap pt-24 justify-evenly ">
                {games.results.map((game) => (
                  <Card key={game.id} game={game} />
                ))}
              </div>

              <div className="mb-12 mt-24 flex w-full items-center justify-center">
                <Button
                  type="button"
                  label="Prev page"
                  onClick={() => handlePage("prev")}
                />

                <span className="mx-4">{searchParams.get("page")}</span>

                <Button
                  type="button"
                  label="Next page"
                  onClick={() => handlePage("next")}
                />
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div >
  );
}

export const getGenres = async () => {
  return await fetch(
    `${import.meta.env.VITE_RAWG_API_URL}genres?key=${import.meta.env.VITE_RAWG_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => r.results);
};

export const getStores = async () => {
  return await fetch(
    `${import.meta.env.VITE_RAWG_API_URL}stores?key=${import.meta.env.VITE_RAWG_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => r.results);
};

export const loadAll = async () => {
  const genres = await getGenres();
  const stores = await getStores();

  return { genres, stores };
};
