import { useState } from "react";
import Input from "../Components/Input";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const {
                data: { user, session },
                error,
            } = await login(email, password);

            if (error) {
                setMessage(error.message);
            }

            if (user && session) {
                navigate("/profile");
            }
        } catch (error) {
            console.log(error);
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        console.log(data, error);
    }
    return (
        <div className="mx-auto mt-24 min-h-screen lg:w-1/2">
            <p className="text-center text-2xl font-bold text-white">Login</p>
            <form action="" onSubmit={submit}>
                <Input type="email" field="email" content="insert your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" field="password" content="insert your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">submit</button>
            </form>
            {message && <p>{message}</p>}

        </div>

    )

}
