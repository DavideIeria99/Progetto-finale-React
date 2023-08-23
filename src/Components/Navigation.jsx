import { Link } from "react-router-dom";
import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { ReactComponent as Bars } from "../assets/icons/Bars.svg";
import { ReactComponent as User } from "../assets/icons/user.svg";


export default function Navigation() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <nav className="fixed z-30 flex h-12 w-screen items-center bg-gradient-to-r from-[#14496c] from-20% via-[#14496cb3] via-90% to-[#14496cb3] px-2 after:absolute after:bottom-[-1px] after:left-[77px] after:h-[1px] after:w-full after:bg-cyan-400 after:content-['']">
                <div
                    className={
                        "after:border-r-6 fixed left-0 top-[19px] z-[-1] h-[44px] w-[60px] border-b-2 border-cyan-400 bg-[#14496c] before:absolute before:bottom-[1px] before:right-[-8px] before:z-[0] before:h-[14px] before:w-[18px] before:skew-x-[-50deg] before:bg-[#14496c] before:content-[''] after:absolute after:bottom-[-2px] after:right-[-10px] after:h-[15px] after:w-[6px] after:skew-x-[-50deg] after:animate-flash after:bg-white  after:content-['']"
                    }
                ></div>
                <div className="flex w-2/3 justify-between text-white md:w-1/2">
                    <Link to="/" className="font-main font-bold tracking-widest ">
                        Home
                    </Link>
                    <Link to="/about-us" className="font-main hidden md:inline ">
                        About
                    </Link>
                    <Link to="/" className="font-main hidden md:inline ">
                        Search
                    </Link>
                    <Link to="/" className="font-main hidden md:inline ">
                        home
                    </Link>
                </div>
                <div className="flex w-1/2 items-center me-10 justify-end text-white">
                    <ThemeSwitcher />
                    <Link to="/login" className="ms-4">
                        <User />
                    </Link>
                    <button onClick={() => setOpen(!open)} className="ml-4 md:hidden">
                        <Bars />
                    </button>
                </div>
            </nav>
            <nav
                className={
                    "fixed right-0 z-20 h-screen w-full overflow-y-auto bg-gray-300 bg-opacity-80 p-4 pt-20 backdrop-blur-sm  transition-transform dark:bg-sky-900 dark:bg-opacity-80 " +
                    (open ? "" : "translate-x-full")
                }>
                <div className="flex flex-col">
                    <Link to="/" className="font-main py-12 font-bold tracking-widest ">
                        Home
                    </Link>
                    <Link to="/about-us" className="font-main py-12 ">
                        About
                    </Link>
                    <Link to="/" className="font-main py-12 ">
                        Search
                    </Link>
                    <Link to="/" className="font-main py-12 ">
                        home
                    </Link>
                </div>
            </nav>
        </>
    );
}