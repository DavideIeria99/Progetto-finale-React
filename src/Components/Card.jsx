import { Link } from "react-router-dom";

export default function Card({ game }) {
  return (
    <div className="mb-5 w-1/2 px-2  flex justify-between md:w-1/3 ">
      <Link to={`/details/${game.id}`}>
        <div className="relative mx-20 w-[10rem] md:w-[20rem] hover:border-solid hover:border-2 hover:border-sky-500 rounded-lg duration-300 hover:z-10 md:mx-2">
          {/* Background Image  */}
          <img
            src={game.background_image ?? "https://picsum.photos/100"}
            className="h-40 w-full rounded-lg object-cover"
          />
          {/* <!-- Content --> */}
          <div className="absolute bottom-0 flex h-full w-full flex-col items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-700/30 to-[#14496cc4] text-center">
            {/* <!-- Quotes --> */}
            <div className=" rounded-xl bg-[#14496c] ">
              <h2 className="p-5 text-lg text-gray-300 ">{game.name}</h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
