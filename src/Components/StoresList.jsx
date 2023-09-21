import { useTranslation } from "react-i18next";

export default function StoresList({ stores, searchParams, setSearchParams }) {
  const handleChange = (id) => {
    const allParams = Object.fromEntries([...searchParams]);

    setSearchParams({
      ...allParams,
      stores: id,
    });
  };

  const { t } = useTranslation();
  return (
    <>
      <p className="mb-4 text-xl">{t("search.stores")}</p>
      <div className="h-72 overflow-y-scroll">
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
