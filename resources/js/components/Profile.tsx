// src/components/Profile.tsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

interface Promocode {
    id: number;
    title: string;
    code: string;
    discount: number;
    redeemed: boolean;
}

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [promocodes, setPromocodes] = useState<Promocode[]>([]);

    const getPromocodes = async () => {
        try {
            const response = await axiosInstance.get("/promotional-codes");
            setPromocodes(response.data);
        } catch (error: any) {
            console.log("error while fetching offers", error.response);
            navigate("/");
        }
    };

    useEffect(() => {
        getPromocodes();
    }, []);

    const redeemCode = async (promocode: string) => {
        try {
            const response = await axiosInstance.post(
                `/promotional-codes/${promocode}/redeem`
            );
            console.log(response, "response");
            getPromocodes();
        } catch (error: any) {
            console.log("error while redeeming code", error.response);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-slate-700/30 rounded-xl shadow-2xl">
            <div className="grid grid-cols-3 gap-5 items-center mb-10">
                <h2 className="text-5xl font-bold uppercase tracking-widest">
                    Profile
                </h2>
            </div>
            <div className="grid grid-cols-3 gap-5">
                {promocodes.map((promocode) => (
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
                            {promocode.redeemed ? "Used" : "Not Used"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
