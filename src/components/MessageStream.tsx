import React, { useEffect, useMemo, useState, useRef } from 'react'
import FeedbackIcons from './FeedbackIcons'

export default function MessageStream({ data, progress, status, started, onStart, onTypingComplete, showFeedbackIcons }:{data?:any, progress?:number, status?:string, started?:boolean, onStart?:()=>void, onTypingComplete?:()=>void, showFeedbackIcons?:boolean}){
  const sections = useMemo(() => ([
    {
      threshold: 0.15,
      title: 'Overview',
      body: "I'm currently gathering financial data for your burn rate analysis from September 1, 2024, to September 30, 2025, which will provide insights into your monthly burn rate, cash runway, and expense breakdown."
    },
    {
      threshold: 0.35,
      title: 'Monthly Burn Rate',
      body: 'Your current monthly burn rate is $12,758.50, which represents a significant reduction from your historical average.'
    },
    {
      threshold: 0.55,
      title: 'Cash Runway',
      body: 'Your cash runway is approximately 2 months, meaning you can sustain operations for the next 2 months before needing additional funding. This is critical for your business planning.'
    },
    {
      threshold: 0.7,
      title: 'Expense Breakdown',
      body: 'Your largest expense category is Stock Dividend, accounting for 39% of your total monthly burn rate.'
    },
    {
      threshold: 0.85,
      title: 'Trends and Insights',
      body: 'Your burn rate has decreased by 93% over the past 13 months. The chart on the right shows your monthly burn rate trends with current vs average spending patterns, while the metrics provide additional context about your financial runway and expense breakdown.'
    }
  ]), [])

  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(-1)
  const [typedSegment, setTypedSegment] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!started) {
      setCurrentSectionIndex(-1)
      setTypedSegment('')
      return
    }

    const availableIndex = sections.reduce((acc, s, idx) => ((progress ?? 0) > s.threshold ? idx : acc), -1)

    if (availableIndex > currentSectionIndex) {
      setCurrentSectionIndex(availableIndex)
      setTypedSegment('')
      return
    }

    if (availableIndex === currentSectionIndex && currentSectionIndex >= 0) {
      const body = sections[currentSectionIndex].body
      if (typedSegment.length < body.length) {
        const id = setInterval(() => {
          setTypedSegment(prev => {
            const nextLen = Math.min(prev.length + 1, body.length)
            return body.slice(0, nextLen)
          })
        }, 12) // Faster typing speed
        return () => clearInterval(id)
      } else {
        if ((progress ?? 0) >= 0.85) {
          onTypingComplete && onTypingComplete()
        }
      }
    }
  }, [started, progress, sections, currentSectionIndex, typedSegment])

  // Auto-scroll to bottom as text is being typed
  useEffect(() => {
    if (containerRef.current && started) {
      // Find the scrollable parent container
      const scrollableParent = containerRef.current.closest('.overflow-y-auto')
      if (scrollableParent) {
        scrollableParent.scrollTop = scrollableParent.scrollHeight
      }
    }
  }, [typedSegment, currentSectionIndex, started])

  return (
    <div className="text-gray-700">
      {/* Main heading with buttons */}
      <div className="flex items-center justify-between mb-6">
        <button className="w-8 h-8 bg-gray-100 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h2 className="text-lg font-normal text-gray-900">Burn Rate Analysis with Runway Projections</h2>
        <div className="flex items-center space-x-2">
          <button className="w-8 h-8 bg-gray-100 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
          <button className="w-8 h-8 bg-gray-100 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <div className="flex items-end space-x-2">
          <div className="bg-gray-200 px-3 py-2 rounded-full text-base text-gray-800">Analyze my burn rate</div>
          <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs">A</div>
        </div>
      </div>

      <div className="space-y-4 flex flex-col items-start">
        {!started && (
          <div className="text-gray-400 text-sm w-full flex items-center justify-center py-20">Thinking...</div>
        )}

        {started && status === 'loading' && (
          <div className="left-loading">
            <div className="dot" />
            <div className="text-sm text-gray-500">Loading burn rate data</div>
          </div>
        )}
        {started && (
          <div className="w-full" ref={containerRef}>
            {sections.map((sec, idx) => {
              if (idx < currentSectionIndex) {
                return (
                  <section key={idx} className="mb-6">
                    <h4 className="text-base font-medium text-gray-900 mb-2">{sec.title}</h4>
                    <p className="text-sm text-gray-700 leading-6 whitespace-pre-wrap">{sec.body}</p>
                  </section>
                )
              }
              if (idx === currentSectionIndex) {
                return (
                  <section key={idx} className="mb-6">
                    <h4 className="text-base font-medium text-gray-900 mb-2">{sec.title}</h4>
                    <p className="text-sm text-gray-700 leading-6 whitespace-pre-wrap">{typedSegment}</p>
                  </section>
                )
              }
              return null
            })}
            <FeedbackIcons visible={showFeedbackIcons || false} />
          </div>
        )}
      </div>
    </div>
  )
}


