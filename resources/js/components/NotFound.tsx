import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Te equivocaste de ruta
                </h1>
                <p className="text-gray-700 mb-4">Por favor vuelve al home.</p>
                <Link
                    to="/home"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
                >
                    Volver al Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
