'use client';

import { Dropdown } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../Zustand/authStore';
import { supabase } from '../../supabase/client';
import { useTranslation } from 'react-i18next';

export default function DefaultDropdown() {
    const profile = useAuthStore((state) => state.profile);
    const setLoggedOut = useAuthStore((state) => state.setLoggedOut);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const logOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setLoggedOut();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Dropdown
            dismissOnClick={false}
            label="Hother"
        >
            <div>
                <Link to="/login" className="font-main">
                    Login
                </Link>
            </div>
            <Link to="/sign-in" className="font-main">
                {t("common.register")}
            </Link>
            {profile && (
                <>
                    <Link to="/profile">
                        {profile.username}
                    </Link>
                    <div>
                        <button onClick={logOut}>
                            LogOut
                        </button>
                    </div>
                </>
            )}
        </Dropdown>
    )
}


