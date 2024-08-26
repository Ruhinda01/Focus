import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword, doGoogleSignIn } from "../../auth";
import { useAuth } from "./AuthContext";


const SignIn = () => {
    const { currentUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                setIsSigningIn(false);
                if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
                    setErrorMessage("Invalid credentials. Please try again.");
                } else if (error.code === "auth/wrong-password") {
                    setErrorMessage("Wrong password. Please try again.");
                } else {
                    setErrorMessage("An error occurred. Please try again.");
                }
            }
        }
    };

    const onGoogleSignIn = (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            doGoogleSignIn().catch((error) => {
                setIsSigningIn(false);
                setErrorMessage(error.message);
            });
        }
    };

    return (
        <div className="h-screen bg-gradient-to-r from-purple-500 to-green-500 flex justify-center items-center px-4 sm:px-6 lg:px-8">
            {currentUser && <Navigate to="/today" replace={true} />}
            <div className="w-full max-w-sm md:max-w-md p-6 md:p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl md:text-3xl font-bold text-center mb-4">Welcome Back</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputEmail">
                            Email
                        </label>
                        <input
                            type="email"
                            id="inputEmail"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputPassword">
                            Password
                        </label>
                        <input
                            type="password"
                            id="inputPassword"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}

                    <button type="submit" disabled={isSigningIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        {isSigningIn ? "Signing In..." : "Sign In"}
                    </button>
                </form>
                <p className="text-center text-gray-700 mt-4">
                    Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</Link>
                </p>
                <div className="flex items-center justify-center mt-4">
                    <div className="border-t border-gray-300 w-full"></div>
                    <p className="text-gray-700 text-sm font-bold mx-2">Or</p>
                    <div className="border-t border-gray-300 w-full"></div>
                </div>
                <button onClick={onGoogleSignIn} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full mt-4">
                    {isSigningIn ? "Signing In..." : "Sign In with Google"}
                </button>
            </div>
        </div>
    )
};

export default SignIn;

