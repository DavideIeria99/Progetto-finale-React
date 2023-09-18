import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { supabase } from "../supabase/client";
import useAuthStore from '../Zustand/authStore';
import { Link, useNavigate } from 'react-router-dom';
import Input from "../Components/UI/Input";


export default function SignIn() {
    const navigate = useNavigate();
    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

    const submit = async (values) => {
        console.log(values);
        const form = {
            email: values.email,
            password: values.password,
            confirm_password: values.confirm_password,
            options: {
                data: {
                    username: values.username,
                    first_name: values.first_name,
                    last_name: values.last_name,
                },
            },
        }
        try {
            const { data, error } = await supabase.auth.signUp(form);

            if (error) {
                console.log(error.message);
            }
            if (data.session !== null) {
                setLoggedIn(data.session);
                // navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen pt-24">
            <Formik
                initialValues={{
                    password: "",
                    confirm_password: "",
                    email: "",
                    username: "",
                    first_name: "",
                    last_name: "",
                }}
                validationSchema={Yup.object({
                    password: Yup.string().min(3, "Must be 3 characters or more"),
                    confirm_password: Yup.string()
                        .oneOf([Yup.ref("password"), null], "Passwords must match")
                        .required("Required"),
                    first_name: Yup.string()
                        .min(3, "Must be 3 characters or more")
                        .required("Required"),
                    last_name: Yup.string()
                        .min(3, "Must be 3 characters or more")
                        .required("Required"),
                    email: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                })}
                onSubmit={(values) => submit(values)}
            >
                <Form className="mx-auto flex w-4/5 flex-wrap rounded bg-slate-50 py-8 text-black shadow dark:bg-gray-900 md:w-1/3">
                    <div className="w-full text-center">
                        <h1 className="text-4xl font-bold text-black dark:text-white">
                            Register
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

                    <div className="mb-8 w-full px-2">
                        <Field component={Input} name="email" label="Email" type="email" />
                    </div>

                    <div className="mb-8 w-full px-2 md:w-1/2">
                        <Field
                            component={Input}
                            name="password"
                            label="Password"
                            type="password"
                        />
                    </div>

                    <div className="mb-8 w-full px-2 md:w-1/2">
                        <Field
                            component={Input}
                            name="confirm_password"
                            label="Confirm Password"
                            type="password"
                        />
                    </div>

                    <div className="w-full text-center">
                        <button
                            type="submit"
                            className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
                        >
                            <span className="relative rounded-md bg-white px-5 py-2.5 font-bold transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                                Register now!
                            </span>
                        </button>
                    </div>
                </Form>
            </Formik>
            <Link to="/login" className="mx-auto mt-12 block text-center text-xl">
                Già registrato ?
            </Link>
        </div>
    );
}