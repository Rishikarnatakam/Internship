import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LeftFollowUps({ visible, items }:{ visible:boolean, items:string[] }){
  const scrollerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Auto-scroll when pills become visible
  useEffect(() => {
    if (visible && containerRef.current) {
      // Small delay to let the animation start
      setTimeout(() => {
        const scrollableParent = containerRef.current?.closest('.overflow-y-auto')
        if (scrollableParent) {
          scrollableParent.scrollTop = scrollableParent.scrollHeight
        }
      }, 300) // Delay to let the pop-in animation start
    }
  }, [visible])
  
  if (!visible) return null

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    // Convert vertical wheel to horizontal scroll for better UX
    if (!scrollerRef.current) return
    
    // Always prevent default page scrolling when hovering over pills
    e.preventDefault()
    e.stopPropagation()
    
    // Convert vertical scroll to horizontal scroll
    scrollerRef.current.scrollLeft += e.deltaY
  }

  return (
    <motion.div 
      ref={containerRef}
      className="mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        ease: "easeOut"
      }}
    >
      <div className="relative w-full overflow-hidden">
        {/* gradient edge indicators */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={scrollerRef}
          onWheel={onWheel}
          className="overflow-x-auto no-scrollbar whitespace-nowrap px-1"
        >
          {items.map((f, i)=> (
            <motion.button
              key={i}
              className="inline-flex items-center px-4 py-2 rounded-full border bg-white text-sm mr-3 align-top"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: i * 0.1, // Stagger each pill by 100ms
                duration: 0.6,
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}


