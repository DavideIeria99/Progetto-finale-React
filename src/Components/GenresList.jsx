import { useTranslation } from "react-i18next";

export default function GenresList({ genres, searchParams, setSearchParams }) {
  const handleChange = (slug) => {
    const allParams = Object.fromEntries([...searchParams]);

    setSearchParams({
      ...allParams,
      genres: slug,
    });
  };
  const { t } = useTranslation();
  return (
    <>
      <p className="mb-4 text-xl">{t("search.genres")}</p>
      <div className="">
        {genres.map((el) => (
          <p
            onClick={() => handleChange(el.slug)}
            key={el.id}
            className={
              "cursor-pointer " +
              (searchParams.get("genres") === el.slug
                ? "border-b-2 border-accent font-bold tracking-widest"
                : "")
            }
          >
            {el.name}
          </p>
        ))}
      </div>
    </>
  );
}
