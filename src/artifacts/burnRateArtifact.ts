import { createArtifact } from '@ai-sdk-tools/artifacts'
import { z } from 'zod'

export const burnRateArtifact = createArtifact({
  name: 'burn-rate',
  description: 'Calculate burn rate metrics',
  schema: z.object({
    title: z.string().optional(),
    status: z.enum(['loading','streaming','complete','error']).optional(),
    progress: z.number().min(0).max(1).optional(),
    chart: z.object({
      labels: z.array(z.string()),
      current: z.array(z.number()),
      average: z.array(z.number())
    }).optional(),
    metrics: z.object({
      currentMonthly: z.number().optional(),
      averageMonthly: z.number().optional(),
      runwayMonths: z.number().optional(),
      stockDividendPct: z.number().optional()
    }).optional(),
    summary: z.string().optional(),
    followUps: z.array(z.string()).optional()
  })
})


