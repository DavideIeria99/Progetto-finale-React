import { Link, useLoaderData, useParams } from "react-router-dom";
import GenresList from "../Components/GenresList";
import Card from "../Components/Card";
import { useEffect, useState } from "react";

export default function Search() {
  const genres = useLoaderData();
  const { genre } = useParams()
  const { num = 1 } = useParams()


  const [games, setGames] = useState(null);
  const [searched, setSearched] = useState("");

  const [loading, setLoading] = useState(true);
  const page_size = 12;

  useEffect(() => {
    setLoading(true)
    setGames(null)
    setSearched("")
    fetch(`${import.meta.env.VITE_RAWG_API_URL}games?&key=${import.meta.env.VITE_RAWG_API_KEY}&genres=${genre}&page=${num}&page_size=${page_size}&ordering=-rating`,).then(r => r.json()).then(r => {
      setGames(r)
      setLoading(false)
    })
  }, [genre, num])

  const triggerSearch = () => {
    setLoading(true);
    setGames(null)
    fetch(`${import.meta.env.VITE_RAWG_API_URL}games?&key=${import.meta.env.VITE_RAWG_API_KEY}&page_size=30&search=${searched}&search_precise=true&&ordering=-rating `,)
      .then((r) => r.json()).then((r) => {
        setGames(r)
        setLoading(false)
      });
  }

  // useEffect(() => {
  //   if (searched.length > 2) {
  //     setLoading(true);
  //     setGames(null)
  //     fetch(`${import.meta.env.VITE_RAWG_API_URL}games?&key=${import.meta.env.VITE_RAWG_API_KEY}&page_size=30&search=${searched}&search_precise=true&&ordering=-rating `,)
  //       .then((r) => r.json()).then((r) => {
  //         setGames(r)
  //         setLoading(false)
  //       })
  //   }
  // }, [searched])

  return (
    <div className="flex min-h-screen px-6">
      <div className=" flex w-1/5 flex-col">
        <div>
          <input
            type="text"
            className="border-b-2 border-accent  bg-transparent  text-slate-700   dark:text-white"
            placeholder="search by name..."
            value={searched}
            onChange={(e) => setSearched(e.target.value)} />
          <button onClick={triggerSearch} className="bg-transparent">Search</button>
        </div>
        <GenresList genres={genres} genre={genre} />
      </div>

      <div className=" w-4/5">
        {
          games && (
            <>
              <div className="flex flex-wrap">

                {games.results.map((game) => (
                  <Card key={game.id} game={game} />
                ))}
              </div>
              <div className="mb-12 w-full">
                {!searched && (
                  <div className="flex justify-center">
                    {num > 1 && <Link to={`/search/${genre}/${+num - 1}`} className="text-slate-800 dark:text-white">
                      prev
                    </Link>}
                    <div className="w-48 text-center">{num}</div>
                    <Link to={`/search/${genre}/${+num + 1}`} className="text-slate-800 dark:text-white">
                      prev
                    </Link>
                  </div>
                )}
              </div>
            </>
          )
        }

        {
          loading && <div className="h-full items-centerjustify-center">loader</div>
        }
      </div>
    </div>
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
