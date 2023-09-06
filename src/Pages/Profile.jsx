import useProfile from "../Utilities/useProfile"
import { useAuth } from "../Context/AuthProvider";
import ProfileAdmin from "../Components/ProfileAdmin";
import ProfileMain from "../Components/ProfileMain";

export default function Profile() {
    const { user } = useAuth();
    const profile = useProfile();
    console.log(profile);
    return (
        <div>
            <h1>benvenuto{profile.first_name}</h1>

            {/* {user.app_metadata.claims_admin ? <ProfileAdmin /> : <ProfileMain />} */}
        </div>
    )
}