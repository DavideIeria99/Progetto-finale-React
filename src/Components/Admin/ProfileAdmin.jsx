import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import BanUser from "./BanUser";
import Table from "../UI/Table";
import Button from "../UI/Button";
export default function Profiles() {
  const [data, setData] = useState();

  const [page, setPage] = useState(0);

  const getData = async () => {
    let { data, error } = await supabase
      .from("profiles")
      .select()
      .range(5 * page, page * 5 + 5)
      .order("id", { ascending: true });
    console.log("data", data, error);

    const headers = ["Id", "Username", "Firstname", "Lastname", "Banned until"];

    const entries = data.map((el) => [
      el.id,
      el.username,
      el.first_name,
      el.last_name,
      <BanUser
        key={el.id}
        user={el.id}
        banned={el.banned_until}
        getData={getData}
      />,
    ]);

    setData({
      headers,
      entries,
    });
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div>
      <h1 className="font-main  bg-[#283164] bg-gradient-to-r bg-clip-text pb-12 text-6xl font-extrabold text-transparent from-sky-600 dark:to-sky-100 to-sky-800">lista profili</h1>
      {data ? (
        <div className="relative overflow-x-auto ">
          <div className="shadow-md sm:rounded-lg">
            <Table headers={data.headers} entries={data.entries} />
          </div>
          <div className="my-10 flex justify-center">
            <div className="mx-1">
              {page > 0 && (
                <Button
                  type="button"
                  onClick={() => setPage((prev) => prev - 1)}
                  label="Prev"
                />
              )}
            </div>
            <div className="font-bold font-main my-2">
              {page}
            </div>

            <div className="mx-1">
              <Button
                type="button"
                onClick={() => setPage((prev) => prev + 1)}
                label="Next"
              />
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
