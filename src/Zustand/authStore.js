import { create } from "zustand";
import { supabase } from "../supabase/client";

const initialState = {
  session: null,
  profile: null,
  isLoggedIn: false,
  isAdmin: false,
};

const useAuthStore = create((set) => ({
  ...initialState,
  setLoggedIn: async (session) => {
    const { data } = await supabase
      .from("profiles")
      .select(
        `
        *,
        favorites: favorites(*)
      `,
      )
      .eq("id", session.user.id)
      .single();

    if (data.banned_until) return;
    // rimandare ad una pagina informativa per l'utente, dove si comunica che è stato bannato fino al xx-xx-xxxx (e magari ci fate anche un countdown)

    // come con uno stato "normale" di react, non possiamo modificare lo stato, perché non si accorgerebbe delle modifiche (un oggetto è passato per riferimento). Quind, quando SETTIAMO il nuovo stato dobbiamo settare un nuovo oggetto
    set((state) => ({
      ...state,
      session: session,
      profile: data,
      isLoggedIn: true,
      isAdmin: session.user.app_metadata.claims_admin,
    }));
  },
  setProfile: async (profile) =>
    set((state) => ({
      ...state,
      profile,
    })),
  setLoggedOut: () =>
    set(() => ({
      ...initialState,
    })),
}));

export default useAuthStore;
