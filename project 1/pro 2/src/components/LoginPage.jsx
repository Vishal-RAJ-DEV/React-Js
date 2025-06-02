import React, { useEffect, useState } from 'react'
import './LoginPage.css'

const LoginPage = () => {
    const [loading, setLoading] = useState(true);
    const [showSignup, setShowSignup] = useState(false);

    useEffect(() => {
        // Simulate loading time (e.g., 1.5s)
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {  // if the loading is true then we will show the loding screen 
        // loadig scrren with a spinner and text
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 border-4 border-purple-700 border-t-transparent rounded-full animate-spin mb-6"></div>
                    <span className="text-white text-2xl font-bold tracking-widest animate-pulse">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='login-container flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-purple-900'>
            <div className="w-full max-w-2xl mx-auto login-card rounded-2xl shadow-2xl p-12 border border-gray-700">
                <h1 className="text-4xl font-extrabold text-center mb-10 text-white shimmer tracking-wide">
                    {showSignup ? "Create Account" : "Welcome Back"}
                </h1>
                <form>
                    <div className="mb-8">
                        <label className="block text-lg text-gray-300 mb-3 font-semibold" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="input-field w-full px-6 py-4 border-2 border-gray-700 rounded-lg text-white text-lg bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 placeholder-gray-400"
                            placeholder="Enter your username"
                        />
                    </div>
                    {showSignup && (
                        <div className="mb-8">
                            <label className="block text-lg text-gray-300 mb-3 font-semibold transition-all" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="input-field w-full px-6 py-4 border-2 border-gray-700 rounded-lg text-white text-lg bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 placeholder-gray-400"
                                placeholder="Enter your email"
                            />
                        </div>
                    )}
                    <div className="mb-10">
                        <label className="block text-lg text-gray-300 mb-3 font-semibold" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="input-field w-full px-6 py-4 border-2 border-gray-700 rounded-lg text-white text-lg bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 placeholder-gray-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className='flex flex-row w-full gap-8 items-center justify-center mt-8'>
                        {showSignup ? (
                            <button
                                type="submit"
                                className="submit-button bg-purple-700 text-white px-10 py-4 rounded-lg text-lg font-bold shadow-lg hover:bg-purple-800 hover:scale-105 transition-all duration-300"
                            >
                                Sign Up
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="submit-button bg-gray-800 text-white px-10 py-4 rounded-lg text-lg font-bold shadow-lg hover:bg-gray-900 hover:scale-105 transition-all duration-300"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </form>
                <div className="mt-8 text-center">
                    {showSignup ? (
                        <span className="text-gray-400">
                            Already have an account?{" "}
                            <button
                                className="text-purple-400 hover:underline"
                                onClick={() => setShowSignup(false)}  //hre we are setting the show the login page 
                            >
                                Login
                            </button>
                        </span>
                    ) : (
                        <span className="text-gray-400">
                            Don&apos;t have an account?{" "}
                            <button
                                className="text-purple-400 hover:underline"
                                onClick={() => setShowSignup(true)}  //here we are 
                            >
                                Sign Up
                            </button>
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginPage