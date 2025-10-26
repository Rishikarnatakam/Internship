import React, { useState } from 'react'
import MessageStream from './MessageStream'
import AnalysisPanel from './AnalysisPanel'
import Composer from './Composer'
import LeftFollowUps from './LeftFollowUps'
import { useBurnRate } from '../hooks/useBurnRate'
import { motion } from 'framer-motion'

export default function CanvasLayout(){
  const [started, setStarted] = useState(false)
  const [typedDone, setTypedDone] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [showPills, setShowPills] = useState(false)
  const { data, progress, status } = useBurnRate(started)

  const handleStart = () => {
    if (started) return
    setTypedDone(false)
    setAnalysisComplete(false)
    setShowPills(false)
    setStarted(true)
  }

  // Track when analysis is complete
  React.useEffect(() => {
    if (status === 'complete') {
      setAnalysisComplete(true)
    }
  }, [status])

  // Show pills with delay after both text and analysis are complete
  React.useEffect(() => {
    if (typedDone && analysisComplete) {
      const timer = setTimeout(() => {
        setShowPills(true)
      }, 800) // 800ms delay after everything is complete
      return () => clearTimeout(timer)
    }
  }, [typedDone, analysisComplete])

  return (
    <div className="flex-1 p-6 bg-white relative overflow-hidden h-full min-h-0">
      {!started ? (
        // Center the left column but keep width equal to stage two's left width
        <motion.div 
          className="mx-auto flex flex-col h-full min-h-0 relative" 
          style={{ width: 'calc(100% - clamp(300px, 35vw, 45vw))' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Chat area (87% of height) - scrollable conversation */}
          <div className="overflow-y-auto" style={{ height: '87%' }}>
            <div className="py-4 space-y-4">
              <MessageStream data={data} progress={progress} status={status} started={started} onStart={handleStart} onTypingComplete={()=> setTypedDone(true)} />
              <LeftFollowUps visible={showPills} items={data?.followUps || ['Analyze expense categories for potential cuts','Show cash flow projections for next 3 months','Compare monthly burn rate to previous year']} />
            </div>
          </div>

          {/* Composer area (bottom 13% of height) - part of canvas */}
          <div style={{ height: '13%' }} className="flex-none flex items-end">
            <div className="w-full px-6">
              <Composer onStart={handleStart} />
            </div>
          </div>
        </motion.div>
      ) : (
        // Grid layout when right panel is started
        <div className="h-full min-h-0 relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full min-h-0 pr-3"
            initial={{ x: '50%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ width: 'calc(100% - clamp(300px, 35vw, 45vw))' }}
          >
            {/* Vertical separator line */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200"></div>
            {/* Same 3-part structure as first state */}
            <div className="flex flex-col h-full min-h-0 relative">
              {/* Chat area (87% of height) - scrollable conversation */}
              <div className="overflow-y-auto" style={{ height: '87%' }}>
                <div className="py-4 space-y-4">
                  <MessageStream data={data} progress={progress} status={status} started={started} onStart={handleStart} onTypingComplete={()=> setTypedDone(true)} showFeedbackIcons={showPills} />
                  <LeftFollowUps visible={showPills} items={data?.followUps || ['Analyze expense categories for potential cuts','Show cash flow projections for next 3 months','Compare monthly burn rate to previous year']} />
                </div>
              </div>

              {/* Composer area (bottom 13% of height) - same as single layout */}
              <div style={{ height: '13%' }} className="flex-none flex items-end">
                <div className="w-full px-6">
                  <Composer onStart={handleStart} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute right-0 top-0 h-full min-h-0 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ width: 'clamp(300px, 35vw, 45vw)' }}
          >
            <AnalysisPanel data={data} progress={progress} status={status} />
          </motion.div>
        </div>
      )}
    </div>
  )
}


