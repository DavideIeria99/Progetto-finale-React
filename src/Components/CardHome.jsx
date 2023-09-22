import { Link } from "react-router-dom";

export default function CardHome({ game }) {
  return (
    <div className="flex  items-center justify-center my-10">
      <Link to={`/details/${game.id}`}>
        <div className="relative mx-20 w-[20rem] rounded-lg duration-300 hover:z-10  hover:scale-125 hover:ease-in sm:mx-1 sm:h-96 md:mx-2">
          {/* Background Image  */}
          <img
            src={game.background_image ?? "https://picsum.photos/100"}
            className="h-full w-full rounded-lg object-cover"
          />
          {/* <!-- Content --> */}
          <div className="absolute bottom-0 flex h-full w-full flex-col items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-700/30 to-[#14496cc4] text-center">
            {/* <!-- Quotes --> */}
            <div className=" rounded-xl bg-[#14496c] ">
              <h2 className="p-5 text-lg text-gray-300 ">{game.name}</h2>
            </div>
            <div className=" mt-2 rounded-xl bg-[#14496c] ">
              <p className="p-1   text-lg  text-gray-300 ">{game.released}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
