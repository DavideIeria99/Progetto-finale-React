


import useAuthStore from "../Zustand/authStore";
import CardPrefer from "../Components/CardPrefer";


export default function PagePrefer() {
    const profile = useAuthStore((state) => state.profile);
    console.log(profile.favorites)
    return (
        <div className="pt-24">
            <h1 className="font-main  bg-[#283164] bg-gradient-to-r bg-clip-text pb-12 text-6xl font-extrabold text-transparent from-sky-600 to-sky-100">
                Lista preferiti</h1>
            {profile.favorites.length > 0 ? profile.favorites.map((game) => <CardPrefer key={game.id} game={game.game_id} />) : <CardPrefer key={profile.id} game={profile.favorites.game_id} />}
        </div >
    )
}
