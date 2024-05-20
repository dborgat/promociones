// src/components/LogoutButton.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axiosInstance.post("/logout");
        localStorage.removeItem("auth_token");
        navigate("/");
    };

    return (
        <button
            onClick={handleLogout}
            className="backdrop-blur-xl bg-black/30 text-white py-2 px-4 rounded-md shadow-sm text-xl hover:bg-red-700 font-bold"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
