import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

export interface LineChartDataPoint {
  name: string
  [key: string]: string | number
}

export interface LineChartProps {
  data: LineChartDataPoint[]
  dataKeys: string[]
  colors?: string[]
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  xAxisKey?: string
  formatYAxis?: (value: number) => string
  formatTooltip?: (value: number) => string
  tooltipVariant?: 'default' | 'table'
  dashedKeys?: string[]
  labelMap?: Record<string, string>
}

function cssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

function getThemeColors() {
  return {
    chart1: cssVar('--chart-1', '#0B3B45'),
    chart2: cssVar('--chart-2', '#038A6C'),
    chart3: cssVar('--chart-3', '#D4960A'),
    chart4: cssVar('--chart-4', '#FF5630'),
    chart5: cssVar('--chart-5', '#475569'),
    grid: cssVar('--chart-grid', '#E2E8F0'),
    axis: cssVar('--chart-axis', '#4A6970'),
    tooltipBg: cssVar('--chart-tooltip-bg', '#ffffff'),
    tooltipBorder: cssVar('--chart-tooltip-border', '#E2E8F0'),
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function DefaultTooltip({ active, payload, label, resolvedColors, dataKeys, formatTooltip, labelMap }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-[var(--chart-tooltip-border)] rounded-lg shadow-lg px-3 py-2.5 text-xs min-w-[140px]">
      <div className="font-medium text-foreground mb-1.5 text-[11px] tracking-[-0.11px]">{label}</div>
      <div className="space-y-1">
        {payload.map((entry: any, i: number) => {
          const colorIndex = dataKeys.indexOf(entry.dataKey)
          const color = resolvedColors[colorIndex >= 0 ? colorIndex : i]
          const val = Number(entry.value)
          const formatted = formatTooltip ? formatTooltip(val) : val.toLocaleString()
          const displayLabel = labelMap?.[entry.dataKey] ?? entry.name
          return (
            <div key={entry.dataKey} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="text-muted-foreground">{displayLabel}</span>
              </div>
              <span className="font-medium text-foreground tabular-nums">{formatted}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function LineChart({
  data,
  dataKeys,
  colors,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  xAxisKey = 'name',
  formatYAxis,
  formatTooltip,
  tooltipVariant = 'default',
  dashedKeys = [],
  labelMap,
}: LineChartProps) {
  const theme = getThemeColors()
  const resolvedColors = colors ?? [theme.chart1, theme.chart2, theme.chart3, theme.chart4, theme.chart5]

  const axisStyle = {
    fill: theme.axis,
    fontFamily: 'Monument Grotesk Mono, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.12px',
    textTransform: 'uppercase' as const,
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} opacity={0.5} />
        )}
        <XAxis
          dataKey={xAxisKey}
          tick={axisStyle}
          axisLine={{ stroke: theme.grid }}
          tickLine={false}
        />
        <YAxis
          orientation="right"
          tick={axisStyle}
          axisLine={{ stroke: theme.grid }}
          tickLine={false}
          tickFormatter={formatYAxis}
        />
        {showTooltip && (
          <Tooltip
            content={<DefaultTooltip resolvedColors={resolvedColors} dataKeys={dataKeys} formatTooltip={formatTooltip} labelMap={labelMap} />}
            cursor={{ stroke: theme.grid, strokeDasharray: '3 3' }}
          />
        )}
        {showLegend && <Legend wrapperStyle={{ fontFamily: 'Monument Grotesk Mono, sans-serif', fontSize: '12px' }} />}
        {dataKeys.map((key, index) => {
          const isDashed = dashedKeys.includes(key)
          return (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={resolvedColors[index % resolvedColors.length]}
              strokeWidth={2}
              strokeDasharray={isDashed ? '6 3' : undefined}
              dot={isDashed ? false : { fill: resolvedColors[index % resolvedColors.length], r: 4 }}
              activeDot={isDashed ? { r: 4 } : { r: 6 }}
            />
          )
        })}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
