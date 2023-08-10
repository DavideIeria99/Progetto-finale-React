import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation";
import Footer from "../Components/footer";

export default function Root() {
    return (
        <div className="min-h-screen   text-slate-800 bg-main-light antialiased dark:text-slate-200 dark:bg-main-dark">
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    );
}