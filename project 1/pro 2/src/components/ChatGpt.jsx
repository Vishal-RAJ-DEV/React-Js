import React from 'react'
import { useState } from 'react';

const recentChats = [
    "How to use React?",
    "Explain async/await",
    "Best CSS frameworks",
    "What is useEffect?",
    "JavaScript closures"
];




const ChatGpt = () => {

const [chats, setchats] = useState("");

const hanldelick  = () =>{
    console.log(chats);
    setchats("");
}


    return (
        <div className="flex h-screen w-screen bg-gray-900 ">
            {/* Sidebar */}
            <aside className="w-100 text-white flex border-r-2 border-blue-950 flex-col justify-between py-6 px-4 shadow-2xl">
                {/* Top: Logo and New Chat */}
                <div>
                    {/* ChatGPT Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 mb-2">
                            {/* Simple ChatGPT SVG logo */}
                            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                                <circle cx="20" cy="20" r="20" fill="#10A37F" />
                                <text x="50%" y="54%" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" dy=".3em">GPT</text>
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-wide">ChatGPT</span>
                    </div>
                    {/* New Chat Button */}
                    <button className="w-full bg-green-600 hover:bg-green-700 transition-colors duration-200 py-3 rounded-lg font-semibold mb-8 flex items-center justify-center gap-2 shadow">
                        <span className="text-lg">+</span> New Chat
                    </button>
                    {/* Recent Chats */}
                    <div>
                        <h2 className="text-gray-400 text-sm font-semibold mb-2 pl-1">Recent Chats</h2>
                        <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
                            {recentChats.map((chat, idx) => (
                                <li key={idx}>
                                    <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 truncate">
                                        {chat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Footer */}
                <footer className="mt-8 pt-4 border-t border-gray-800 text-xs text-gray-500 text-center">
                    <span>© {new Date().getFullYear()} ChatGPT UI</span>
                </footer>
            </aside>
            {/* Main Chat Area (empty for now) */}
            <main className="bg-gray-900 flex flex-col justify-between max-w-7xl px-20 py-5">
                <div className="flex flex-col gap-4 w-full h-5/6 overflow-auto">
                    {/* User message with icon */}
                    <div className="flex items-start w-3/4 self-end">
                        <div className="flex-shrink-0 mr-3">
                            <div className="w-10 h-10 rounded-full border-2 border-blue-500 bg-blue-900 flex items-center justify-center shadow">
                                {/* User Icon SVG */}
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-white bg-blue-950 border border-blue-700 rounded-xl px-4 py-3 shadow w-full">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam aperiam amet, iure voluptas vitae aliquam sunt, fugiat eum asperiores recusandae laudantium iusto id, sequi porro quia animi eveniet placeat repellat.
                        </div>
                    </div>
                    {/* Bot message with ChatGPT icon */}
                    <div className="flex items-start w-3/4 self-start">
                        <div className="flex-shrink-0 mr-3">
                            <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shadow">
                                {/* ChatGPT Icon SVG */}
                                <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
                                    <circle cx="20" cy="20" r="20" fill="#10A37F" />
                                    <text x="50%" y="54%" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" dy=".3em">GPT</text>
                                </svg>
                            </div>
                        </div>
                        <div className="text-white bg-gray-800 border border-green-700 rounded-xl px-4 py-3 shadow w-full">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam aperiam amet, iure voluptas vitae aliquam sunt, fugiat eum asperiores recusandae laudantium iusto id, sequi porro quia animi eveniet placeat repellat.
                        </div>
                    </div>
                </div>
                <form
                    className="w-full h-15 flex px-4 py-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        hanldelick();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Ask somethings "
                        className="w-full h-12 px-4 rounded-full border-2 border-transparent bg-gray-800 text-white placeholder-gray-400 outline-none transition"
                        value={chats}
                        // onKeyDown={(e) => {
                        //     if (e.key === "Enter") {
                        //         // Optional: hanldelick(); // Not needed, form onSubmit will handle
                        //     }
                        // }}
                        onChange={(e) => setchats(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="ml-2 flex items-center justify-center w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow"
                    >
                        {/* Send Icon SVG */}
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </form>
            </main>
        </div>
    )
}

export default ChatGpt