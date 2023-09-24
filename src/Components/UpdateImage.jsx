import { useEffect, useState } from "react";
import useAuthStore from "../Zustand/authStore";
import { supabase } from "../supabase/client";
import { motion } from "framer-motion";
import getProfileImage from "../Utilities/getProfileImage";

export default function UpdateImage() {
  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);
  const [preview, setPreview] = useState();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState();
  // controlla se ce il file
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFile = (e) => {
    if (!e.target.files) {
      setFile(() => null);
      return;
    }
    setFile(() => e.target.files[0]);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      if (!file) {
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.username}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      //aggiorni avatar
      let { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);
      console.log(uploadData);
      if (uploadError) {
        throw uploadError;
      }

      const updates = {
        id: profile.id,
        avatar_url: filePath,
        updated_at: new Date(),
      };
      // aggiorni il profile
      let { data, error } = await supabase
        .from("profiles")
        .upsert(updates)
        .select()
        .single();

      setProfile(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
      setFile(() => null);
      setPreview(() => null);
    }
  };

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}>
      <div className=" mx-auto w-2/5 rounded-md bg-slate-500">
        <h2 className="text-center text-lg font-bold">
          {uploading ? "uploading" : "Upload"}
        </h2>

        {/* l'immagine presente */}
        <div className="flex justify-around">
          <div className="w-2/5">
            <h3>immagine profile</h3>
            {profile && (
              <img
                className="mx-1 w-full  rounded-sm "
                src={getProfileImage(profile.avatar_url)}
                alt="Avatars"
              />
            )}
          </div>
          <div className="w-2/5">
            <h3>preview</h3>
            {preview && (
              <img className="mx-1 w-full  rounded-sm " src={preview} />
            )}
          </div>
        </div>

        {/* form per uploadare l'immagine */}
        <div>
          <form onSubmit={submit}>
            {uploading ? "Uploadind" : "Upload"}
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleFile}
            />
            <button
              className="mb-2 rounded-full bg-green-700 px-2 text-center"
              type="submit"
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
