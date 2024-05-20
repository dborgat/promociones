// src/services/authService.ts
import axiosInstance from "./api/axiosInstance";
import axios from "axios";

interface User {
    name: string;
    email: string;
    count: number;
}

interface Promocode {
    id: number;
    title: string;
    code: string;
    discount: number;
    redeemed: boolean;
}

interface Offer {
    id: string;
    name: string;
    description: string;
    discount: number;
    title: string;
}

export const getUserName = async (): Promise<User> => {
    const response = await axiosInstance.get("/user");
    return {
        name: response.data.name,
        email: response.data.email,
        count: 0,
    };
};

export const getCountPromotionalCodes = async (): Promise<number> => {
    const response = await axiosInstance.get("/count-promotional-codes");
    return response.data.count;
};

export const getPromocodes = async (): Promise<Promocode[]> => {
    const response = await axiosInstance.get("/promotional-codes");
    return response.data;
};

export const redeemCode = async (promocode: string): Promise<void> => {
    await axiosInstance.post(`/promotional-codes/${promocode}/redeem`);
};

export const getOffers = async (): Promise<Offer[]> => {
    const response = await axiosInstance.get("/offers");
    return response.data;
};

export const generatePromocode = async (
    offerId: string,
    offerdiscount: number,
    offertitle: string
): Promise<void> => {
    await axios.post(`api/offers/${offerId}/generate-code`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        data: {
            offer_id: offerId,
            discount: offerdiscount,
            code: offertitle,
        },
    });
};
