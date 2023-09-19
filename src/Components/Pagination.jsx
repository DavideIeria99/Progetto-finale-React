import { Link } from "react-router-dom";

export default function Pagination({ genre, num }) {
  return (
    <div className="flex justify-center">
      {num > 1 && (
        <Link
          to={`/search/${genre}/${+num - 1}`}
          className="text-slate-800 dark:text-white"
        >
          prev
        </Link>
      )}
      <div className="w-48 text-center">{num}</div>
      <Link
        to={`/search/${genre}/${+num + 1}`}
        className="text-slate-800 dark:text-white"
      >
        next
      </Link>
    </div>
  );
}
