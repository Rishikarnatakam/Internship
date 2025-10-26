import React from 'react'

export default function GeneratedTitle({title}:{title?:string}){
  if (!title) return null
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="bg-white border border-panelBorder px-4 py-2 rounded">{title}</div>
    </div>
  )
}


