import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Errors {
    name?: string[];
    email?: string[];
    password?: string[];
    password_confirmation?: string[];
}

const Register: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] =
        useState<string>("");
    const [errors, setErrors] = useState<Errors>({});
    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            localStorage.setItem("auth_token", response.data.access_token);
            navigate("/");
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const handleChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
        };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="text-center backdrop-blur-xl bg-blue-500/30 p-5 rounded-lg shadow-2xl">
                <h2 className="text-gray-700 text-4xl font-bold uppercase py-5 text-center ">
                    Register
                </h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-bold text-gray-700 text-left"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleChange(setName)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">
                                {errors.name[0]}
                            </span>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-bold text-gray-700 text-left"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleChange(setEmail)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">
                                {errors.email[0]}
                            </span>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-bold text-gray-700 text-left"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleChange(setPassword)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password[0]}
                            </span>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm font-bold text-gray-700 text-left"
                        >
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            value={passwordConfirmation}
                            onChange={handleChange(setPasswordConfirmation)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {errors.password_confirmation && (
                            <span className="text-red-500 text-sm">
                                {errors.password_confirmation[0]}
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full backdrop-blur-xl bg-black/30 py-2 px-4 rounded-md shadow-sm hover:bg-lime-500 font-bold"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
