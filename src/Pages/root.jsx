import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation";
import Footer from "../Components/footer";
import Authentication from "../Components/Authentication";

export default function Root() {
    return (
        <Authentication>
            <div className=" bg-main-light dark:bg-main-dark min-h-screen text-slate-800 antialiased dark:text-slate-200">
                <Navigation />
                <div className="pt-24">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </Authentication>
    );
}
