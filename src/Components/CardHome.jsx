/* eslint-disable react/prop-types */
export default function CardHome() {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="relative h-[30rem] sm:mx-1 sm:h-96 w-[20rem] md:mx-2 mx-20  rounded-lg hover:scale-125 hover:z-10 hover:ease-in duration-300">
                {/* Background Image  */}
                {/* <img src={Game.background_image} className="object-cover w-full h-full rounded-lg" /> */}
                <img src="https://picsum.photos/200" className="object-cover w-full h-full rounded-lg" />
                {/* <!-- Content --> */}
                <div className="absolute w-full h-full bottom-0 bg-gradient-to-r from-fuchsia-700/30 to-[#14496cc4] rounded-lg flex flex-col items-center justify-center text-center">
                    {/* <!-- Quotes --> */}
                    <div className=" rounded-xl bg-[#14496c] ">
                        <h2 className="text-lg p-5 text-gray-300 ">
                            {/* {Game.name} */}
                            bellos
                        </h2>
                    </div>
                    <div className=" rounded-xl mt-2 bg-[#14496c] ">
                        <p className="text-lg   p-1  text-gray-300 ">
                            {/* {Game.released} */}
                            srepeveee
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
