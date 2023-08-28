import { Link } from "react-router-dom";

export default function GenresList({ genres, genre }) {
    return genres.map((el) => (

        <Link to={`/search/${el.slug}`} className={el.slug === genre ? "font-bold tracking-widest border-b-2  border-accent" : ""} key={el.id}>
            {el.name}
        </Link>
    ));
}
