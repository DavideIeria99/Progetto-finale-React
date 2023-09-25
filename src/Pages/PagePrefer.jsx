

import { motion } from "framer-motion";
import useAuthStore from "../Zustand/authStore";
import CardPrefer from "../Components/CardPrefer";


export default function PagePrefer() {
    const profile = useAuthStore((state) => state.profile);
    console.log(profile.favorites)
    return (
        <div className="pt-24">
            <h1 className="font-main  bg-[#283164] bg-gradient-to-r bg-clip-text pb-12 text-6xl font-extrabold text-transparent from-sky-600 to-sky-100">
                Lista preferiti</h1>
            <motion.div
                className="min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}>
                <div className="flex flex-wrap justify-center">
                    {profile.favorites.length > 0 ? profile.favorites.map((el) => <CardPrefer key={el.id} game={el} />) : <CardPrefer key={profile.id} game={profile.favorites.game_id} />}
                </div>
            </motion.div>
        </div >
    )
}
