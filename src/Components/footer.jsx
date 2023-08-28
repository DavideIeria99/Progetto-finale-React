import { Link } from "react-router-dom";

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
   <div className="flex">
    <span className="mx-4 cursor-pointer font-bold">EN</span>
    <span className="mx-4 cursor-pointer">IT</span>
   </div>
  </footer>
 );
}
