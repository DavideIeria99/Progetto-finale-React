import { useState } from "react";
import { supabase } from "../../supabase/client";
import { useEffect } from "react";
import BanUser from "./BanUser";

export default function ProfileAdmin() {
    const [data, setData] = useState();

    const getData = async () => {
        let { data, error } = await supabase.
            from("profiles")
            .select()
            .order("id", { ascending: true });
        console.log("data", data, error);
    }
    const header = [
        "Id",
        "Username",
        "Firstname",
        "Lastname",
        "Banned until",
        "usern",
    ];
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
        header,
        entries,
    });




    useEffect(() => {
        getData();
    }, []);



    return (
        <div>
            <p>ciao</p>
        </div>
    )
}