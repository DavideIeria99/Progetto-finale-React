import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import getProfileImage from "../Utilities/getProfileImage";
import Input from "../Components/InputFake";
import useAuthStore from "../Zustand/authStore";

export default function UpdateImage() {
  const profile = useAuthStore((state) => state.profile);
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

    setUploading(() => true);
    // nome file
    const fileName = `${profile.id + Math.random()}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    // update profile
    const updated_at = new Date();
    const { error } = await supabase.from("profiles").upsert({
      id: profile.id,
      updated_at,
      avatar_url: fileName,
    });

    if (error) {
      console.log(error);
    } else {
      setUploading(() => false);
      setFile(() => null);
      setPreview(() => null);
    }
  };

  return (
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
          <Input
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
  );
}
