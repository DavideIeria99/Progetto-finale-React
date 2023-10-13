import { Formik, Field, Form } from "formik";
import { supabase } from "../supabase/client";
import useAuthStore from "../Zustand/authStore";
import * as Yup from "yup";
import Input from "../Components/UI/Input";
import Button from "../Components/UI/Button";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
    const profile = useAuthStore((state) => state.profile);
    const setProfile = useAuthStore((state) => state.setProfile);

    const navigate = useNavigate()


    const submit = async (values) => {
        const update = {
            username: values.username,
            first_name: values.first_name,
            last_name: values.last_name,
        };

        try {
            // aggiorni il profile
            const { data, error } = await supabase
                .from('profiles')
                .update(update)
                .eq('id', profile.id)
                .select()
            if (data) {
                console.log(data);
                navigate('/')
            }
            if (error) {
                console.log(error.message);
            }
            const updates = {
                id: profile.id,
                updated_at: new Date(),
            };
            // aggiorni il profile
            let { data: uploadData, error: uploadError } = await supabase
                .from("profiles")
                .upsert(updates)
                .select()
                .single();

            if (uploadError) {
                console.log(uploadError);
            }
            setProfile(uploadData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen pt-24">
            {
                profile &&
                <Formik
                    initialValues={{
                        username: `${profile.username}`,
                        first_name: `${profile.first_name}`,
                        last_name: `${profile.last_name}`,
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .min(3, "Must be 3 characters or more"),
                        first_name: Yup.string()
                            .min(3, "Must be 3 characters or more"),
                        last_name: Yup.string()
                            .min(3, "Must be 3 characters or more"),
                    })}
                    onSubmit={(values) => submit(values)}
                >
                    <Form className="mx-auto flex w-4/5 flex-wrap rounded bg-slate-50 py-8 text-black shadow dark:bg-gray-900 md:w-1/3">
                        <div className="w-full text-center">
                            <h1 className="text-4xl font-bold text-black dark:text-white">
                                Update
                            </h1>
                        </div>
                        <div className="mb-8 w-full px-2">
                            <Field
                                name="first_name"
                                component={Input}
                                label="First Name"
                                type="text"
                            />
                        </div>

                        <div className="mb-8 w-full px-2 md:w-1/2">
                            <Field
                                component={Input}
                                name="last_name"
                                label="Last Name"
                                type="text"
                            />
                        </div>

                        <div className="mb-8 w-full px-2 md:w-1/2">
                            <Field
                                component={Input}
                                name="username"
                                label="Username"
                                type="text"
                            />
                        </div>
                        <div className="w-full text-center">
                            <Button type="submit" label="update" />
                        </div>
                    </Form>
                </Formik>
            }

        </div>
    )
}
