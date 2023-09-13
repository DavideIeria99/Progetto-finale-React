
import { useEffect, useState } from "react"
import { supabase } from "../supabase/client";
import getProfileImage from "../Utilities/getProfileImage";
import Input from "../Components/Input";
import useAuthStore from "../store/authStore";

export default function UpdateImage() {
    const profile = useAuthStore((state) => state.profle);
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
    }, [file])

    const handleFile = (e) => {
        if (!e.target.files) {
            setFile(() => null);
            return;
        }
        setFile(() => e.target.files[0])
    };

    const submit = async (e) => {
        e.preventDefault();

        setUploading(() => true);
        // nome file
        const fileName = `${profile.id}`;

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

        // update user
        const { errorUser } = await supabase.auth.updateUser({
            id: profile.id,
            updated_at,
        });

        if (error || errorUser) {
            console.log(error, errorUser);
        } else {
            setUploading(() => false);
            setFile(() => null);
            setPreview(() => null);
        }
    };

    return (
        <div className=" w-2/5 mx-auto bg-slate-500 rounded-md">
            <h2 className="text-center font-bold text-lg">{uploading ? "uploading" : "Upload"}</h2>

            {/* l'immagine presente */}
            <div className="flex justify-around">
                <div className="w-2/5">
                    <h3>immagine profile</h3>
                    {profile && <img className="w-full mx-1  rounded-sm " src={getProfileImage(profile.avatar_url)} alt="Avatars" />}
                </div>
                <div className="w-2/5">
                    <h3>preview</h3>
                    {preview && <img className="w-full mx-1  rounded-sm " src={preview} />}
                </div>

            </div >

            {/* form per uploadare l'immagine */}
            <div>
                <form onSubmit={submit} >
                    <Input type="file" accept="image/*" disabled={uploading} onChange={handleFile} />
                    <button className="rounded-full bg-green-700 px-2 mb-2 text-center" type="submit">submit</button>
                </form>
            </div>
        </div>

    )
}