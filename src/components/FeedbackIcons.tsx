import React from 'react'
import { motion } from 'framer-motion'

export default function FeedbackIcons({ visible }: { visible: boolean }) {
  if (!visible) return null

  return (
    <motion.div 
      className="flex items-center space-x-4 mt-4"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 150, 
        damping: 20,
        duration: 1.2,
        ease: "easeOut"
      }}
    >
      {/* Document Icon */}
      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      </button>

      {/* Circular 'C' Icon */}
      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-xs font-medium">
          C
        </div>
      </button>

      {/* Thumbs Up Icon */}
      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
        </svg>
      </button>

      {/* Thumbs Down Icon */}
      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
        </svg>
      </button>

      {/* Information Icon */}
      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-xs font-medium">
          i
        </div>
      </button>
    </motion.div>
  )
}
