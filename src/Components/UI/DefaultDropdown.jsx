'use client';

import { Avatar, Dropdown } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../Zustand/authStore';
import { supabase } from '../../supabase/client';
import { useTranslation } from 'react-i18next';
import getProfileImage from '../../Utilities/getProfileImage';

export default function DefaultDropdown() {
    const profile = useAuthStore((state) => state.profile);
    const isAdmin = useAuthStore((state) => state.isAdmin);
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
        <div className='hidden md:inline'>
            {
                profile ? <Dropdown
                    arrowIcon={false}
                    inline
                    className='px-2'
                    label={<Avatar alt="User settings" img={getProfileImage(profile.avatar_url)} rounded />} //vedere come la fatto lui
                >
                    <Dropdown.Header>
                        <span className="block font-main">
                            {profile.username}
                        </span>
                    </Dropdown.Header>
                    {isAdmin && <p>
                        banned
                    </p>}
                    <p>
                        modifica profilo
                    </p>
                    <p>
                        lista preferiti
                    </p>
                    <Dropdown.Divider />
                    <div className="font-main">
                        <button onClick={logOut}>
                            LogOut
                        </button>
                    </div>
                </Dropdown >
                    :
                    <Dropdown
                        dismissOnClick={false}
                        label="Hother"
                        color='bg-[#14496c]'
                    >
                        <div>
                            <Link to="/login" className="font-main">
                                Login
                            </Link>
                        </div>
                        <Link to="/sign-in" className="font-main">
                            {t("common.register")}
                        </Link>
                    </Dropdown>
            }
        </div>


    )
}
