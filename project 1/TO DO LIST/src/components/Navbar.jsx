import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 h-16 flex justify-between items-center shadow-xl rounded-b-2xl border-b-4 border-violet-300">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <span className="bg-gradient-to-br from-violet-300 to-purple-400 rounded-full p-1.5 shadow-lg border-2 border-white">
            <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#a78bfa" />
              <path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <h1 className="text-2xl font-extrabold tracking-widest bg-gradient-to-r from-violet-200 via-white to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
            iTask
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-base font-semibold">
          <li className="cursor-pointer px-3 py-1 rounded-lg hover:bg-violet-200 hover:text-violet-800 transition-all duration-200 shadow-sm">Home</li>
          <li className="cursor-pointer px-3 py-1 rounded-lg hover:bg-violet-200 hover:text-violet-800 transition-all duration-200 shadow-sm">Your Task</li>
          <li className="cursor-pointer px-3 py-1 rounded-lg hover:bg-violet-200 hover:text-violet-800 transition-all duration-200 shadow-sm">About</li>
        </ul>

        {/* Search & Profile */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-8 pr-3 py-1 rounded-lg text-violet-700 bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-400 shadow-inner text-sm"
              style={{ height: "32px" }}
            />
            <span className="absolute left-2 top-1.5 text-violet-400">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="#a78bfa" strokeWidth="2"/>
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-200 to-purple-400 flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-105 transition-transform">
            <span className="text-violet-700 font-bold text-lg drop-shadow">U</span>
          </div>
        </div>
      </nav>
    </div>
  )
} 

export default Navbar