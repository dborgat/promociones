import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
    const {
        isUserLoggedIn,
        setIsUserLoggedIn,
        user,
        getUserName,
        getCountPromotionalCodes,
    } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            setIsUserLoggedIn(true);
            getUserName();
            getCountPromotionalCodes();
        } else {
            setIsUserLoggedIn(false);
        }
    }, [setIsUserLoggedIn, getUserName, getCountPromotionalCodes]);

    return (
        <div className="h-screen text-center content-center grid gap-10 justify-items-center">
            <h1 className="text-6xl font-bold">Welcome to Offers App</h1>
            {isUserLoggedIn ? (
                <div className="grid grid-cols-3 gap-3">
                    <div className="backdrop-blur-xl bg-green-200 p-5 rounded-xl space-y-6">
                        <h2 className="text-2xl font-bold">
                            Welcome {user.name}
                        </h2>
                        <h3 className="text-lg font-bold">{user.email}</h3>
                        <LogoutButton />
                    </div>
                    <div className="backdrop-blur-xl bg-violet-400 p-5 rounded-xl grid content-between">
                        <h2 className="text-2xl font-bold">Offers</h2>
                        <h1>
                            Get all{" "}
                            <Link to="/offers">
                                <span className="bg-black/30 px-3 py-1 text-white rounded-md hover:bg-violet-700">
                                    Offers
                                </span>{" "}
                            </Link>
                            there are available for you!
                        </h1>
                        <Link
                            to="/offers"
                            className="backdrop-blur-xl bg-black/30 text-white py-2 px-4 rounded-md shadow-sm text-xl hover:bg-violet-700"
                        >
                            View Offers
                        </Link>
                    </div>
                    <div className="backdrop-blur-xl bg-green-400 p-5 rounded-xl grid content-between">
                        <h1 className="text-2xl font-bold">My Codes</h1>
                        <h1>
                            Go to the{" "}
                            <Link to="/my-codes">
                                <span className="bg-black/30 px-3 py-1 text-white rounded-md hover:bg-green-950">
                                    My Codes
                                </span>{" "}
                            </Link>
                            page to view your promotional codes
                        </h1>

                        <Link
                            to="/my-codes"
                            className="backdrop-blur-xl bg-black/30 text-white py-2 px-4 rounded-md shadow-sm text-xl hover:bg-green-950"
                        >
                            View My Codes ({user.count})
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="backdrop-blur-xl bg-green-200/50 p-5 rounded-xl grid grid-row gap-5 w-2/3">
                    <div>
                        <p className="text-lg font-bold">
                            Please log in to view the offers
                        </p>
                        <Link
                            to="/login"
                            className="block bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600"
                        >
                            Log In
                        </Link>
                    </div>
                    <div>
                        <p className="text-lg font-bold">
                            Don't have an account? Register now!
                        </p>
                        <Link
                            to="/"
                            className="block bg-lime-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-lime-600"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
