import { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import Input from "../Components/InputFake";
import TitleName from "../Utilities/TitleName";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
    options: {
      data: {
        username: "",
        first_name: "",
        last_name: "",
      },
    },
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp(form);

      if (error) {
        setMessage(error.message);
      }
      if (data.session !== null) {
        console.log(data);
        console.log("Ok, now login");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto mt-24 min-h-screen lg:w-1/2">
      <TitleName title={"Register"} />
      <p className="text-center text-2xl font-bold text-white">Register</p>
      <form onSubmit={submit}>
        <Input
          type="email"
          field="email"
          content="Insert your email here"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <Input
          type="password"
          field="password"
          content="Insert your password here"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <Input
          type="password"
          field="confirm_password"
          content="Confirm your password"
          value={form.confirm_password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, confirm_password: e.target.value }))
          }
        />
        <Input
          type="text"
          field="username"
          content="Choose your username"
          value={form.options.data.username}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              options: {
                data: { ...prev.options.data, username: e.target.value },
              },
            }))
          }
        />
        <Input
          type="text"
          field="first_name"
          content="Choose your first name"
          value={form.options.data.first_name}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              options: {
                data: { ...prev.options.data, first_name: e.target.value },
              },
            }))
          }
        />
        <Input
          type="text"
          field="last_name"
          content="Choose your last name"
          value={form.options.data.last_name}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              options: {
                data: { ...prev.options.data, last_name: e.target.value },
              },
            }))
          }
        />

        <button type="submit">register</button>
      </form>
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
}
