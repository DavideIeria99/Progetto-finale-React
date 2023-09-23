

export default function StoresList({ stores, searchParams, setSearchParams }) {
  const handleChange = (id) => {
    const allParams = Object.fromEntries([...searchParams]);

    setSearchParams({
      ...allParams,
      stores: id,
    });
  };


  return (
    <>

      <div className="">
        {stores.map((el) => (
          <p
            onClick={() => handleChange(el.id)}
            key={el.id}
            className={
              "cursor-pointer " +
              (searchParams.get("stores") == el.id
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
