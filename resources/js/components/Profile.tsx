// src/components/Profile.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile: React.FC = () => {
    const { promocodes, getPromocodes, redeemCode } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getPromocodes();
    }, [getPromocodes]);

    return (
        <div className="h-screen container mx-auto px-4 py-8 bg-slate-700/30 rounded-xl shadow-2xl">
            <div className="grid grid-cols-2 gap-5 items-center mb-10">
                <h2 className="text-5xl font-bold uppercase tracking-widest">
                    Profile
                </h2>
                <button
                    className="backdrop-blur-xl bg-red-600/60 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700/60 text-xl font-bold w-1/2 justify-self-end"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>
            </div>
            <div className="grid gap-5">
                <h1 className="text-2xl font-bold text-slate-900">
                    Use Promocodes:{" "}
                    {
                        promocodes.filter((promocodes) => promocodes.redeemed)
                            .length
                    }
                </h1>
                <div className="grid grid-cols-3 gap-5">
                    {promocodes
                        .filter((promocodes) => promocodes.redeemed)
                        .map((promocode) => (
                            <div
                                key={promocode.code}
                                className="backdrop-blur-xl bg-slate-200/30 shadow-md rounded-lg p-4 content-center"
                            >
                                <h1 className="text-2xl font-bold text-slate-900">
                                    <span className="font-bold text-4xl text-red-700">
                                        {promocode.discount}% off{" "}
                                    </span>
                                    on {promocode.title}
                                </h1>
                                <button
                                    disabled
                                    className={`mt-2 ${
                                        promocode.redeemed
                                            ? "bg-slate-400"
                                            : "bg-green-600"
                                    } text-white py-2 px-4 rounded-md shadow-sm`}
                                >
                                    {promocode.redeemed && "Changed"}
                                </button>
                            </div>
                        ))}
                </div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Available Promocodes:{" "}
                    {
                        promocodes.filter((promocodes) => !promocodes.redeemed)
                            .length
                    }
                </h1>
                <div className="grid grid-cols-3 gap-5">
                    {promocodes
                        .filter((promocodes) => !promocodes.redeemed)
                        .map((promocode) => (
                            <div
                                key={promocode.code}
                                className="backdrop-blur-xl bg-slate-200/30 shadow-md rounded-lg p-4 content-center"
                            >
                                <h1 className="text-2xl font-bold text-slate-900">
                                    <span className="font-bold text-4xl text-red-700">
                                        {promocode.discount}% off{" "}
                                    </span>
                                    on {promocode.title}
                                </h1>
                                <button
                                    onClick={() => redeemCode(promocode.code)}
                                    className={`mt-2 ${
                                        promocode.redeemed
                                            ? "bg-indigo-600"
                                            : "bg-green-600"
                                    } text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700`}
                                >
                                    {!promocode.redeemed && "Not Used"}
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
