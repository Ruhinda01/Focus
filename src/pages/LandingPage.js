import React from "react";
import { Link } from "react-router-dom";
import tasks from "../assets/tasks.jpg";


const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="relative text-center bg-gray-800 py-12 w-full">
                <img src={tasks} alt="tasks" className="absolute inset-0 object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gray-800 bg-opacity-50 z-10"></div>
                <div className="relative z-20 max-w-6xl mx-auto px-4">
                    <nav className="flex justify-between items-center mb-6">
                        <Link to="/">
                            <h1 className="text-2xl font-bold text-white">FOCUS</h1>
                        </Link>
                        <div className="flex space-x-4">
                            <Link
                                to="/signin"
                                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-white text-purple-500 hover:bg-gray-100 font-bold py-2 px-4 rounded"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </nav>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Boost Your Productivity with Focus
                    </h1>
                    <p className="text-lg text-gray-300 mb-4">
                        Manage tasks, stay focused and achieve your goals with Focus.
                    </p>
                    <Link
                        to="/signup"
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Get Started
                    </Link>
                </div>
            </header>

            <section className="py-16 bg-gray-900 text-center">
                <h2 className="text-3xl font-bold text-white mb-8">
                    Why Choose Focus?
                </h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    <div className="feature p-6 border rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Organize Tasks Effortlessly
                        </h3>
                        <p className="text-gray-300">
                            Focus helps you keep track of your tasks in a playful and organized manner.
                        </p>
                    </div>
                    <div className="feature p-6 border rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Track Your Progress
                        </h3>
                        <p className="text-gray-300">
                            Gain insights into your productivity and stay on top of your goals. This is done
                            through use of the Health and Experience metrics.
                        </p>
                    </div>
                    <div className="feature p-6 border rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Seamless User Experience
                        </h3>
                        <p className="text-gray-300">
                            Easy-to-use interface designed to help you focus on your tasks.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    How It Works
                </h2>
                <ol className="max-w-4xl mx-auto list-decimal list-inside text-left space-y-4 text-gray-600">
                    <li className="text-lg">
                        Sign up and create your account.
                    </li>
                    <li className="text-lg">
                        Add tasks to your list whether today or upcoming.
                    </li>
                    <li className="text-lg">
                        Focus on your tasks and keep track of your progress.
                    </li>
                    <li className="text-lg">
                        Track your Health and Experience metrics to stay on top of your goals.
                    </li>
                    <li className="text-lg">
                        Get notified when you reach your goals.
                    </li>
                    <li className="text-lg">
                        Check out Focus Deep work application. <a href="https://focus-deep.vercel.app/" className="text-blue-500 hover:underline font-bold">FOCUS-DEEP</a>
                    </li>
                </ol>
            </section>

            <footer className="bg-gray-800 py-16 text-center">
                <h2 className="text-3xl font-bold text-white mb-8">
                    Ready to take your productivity to the next level?
                </h2>
                <Link
                    to="/signup"
                    className="bg-white text-purple-500 py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-100"
                    aria-label="Join Now"
                >
                    Join Now
                </Link>
            </footer>
        </div>
    );
};

export default LandingPage;

