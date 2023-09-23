

export default function GenresList({ genres, searchParams, setSearchParams }) {
  const handleChange = (slug) => {
    const allParams = Object.fromEntries([...searchParams]);

    setSearchParams({
      ...allParams,
      genres: slug,
    });
  };

  return (
    <>

      <div className="overflow-y-scroll h-32">
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
