// src/components/Home.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Home: React.FC = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            setIsUserLoggedIn(true);
        }
    }, []);

    return (
        <div className="h-screen text-center content-center grid gap-10">
            <h1 className="text-6xl font-bold">Welcome to Offers App</h1>
            <span className="text-4xl">
                {isUserLoggedIn
                    ? "You are logged in! Click on the links below to navigate."
                    : "You are not logged in! Please log in to continue."}
            </span>
            <div className="flex justify-center items-center">
                <Link
                    to="/login"
                    className="block bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 w-80"
                >
                    Log In
                </Link>
            </div>

            {/* <div className="flex justify-between items-center mb-4">
                <LogoutButton />
            </div>
            <div className="space-y-4">
                <p className="text-lg">Choose an option below:</p>
                <Link
                    to="/offers"
                    className="block bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
                >
                    View Offers
                </Link>
                <Link
                    to="/register"
                    className="block bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700"
                >
                    Register
                </Link>
                <Link
                    to="/my-codes"
                    className="block bg-yellow-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-yellow-700"
                >
                    View Profile
                </Link>
            </div> */}
        </div>
    );
};

export default Home;
