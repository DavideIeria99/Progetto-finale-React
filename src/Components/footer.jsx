import { Link } from "react-router-dom";
import LanguageSwitcher from "./Switchers/LanguageSwitcher";

export default function Footer() {
    return (
        <footer className=" flex w-full justify-between border-t border-accent bg-gradient-to-r from-[#14496c] to-[#103954cc] p-4 text-white">
            <ul className="flex items-center">
                <Link className="mr-4 md:mr-12" to="/about-us">
                    About
                </Link>
                <Link className="mr-4 md:mr-12" to="/fake">
                    Privacy
                </Link>
                <Link className="mr-4 md:mr-12" to="/fake">
                    Contact
                </Link>
                <Link className="mr-4 md:mr-12" to="/fake">
                    Stack
                </Link>
            </ul>

            <LanguageSwitcher />
        </footer>
    );
}
