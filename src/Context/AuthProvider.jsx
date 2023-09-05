import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    //per verificare il login
    const login = (email, password) =>
        supabase.auth.signInWithPassword({ email, password });

    //per uscire dal login
    const signOut = () => supabase.auth.signOut();
    //gestisce  la sessione e ogni problema 
    useEffect(() => {
        const getUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session) {
                const { user } = session;
                console.log(user);
                setUser(() => user);
            }
        };
        getUser()

        const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
            switch (event) {
                case "PASSWORD_RECOVERY":
                    break;
                case "USER_UPDATED":
                    console.log("UPDATE USER ==> ", user);
                    setUser(() => session.user);
                    break;
                case "SIGNED_IN":
                    console.log("SIGN IN USER ==> ", user);
                    setUser(() => session.user);
                    break;
                case "SIGNED_OUT":
                    console.log("BYE");
                    setUser(() => null);
                    break;
                default:
                    console.log(event);
                    break;
            }
        });

        return () => {
            data.subscription.unsubscribe();
        };
    }, [])

    return (
        <AuthContext.Provider value={{ user, login, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;