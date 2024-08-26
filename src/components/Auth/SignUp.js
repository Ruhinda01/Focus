import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { doCreateUserWithEmailAndPassword } from "../../auth";

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { currentUser } = useAuth();

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                if (password !== confirmPassword) {
                    setErrorMessage("Passwords do not match. Please try again.");
                    setIsRegistering(false);
                    return;
                }
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (error) {
                setIsRegistering(false);
                if (error.code === "auth/email-already-in-use") {
                    setErrorMessage("Email already in use. Please sign in.");
                } else if (error.code === "auth/weak-password") {
                    setErrorMessage("Password must be at least 6 characters. Please try again.");
                } else {
                    setErrorMessage("An error occurred. Please try again.");
                }
            }
        }
    };

    return (
        <>
            {currentUser && <Navigate to="/today" replace={true} />}
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-green-500 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputEmail">
                                Email
                            </label>
                            <input
                                type="email"
                                id="inputEmail"
                                autoComplete="email"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputPassword">
                                Password
                            </label>
                            <input
                                type="password"
                                disabled={isRegistering}
                                id="inputPassword"
                                autoComplete="current-password"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputPassword">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                disabled={isRegistering}
                                id="inputPassword"
                                autoComplete="current-password"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {errorMessage && (
                            <span className="text-red-500">{errorMessage}</span>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isRegistering}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {isRegistering ? "Registering..." : "Register"}
                            </button>
                        </div>
                        <div>
                            Already have an account? {"  "} 
                            <Link to="/signin" className="text-indigo-600 hover:text-indigo-900">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;

