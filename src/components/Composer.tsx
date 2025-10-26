import React, { useState, useRef, useEffect } from 'react'

export default function Composer({ onStart }:{onStart?:()=>void}){
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    onStart && onStart()
    setMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto-scroll when content exceeds 4 lines
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current
      const lineHeight = 20 // Approximate line height
      const maxLines = 4
      const maxHeight = lineHeight * maxLines
      
      // Reset height to auto to get the natural height
      textarea.style.height = 'auto'
      
      // If content exceeds max height, set max height and enable scrolling
      if (textarea.scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`
        textarea.style.overflowY = 'auto'
      } else {
        textarea.style.height = `${textarea.scrollHeight}px`
        textarea.style.overflowY = 'hidden'
      }
    }
  }, [message])

  return (
    <div className="mt-4">
      <div className="bg-gray-100 p-4 rounded-lg border border-panelBorder flex items-center gap-4">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything"
          className="flex-1 bg-transparent border-none outline-none resize-none text-gray-700 placeholder-gray-400 min-h-[20px] max-h-[80px]"
          rows={1}
        />
        <div className="flex items-center gap-4">
          <button className="text-2xl text-gray-500 hover:text-gray-700">+</button>
          <button 
            onClick={handleSend} 
            className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors" 
            aria-label="Send"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  )
}


