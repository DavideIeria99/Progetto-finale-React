import ProfileAdmin from "../Components/Admin/ProfileAdmin";
import ProfileMain from "../Components/ProfileMain";
import getProfileImage from "../Utilities/getProfileImage";
import useAuthStore from "../Zustand/authStore";

export default function Profile() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const profile = useAuthStore((state) => state.profile);
  console.clear
  console.log(profile);
  return (
    <div className="pt-20">
      <h1 className="font-main  bg-[#283164] bg-gradient-to-r bg-clip-text pb-12 text-6xl font-extrabold text-transparent from-sky-600 dark:to-sky-100 to-sky-800">benvenuto {profile && profile.first_name} </h1>

      <div className="flex justify-evenly mb-10">
        <div className="w-1/3  border-double border-2 p-5 rounded dark:border-sky-500 border-sky-700  ">
          <img src={getProfileImage(profile.avatar_url)} alt="" className=" bg-center bg-cover" />
        </div>

        <div className="border-double border-2 rounded dark:border-sky-500 border-sky-700 my-10 w-1/3 px-3 flex flex-col justify-center">
          <p><span className="font-bold dark:text-sky-400 text-sky-800">userName:</span> {profile && profile.username}</p>
          <p><span className="font-bold dark:text-sky-400 text-sky-800">first nane: </span> {profile && profile.first_name}</p>
          <p><span className="font-bold dark:text-sky-400 text-sky-800">last name: </span> {profile && profile.last_name}</p>
          <p><span className="font-bold dark:text-sky-400 text-sky-800">id: </span> {profile && profile.id}</p>
        </div>
      </div>


      {isAdmin ? <ProfileAdmin /> : <ProfileMain />}
    </div>
  );
}
