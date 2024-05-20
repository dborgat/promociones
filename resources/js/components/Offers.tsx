import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import LogoutButton from "./LogoutButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Offer {
    id: string;
    name: string;
    description: string;
    discount: number;
    title: string;
}

interface CountPromotionalCodes {
    count: number;
}

const Offers: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [message, setMessage] = useState<string>("");
    const [countPromotionalCodes, setCountPromotionalCodes] =
        useState<CountPromotionalCodes>({ count: 0 });
    const navigate = useNavigate();

    const getOffers = async () => {
        try {
            const response = await axiosInstance.get("/offers");
            setOffers(response.data);
        } catch (error: any) {
            navigate("/error");
        }
    };

    const getCountPromotionalCodes = async () => {
        try {
            const response = await axiosInstance.get(
                "/count-promotional-codes"
            );
            setCountPromotionalCodes(response.data);
        } catch (error: any) {
            navigate("/error");
        }
    };

    useEffect(() => {
        getCountPromotionalCodes();
        getOffers();
    }, [navigate]);

    const generatePromocode = async (
        offerId: string,
        offerdiscount: number,
        offertitle: string
    ) => {
        try {
            setMessage("");
            const response = await axios.post(
                `api/offers/${offerId}/generate-code`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth_token"
                        )}`,
                    },
                    data: {
                        offer_id: offerId,
                        discount: offerdiscount,
                        code: offertitle,
                    },
                }
            );
            setMessage(response.data.message);
        } catch (error: any) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-slate-700/30 rounded-xl shadow-2xl">
            <div className="grid grid-cols-3 gap-5 items-center mb-10">
                <h2 className="text-5xl font-bold uppercase tracking-widest">
                    Offers
                </h2>
                <button
                    className="backdrop-blur-xl bg-green-600/60 text-white py-2 px-4 rounded-md shadow-sm  hover:bg-green-700/60 text-xl font-bold"
                    onClick={() => navigate("/my-codes")}
                >
                    My Codes ({`${countPromotionalCodes.count}`})
                </button>
                <LogoutButton />
            </div>
            {message && (
                <div className="backdrop-blur-xl bg-green-600/60 text-center py-5 my-5 w-1/2 rounded-xl">
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
                                generatePromocode(
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
