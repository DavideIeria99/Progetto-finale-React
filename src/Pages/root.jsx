import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation";
import Footer from "../Components/footer";

export default function Root() {
    return (
        <div className="min-h-screen  antialiased text-slate-800 bg-white dark:text-slate-200 dark:bg-slate-900">
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    );
}