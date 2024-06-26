import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const LogoutButton: React.FC = () => {
    const { setIsUserLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axiosInstance.post("/logout");
        localStorage.removeItem("auth_token");
        setIsUserLoggedIn(false);
        navigate("/home");
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
