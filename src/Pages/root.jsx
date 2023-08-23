import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation";
import Footer from "../Components/footer";
import { HelmetProvider } from "react-helmet-async";

export default function Root() {
    return (
        <HelmetProvider>
            <div className="min-h-screen text-slate-800 bg-main-light antialiased dark:text-slate-200 dark:bg-main-dark">
                <Navigation />
                <Outlet />
                <Footer />
            </div>
        </HelmetProvider>
    );
}