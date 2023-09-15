import ProfileAdmin from "../Components/Admin/ProfileAdmin";
import ProfileMain from "../Components/ProfileMain";
import UpdateImage from "../Components/UpdateImage";
import useAuthStore from "../store/authStore";

export default function Profile() {
    const isAdmin = useAuthStore((state) => state.isAdmin)
    const profile = useAuthStore((state) => state.profile)
    console.log(isAdmin);
    return (
        <div className="h-screen">
            <h1>benvenuto {profile && profile.first_name
            } </h1>
            {isAdmin ? <ProfileAdmin /> : <ProfileMain />}

            <button className="bg-green"></button>
            <UpdateImage />
        </div>
    )
}