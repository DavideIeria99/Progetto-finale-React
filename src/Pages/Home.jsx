import { useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_RAWG_API_URL
            }?dates=2019-01-01,2019-12-31&ordering=-added&key=${import.meta.env.VITE_RAWG_API_KEY
            }
    `)
            .then((r) => r.json())
            .then((r) => {
                console.log(r);
                setData(() => r.results);
            });
    }, []);
    return (
        <div className="min-h-screen">
            <div className="gap-12 px-12 py-12 md:flex md:py-24">
                <div className="w-full md:w-2/5">
                    <h1 className="font-main bg-gradient-to-r from-primary to-accent bg-clip-text pb-12 text-6xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100">
                        {import.meta.env.VITE_PROJECT_NAME}
                    </h1>
                    <p className="font-main bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold text-transparent dark:from-sky-600 dark:to-sky-100 md:text-5xl">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo,
                        necessitatibus
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap">
                {data
                    ? data.map((game) => (
                        <div className="mb-4 w-1/4 text-center" key={game.id}>
                            <p>{game.name}</p>
                            <img
                                className="mx-auto block h-32 w-32 rounded-full object-cover"
                                src={game.background_image}
                                alt=""
                            />
                        </div>
                    ))
                    : "loading"}
            </div>
        </div>
    );
}

/* data.results.map((game) => {
  <div key={game.id}>
    <p>{game.name}</p>
    <img src={game.background_image} alt="" />
  </div>;
}) */
