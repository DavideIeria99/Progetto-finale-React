import { Link } from "react-router-dom";

export default function Card({ game }) {
  return (
    <div className="mb-5 w-1/2 px-2 duration-300 hover:z-10 hover:scale-125 hover:ease-in md:w-1/4">
      <Link to={`/details/${game.id}`}>
        <p>{game.name}</p>
        <img
          src={game.background_image}
          alt="img"
          className="h-40 w-full object-cover"
        />
      </Link>
    </div>
  );
}
