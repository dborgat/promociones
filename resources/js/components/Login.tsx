import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

interface Errors {
    email?: string[];
    password?: string[];
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({});
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/login", {
                email,
                password,
            });
            localStorage.setItem("auth_token", response.data.access_token);
            navigate("/home");
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.status === 500) {
                setErrors({ email: [error.response.data.error] });
            }
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className=" backdrop-blur-xl w-1/2 bg-blue-500/30 p-5 rounded-lg shadow-2xl">
                <div className="grid grid-cols-2">
                    <h2 className="text-gray-700 text-4xl font-bold uppercase py-5">
                        Login
                    </h2>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
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
                            onChange={handleEmailChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font"
                        />
                        {errors.email && (
                            <span className="text-red-50 font-bold">
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
                            onChange={handlePasswordChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {errors.password && (
                            <span className="text-red-50 font-bold">
                                {errors.password[0]}
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full backdrop-blur-xl bg-black/30 hover:text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-500 font-bold"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
