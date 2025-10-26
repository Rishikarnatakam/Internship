import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

export default function AnalysisPanel({ data, progress, status }:{data?:any, progress?:number, status?:string}){
  const hasChart = !!data?.chart
  const chartData = data?.chart?.labels ? data.chart.labels.map((l:string, i:number)=>({ month: l, current: data.chart.current[i], avg: data.chart.average ? data.chart.average[i] : undefined })) : []
  
  const [typedSummary, setTypedSummary] = useState('')
  
  useEffect(() => {
    if (!data?.summary) {
      setTypedSummary('')
      return
    }
    
    const text = data.summary
    let i = 0
    const id = setInterval(() => {
      if (i >= text.length) {
        clearInterval(id)
        return
      }
      setTypedSummary(text.slice(0, i + 1))
      i += 1
    }, 15) // Slightly slower than canvas text
    
    return () => clearInterval(id)
  }, [data?.summary])

  return (
        <aside className="pl-6 pr-6 py-4 h-full overflow-y-auto">
      <div className="text-sm font-medium mb-2 text-gray-600">Analysis</div>
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Monthly Burn Rate</h3>

      <div style={{ width: '100%', height: '36vh' }} className="relative mb-4">
        {(status==='loading' || status==='streaming') && !hasChart ? (
          <div className="w-full h-full bg-white relative overflow-hidden">
            {/* Line chart skeleton */}
            <div className="p-4 h-full flex flex-col">
              {/* Y-axis labels skeleton */}
              <div className="flex-1 flex flex-col justify-between pr-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
                ))}
              </div>
              
              {/* Chart area with line skeleton */}
              <div className="flex-1 relative ml-8 mb-8">
                {/* Grid lines skeleton */}
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="absolute w-full h-px bg-gray-100" style={{ top: `${i * 25}%` }}></div>
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="absolute h-full w-px bg-gray-100" style={{ left: `${i * 16.66}%` }}></div>
                  ))}
                </div>
                
                {/* Line skeleton */}
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 0,80 Q 50,60 100,40 T 200,20 T 300,30 T 400,10 T 500,25"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                  />
                  {/* Dots on line */}
                  {[0, 100, 200, 300, 400, 500].map((x, i) => (
                    <circle key={i} cx={x} cy={80 - (i * 10)} r="3" fill="#e5e7eb" className="animate-pulse" />
                  ))}
                </svg>
              </div>
              
              {/* X-axis labels skeleton */}
              <div className="flex justify-between ml-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded animate-pulse w-8"></div>
                ))}
              </div>
            </div>
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/40 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        ) : hasChart ? (
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ left: 5, right: 20, top: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f3f4f6" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#f3f4f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="#111" 
                strokeWidth={2}
                dot={{r:3}} 
                fill="url(#areaGradient)"
                fillOpacity={0.6}
              />
              <Line type="monotone" dataKey="avg" stroke="#888" strokeWidth={1} dot={false} strokeDasharray="4 4"/>
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full bg-gray-50 border border-dashed border-gray-100 flex items-center justify-center text-gray-300">Chart loading...</div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 border border-gray-200 bg-white shadow-sm relative overflow-hidden">
          <div className="text-xs text-gray-500 mb-2">Current Monthly Burn</div>
          <div className="text-2xl font-semibold text-gray-900 mb-1">
            {data?.metrics?.currentMonthly ? data.metrics.currentMonthly : (
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            )}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            {data?.metrics ? '-92% vs 13 months' : (
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            )}
          </div>
          {!data?.metrics && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/40 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>
        <div className="p-4 border border-gray-200 bg-white shadow-sm relative overflow-hidden">
          <div className="text-xs text-gray-500 mb-2">Runway Remaining</div>
          <div className="text-2xl font-semibold text-gray-900 mb-1">
            {data?.metrics?.runwayMonths ? `${data.metrics.runwayMonths} months` : (
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            )}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            {data?.metrics ? 'Below recommended 12+ months' : (
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            )}
          </div>
          {!data?.metrics && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/40 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            />
          )}
        </div>
        <div className="p-4 border border-gray-200 bg-white shadow-sm relative overflow-hidden">
          <div className="text-xs text-gray-500 mb-2">Average Burn Rate</div>
          <div className="text-2xl font-semibold text-gray-900">
            {data?.metrics?.averageMonthly ? data.metrics.averageMonthly : (
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            )}
          </div>
          {!data?.metrics && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/40 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
          )}
        </div>
        <div className="p-4 border border-gray-200 bg-white shadow-sm relative overflow-hidden">
          <div className="text-xs text-gray-500 mb-2">Stock Dividend</div>
          <div className="text-2xl font-semibold text-gray-900">
            {data?.metrics?.stockDividendPct ? `${data.metrics.stockDividendPct}%` : (
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            )}
          </div>
          {!data?.metrics && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/40 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />
          )}
        </div>
      </div>

      <div className="text-sm text-gray-700 leading-relaxed">
        {data?.summary ? typedSummary : (status === 'loading' ? (
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
          </div>
        ) : '')}
      </div>

      {/* bottom loading footer shown while streaming */}
      {(status === 'loading' || status === 'streaming') && (
        <div className="mt-6 loading-footer flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="spinner" />
            <div>
              <div className="font-medium">Loading burn rate data</div>
              <div className="text-sm text-gray-500">Fetching financial data from your accounts</div>
            </div>
          </div>
          <div className="text-sm text-gray-400">{Math.round((progress||0)*4)}/4</div>
        </div>
      )}

      {/* Follow ups are hidden; they will be shown under the left pane after text finishes */}
    </aside>
  )
}


