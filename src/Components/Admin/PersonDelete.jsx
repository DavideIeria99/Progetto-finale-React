import { supabase } from "../../supabase/client";

export default function BanUser({ user, getData }) {

  const toggleDelete = async (prev) => {

    const { data: meta } = await supabase.rpc("get_claims", {
      uid: user,
    });

    if (meta.claims_admin) {
      alert("Non puoi cancellare un admin");
      return;
    }
    const { data, error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", prev)

    if (error) {
      console.log(error)
    }
    console.log(data);
    getData();
  };

  return (
    <div className="flex items-center justify-between">
      <button
        className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        onClick={() => toggleDelete(user)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" text-gray-800 dark:text-white"
          width="16"
          height="16"
          aria-hidden="true"
          fill="currentColor" viewBox="0 0 18 20">
          <path
            d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
        </svg>
      </button>
    </div>
  );
}
