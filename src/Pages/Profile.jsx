import { useAuth } from "../Context/AuthProvider";
import ProfileAdmin from "../Components/ProfileAdmin";
import ProfileMain from "../Components/ProfileMain";
import useProfile from "../Utilities/useProfile";
import UpdateImage from "../Components/UpdateImage";

export default function Profile() {
    const { user } = useAuth();
    const profile = useProfile()
    console.log(user);
    return (
        <div className="h-screen">
            <h1>benvenuto {profile && profile.first_name
            } </h1>
            {user.app_metadata.claims_admin ? <ProfileAdmin /> : <ProfileMain />}

            <button className="bg-green"></button>
            <UpdateImage />
        </div>
    )
}