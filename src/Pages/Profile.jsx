import { useState } from "react";
import ProfileAdmin from "../Components/Admin/ProfileAdmin";
import getProfileImage from "../Utilities/getProfileImage";
import useAuthStore from "../Zustand/authStore";
import UpdateImage from "../Components/UpdateImage";
import TitleName from "../Utilities/TitleName";
import UpdateProfile from "../Components/UpdateProfile";



export default function Profile() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const profile = useAuthStore((state) => state.profile);
  const [update, setUpdate] = useState(false);
  const [banned, setBanned] = useState(false);
  const [user, setUser] = useState(false);


  const handleChange = () => { update === false ? setUpdate(true) : setUpdate(false) };
  const bannedChange = () => { banned === false ? setBanned(true) : setBanned(false) };
  const userChange = () => { user === false ? setUser(true) : setUser(false) };
  console.clear
  console.log(profile);
  return (
    <div className="pt-20">
      <TitleName title={"Profile"} />
      <h1 className="font-main  bg-[#283164] bg-gradient-to-r bg-clip-text pb-12 text-6xl font-extrabold text-transparent from-sky-600 dark:to-sky-100 to-sky-800">benvenuto {profile && profile.first_name} </h1>
      <div className="flex justify-evenly mb-10">
        <div className="w-1/3  border-double border-2 p-5 rounded dark:border-sky-500 border-sky-700  ">
          <img src={getProfileImage(profile.avatar_url)} alt="" className=" bg-center bg-cover" />
        </div>
        {
          profile &&
          <div className="border-double border-2 rounded dark:border-sky-500 border-sky-700 my-10 w-1/3 px-3 flex flex-col justify-center">

            <p><span className="font-bold dark:text-sky-400 text-sky-800">userName:</span> {profile.username}</p>
            <p><span className="font-bold dark:text-sky-400 text-sky-800">first name: </span> {profile.first_name}</p>
            <p><span className="font-bold dark:text-sky-400 text-sky-800">last name: </span> {profile.last_name}</p>

            <button onClick={handleChange} className=" bg-sky-400 text-sky-800 font-bold rounded-full p-2 mt-2">
              modifica Avatar
            </button>
            <button onClick={userChange} className=" bg-sky-400 text-sky-800 font-bold rounded-full p-2 mt-2">
              modifica dati
            </button>
            {
              isAdmin &&
              <button onClick={bannedChange} className=" bg-sky-400 text-sky-800 font-bold rounded-full p-2 mt-2">
                Lista profili
              </button>
            }

          </div>
        }

      </div>
      {update && <UpdateImage />}

      {banned && <ProfileAdmin />}

      {user && <UpdateProfile />}

    </div >
  );
}
