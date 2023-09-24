import { useLoaderData } from "react-router-dom";
import useAuthStore from "../Zustand/authStore";
import { supabase } from "../supabase/client";
import GameChat from "../Components/GameChat/GameChat";
import TitleName from "../Utilities/TitleName";


export default function Details() {
  const game = useLoaderData();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const profile = useAuthStore((state) => state.profile);

  const isFavorite = () => {
    return profile.favorites.find((el) => +el.game_id === game.id);
  }

  const toggleFavorite = async () => {
    const data = await supabase.auth.getSession();
    if (isFavorite()) {
      const { data, error } = await supabase
        .from("favorites")
        .delete()
        .eq("id", isFavorite().id)
      console.log(data, error);
    } else {
      const { data, error } = await supabase
        .from("favorites")
        .insert({ user_id: profile.id, game_id: game.id, game_name: game.name })
        .select();
      console.log(data, error);
      // setta fra i favoriti
    }
    setLoggedIn(data.data.session);
  }
  console.log(game);
  return (
    <div
      className="min-h-screen px-12 py-24"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,1)), url("${game.background_image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <TitleName title={"details"} />
      <div className="flex  text-white">
        <div className="w-1/2">
          <p className="font-main  bg-gradient-to-r  from-sky-600 to-sky-100 bg-clip-text pb-4 text-3xl font-extrabold text-transparent md:text-5xl ">
            {game.name}
          </p>
          <div className="border-double border-4 border-sky-500 my-10">
            {profile && (
              <div className="my-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isFavorite() ? "red" : "white"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={isFavorite() ? "red" : "white"}
                  className="h-6 w-6"
                  onClick={toggleFavorite}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
            )}
            <ul className="h-30">
              <li>
                <span className="font-bold text-sky-400 me-1">uscita:</span>
                {game.released}
              </li>
              <li>
                <span className="font-bold text-sky-400">Sviluppatori</span>:{
                  game && game.developers.length > 0 ? game.developers.map((el, _) => (
                    <span className="mx-1" key={_} >{el.name}</span>
                  )) : game.developers.name}
              </li>
              <li>
                <span className="font-bold text-sky-400">Genere</span>:{
                  game && game.genres.length > 0 ? game.genres.map((el, _) => (
                    <span className="mx-1" key={_} >{el.name}</span>
                  )) : game.genres.name}
              </li>
              <li>
                <span className="font-bold text-sky-400 me-1">Rating:</span>
                {game.rating}
              </li>
              <li>
                <span className="font-bold text-sky-400">Store</span>:{
                  game && game.stores.length > 0 ? game.stores.map((el, _) => (
                    <span className="mx-1" key={_} >{el.store.name}</span>
                  )) : game.stores.name}
              </li>


            </ul>
          </div>

        </div>
        <div className="w-1/2">{profile && <GameChat game={game.id} />}</div>
      </div>
      <div className="w-4/5">
        <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
      </div>
    </div>
  );
}
export const getGameDetails = async ({ params }) => {
  return await fetch(
    `${import.meta.env.VITE_RAWG_API_URL}games/${params.id}?key=${import.meta.env.VITE_RAWG_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => {
      return r;
    });
};
