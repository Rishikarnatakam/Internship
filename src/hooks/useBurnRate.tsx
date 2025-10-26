import { useEffect, useState } from 'react'
import { demoFinancials } from '../data/demo'

type BurnData = any

export function useBurnRate(simulate = true){
  const [data, setData] = useState<BurnData | null>(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<'idle'|'loading'|'streaming'|'complete'>('idle')

  useEffect(()=>{
    let cancelled = false
    if (!simulate) return
    // initial thinking
    setStatus('loading')
    setProgress(0.02)

    const t1 = setTimeout(()=>{
      if (cancelled) return
      // generated title appears
      setProgress(0.1)
      setData({ title: 'Burn Rate Analysis with Runway Projections' })
    }, 1000)

    const t2 = setTimeout(()=>{
      if (cancelled) return
      // small loading pill on left canvas
      setProgress(0.2)
      setStatus('streaming')
    }, 2000)

    const t3 = setTimeout(()=>{
      if (cancelled) return
      // partial chart axes and a few points (simulate incremental)
      setProgress(0.45)
      setData(prev=>({ ...prev, chart: { labels: demoFinancials.months.slice(0,6), current: demoFinancials.currentMonthlySeries.slice(0,6), average: demoFinancials.averageSeries.slice(0,6) } }))
    }, 4000)

    const t4 = setTimeout(()=>{
      if (cancelled) return
      // more chart points + metrics
      setProgress(0.72)
      setData(prev=>({ ...prev, chart: { labels: demoFinancials.months.slice(0,10), current: demoFinancials.currentMonthlySeries.slice(0,10), average: demoFinancials.averageSeries.slice(0,10) }, metrics: { currentMonthly: demoFinancials.currentMonthly, averageMonthly: demoFinancials.averageMonthly, runwayMonths: demoFinancials.runwayMonths, stockDividendPct: demoFinancials.stockDividendPct } }))
    }, 6000)

    const t5 = setTimeout(()=>{
      if (cancelled) return
      // complete
      setProgress(1)
      setStatus('complete')
      setData(prev=>({ ...prev, chart: { labels: demoFinancials.months, current: demoFinancials.currentMonthlySeries, average: demoFinancials.averageSeries }, summary: demoFinancials.summary, followUps: [
        'Compare monthly burn rate to previous year',
        'Show cash flow projections for next 3 months', 
        'Identify funding options before cash runway ends',
        'Analyze expense categories for potential cuts',
        'Create budget scenarios for different growth rates',
        'Review monthly recurring revenue trends',
        'Calculate break-even point timeline',
        'Assess seasonal spending patterns',
        'Optimize operational efficiency metrics',
        'Plan emergency fund requirements'
      ] }))
    }, 8000)

    return ()=>{ cancelled = true; clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5) }
  }, [simulate])

  return { data, progress, status }
}


