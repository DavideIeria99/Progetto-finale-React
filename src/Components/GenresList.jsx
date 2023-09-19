import { Link } from "react-router-dom";

export default function GenresList({ genres, genre }) {
  return genres.map((el) => (
    <Link
      to={`/search/${el.slug}`}
      className={
        el.slug === genre
          ? "border-b-2 border-accent font-bold  tracking-widest"
          : ""
      }
      key={el.id}
    >
      {el.name}
    </Link>
  ));
}
