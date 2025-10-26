import React from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import CanvasLayout from './components/CanvasLayout'

export default function App() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full">
        <Topbar />
        <CanvasLayout />
      </div>
    </div>
  )
}


