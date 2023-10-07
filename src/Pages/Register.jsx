import { useState } from "react";
import { supabase } from "../supabase/client";
import Input from "../Components/InputFake";
import TitleName from "../Utilities/TitleName";
import useAuthStore from "../Zustand/authStore";

export default function Register() {
  const profile = useAuthStore((state) => state.profile)
  const [form, setForm] = useState({
    data: {
      username: "",
      first_name: "",
      last_name: "",
    },
  });
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update()
        .eq('id', profile.id)
        .select()

      if (error) {
        setMessage(error.message);
      }
      console.log(data);
      console.log(profile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto pt-24 min-h-screen lg:w-1/2">
      <TitleName title={"Register"} />
      <p className="text-center text-2xl font-bold text-white">update</p>
      <form onSubmit={submit}>
        <Input
          type="text"
          field="username"
          content="Choose your username"
          value={form.data.username}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              data: { ...prev.data, username: e.target.value },
            }))
          }
        />
        <Input
          type="text"
          field="first_name"
          content="Choose your first name"
          value={form.data.first_name}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,

              data: { ...prev.data, first_name: e.target.value },

            }))
          }
        />
        <Input
          type="text"
          field="last_name"
          content="Choose your last name"
          value={form.data.last_name}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,

              data: { ...prev.data, last_name: e.target.value },

            }))
          }
        />

        <button type="submit">update</button>
      </form>
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
}
