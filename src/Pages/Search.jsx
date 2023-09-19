import { Link, useLoaderData, useParams } from "react-router-dom";
import GenresList from "../Components/GenresList";
import Card from "../Components/Card";
import { useEffect, useState } from "react";
import Pagination from "../Components/Pagination";

export default function Search() {
  const genres = useLoaderData();
  const { genre } = useParams();
  const { num = 1 } = useParams();

  const [games, setGames] = useState(null);
  const [searched, setSearched] = useState("");

  const [loading, setLoading] = useState(true);
  const page_size = 12;
  //*quando dai dei parametri genere e nun di pagina
  useEffect(() => {
    setLoading(true);
    setGames(null);
    setSearched("");
    fetch(
      `${import.meta.env.VITE_RAWG_API_URL}games?&key=${
        import.meta.env.VITE_RAWG_API_KEY
      }&genres=${genre}&page=${num}&page_size=${page_size}&ordering=+rating`,
    )
      .then((r) => r.json())
      .then((r) => {
        setGames(r);
        setLoading(false);
      });
  }, [genre, num]);

  //*quando cerchi
  const triggerSearch = () => {
    setLoading(true);
    setGames(null);
    fetch(
      `${import.meta.env.VITE_RAWG_API_URL}games?&key=${
        import.meta.env.VITE_RAWG_API_KEY
      }&page_size=${page_size}&search=${searched}&search_precise=true&&ordering=+rating `,
    )
      .then((r) => r.json())
      .then((r) => {
        setGames(r);
        setLoading(false);
      });
  };

  //*Fa vedere i risultati senza parametri
  useEffect(() => {
    setLoading(true);
    setGames(null);
    fetch(
      `${import.meta.env.VITE_RAWG_API_URL}games?&key=${
        import.meta.env.VITE_RAWG_API_KEY
      }&page_size=${page_size}&search=${searched}&search_precise=true&&ordering=+rating `,
    )
      .then((r) => r.json())
      .then((r) => {
        setGames(r);
        setLoading(false);
      });
  }, []);

  return (
    //zona parametri
    <div className="flex min-h-screen px-6">
      <div className=" w-1/8 me-3 flex flex-col">
        <div>
          <input
            type="text"
            className="me-1 border-2 border-accent border-slate-300  bg-transparent  text-slate-700   dark:text-white"
            placeholder="search by name..."
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
          />
          <button
            onClick={triggerSearch}
            className="rounded-lg bg-slate-800 p-1"
          >
            Search
          </button>
        </div>
        <GenresList genres={genres} genre={genre} />
      </div>
      {/* zona giochi */}
      <div className=" w-4/5">
        {games && (
          <>
            <h2 className="font-main mb-5 bg-[#283164] bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100 md:text-5xl">
              {!searched ? "Giochi del momento" : "Ecco la ricerca"}
            </h2>

            <div className="flex flex-wrap">
              {games.results.map((game) => (
                <Card key={game.id} game={game} />
              ))}
            </div>
            <div className="mb-12 w-full">
              {!searched && <Pagination num={num} genre={genre} />}
            </div>
          </>
        )}

        {loading && (
          <div className="items-centerjustify-center h-full">loader</div>
        )}
      </div>
    </div>
  );
}

//funzione generi
export const getGenres = async () => {
  return await fetch(
    `${import.meta.env.VITE_RAWG_API_URL}genres?key=${
      import.meta.env.VITE_RAWG_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => r.results);
};
