import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="backdrop-blur-xl bg-white/30 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Hubo un error</h1>
                <p className="text-gray-700 mb-4">
                    Usted no tiene los permisos.
                </p>
                <p className="text-gray-700 mb-8">Por favor inicie sesion.</p>
                <Link
                    to="/login"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
                >
                    Ir al Login 
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
