import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

const Offers: React.FC = () => {
    const { offers, getOffers, countPromotionalCodes, generatePromocode } =
        useAuth();
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        getOffers();
    }, [getOffers]);

    const handleGeneratePromocode = async (
        offerId: string,
        offerdiscount: number,
        offertitle: string
    ) => {
        setMessage("");
        await generatePromocode(offerId, offerdiscount, offertitle);
        setMessage("Promocode generated successfully");
    };

    return (
        <div className="h-screen container mx-auto px-4 py-8 bg-slate-700/30 rounded-xl shadow-2xl">
            <div className="grid grid-cols-4 gap-5 items-center mb-10">
                <h2 className="text-5xl font-bold uppercase tracking-widest">
                    Offers
                </h2>
                <button
                    className="backdrop-blur-xl bg-green-600/60 text-white py-2 px-4 rounded-md shadow-sm  hover:bg-green-700/60 text-xl font-bold"
                    onClick={() => navigate("/my-codes")}
                >
                    My Codes ({countPromotionalCodes})
                </button>
                <button
                    className="backdrop-blur-xl bg-red-600/60 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700/60 text-xl font-bold"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>
                <LogoutButton />
            </div>
            {message && (
                <div className="backdrop-blur-xl bg-green-600/60 text-center py-5 my-5 rounded-xl">
                    <p className="text-white font-semibold text-4xl">
                        {message}
                    </p>
                </div>
            )}
            <div className="grid grid-cols-3 gap-5">
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className="backdrop-blur-xl bg-slate-200/30 shadow-md rounded-lg p-4 content-center"
                    >
                        <h1 className="text-2xl font-bold text-slate-900">
                            <span className="font-bold text-4xl text-red-700">
                                {offer.discount}% off{" "}
                            </span>
                            on {offer.title}
                        </h1>
                        <button
                            onClick={() =>
                                handleGeneratePromocode(
                                    offer.id,
                                    offer.discount,
                                    offer.title
                                )
                            }
                            className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700"
                        >
                            Get Promocode
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Offers;
