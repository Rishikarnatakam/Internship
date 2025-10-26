import React from 'react'

export default function Topbar(){
  return (
    <header className="h-12 bg-white border-b border-panelBorder flex items-center px-4 sticky top-0 z-10">
      <div className="flex-1">
        <div className="relative w-1/3">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input 
            placeholder="Find anything..." 
            className="w-full pl-10 pr-4 py-2 bg-transparent border-none outline-none text-sm placeholder-gray-400 focus:bg-gray-50 rounded-lg transition-colors" 
          />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button className="px-2 py-1 border rounded-full text-sm">Feedback</button>
        <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
        </button>
        <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs">A</div>
      </div>
    </header>
  )
}


