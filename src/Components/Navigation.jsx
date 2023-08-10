import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navigation() {
    return (
        <>
            <nav>
                <Link to="/" className="mx-1">Home</Link>
                <Link to="/About" className="mx-1">about</Link>
            </nav>
            <ThemeSwitcher />
        </>
    );
}