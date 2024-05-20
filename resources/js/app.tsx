import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Offers from "./components/Offers";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import NotFoundPage from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <div className="font-mono bg-gradient-to-r from-indigo-300 to-red-400 p-20 mx-auto content-center h-full">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/offers"
                            element={
                                <ProtectedRoute>
                                    <Offers />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/my-codes"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/error" element={<ErrorPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    </React.StrictMode>
);
