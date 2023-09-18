import { useLoaderData } from "react-router-dom";


export default function Details() {
    const game = useLoaderData();
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
            <div className="flex text-white">
                <div className="w-1/2">
                    <p className="font-main  bg-gradient-to-r  from-sky-600 to-sky-100 bg-clip-text pb-4 text-3xl font-extrabold text-transparent md:text-5xl ">
                        {game.name}
                    </p>

                    {/* {profile && (
                        <div className="my-12">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={isFavorite() ? "red" : "black"}
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke={isFavorite() ? "red" : "black"}
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
                    )} */}

                    <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
                </div>

                {/* <div className="w-1/2">{profile && <GameChat game={game.id} />}</div> */}
            </div>
        </div>
    )
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
}