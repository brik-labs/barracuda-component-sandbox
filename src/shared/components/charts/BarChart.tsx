import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts'

export interface BarChartDataPoint {
  name: string
  [key: string]: string | number
}

export interface BarChartProps {
  data: BarChartDataPoint[]
  dataKeys: string[]
  colors?: string[]
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  xAxisKey?: string
  formatYAxis?: (value: number) => string
  formatTooltip?: (value: number, name?: string) => string
  barSize?: number
  layout?: 'horizontal' | 'vertical'
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

export function BarChart({
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
  barSize = 32,
  layout = 'horizontal',
}: BarChartProps) {
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
      <RechartsBarChart
        data={data}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        layout={layout}
      >
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} opacity={0.5} />
        )}
        {layout === 'horizontal' ? (
          <>
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
          </>
        ) : (
          <>
            <XAxis
              type="number"
              tick={axisStyle}
              axisLine={{ stroke: theme.grid }}
              tickLine={false}
              tickFormatter={formatYAxis}
            />
            <YAxis
              type="category"
              dataKey={xAxisKey}
              tick={axisStyle}
              axisLine={{ stroke: theme.grid }}
              tickLine={false}
            />
          </>
        )}
        {showTooltip && (
          <Tooltip
            contentStyle={{
              backgroundColor: theme.tooltipBg,
              border: `1px solid ${theme.tooltipBorder}`,
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'Monument Grotesk Mono, sans-serif',
            }}
            formatter={formatTooltip ? ((value: unknown) => formatTooltip(typeof value === 'number' ? value : 0)) as never : undefined}
          />
        )}
        {showLegend && <Legend wrapperStyle={{ fontFamily: 'Monument Grotesk Mono, sans-serif', fontSize: '12px' }} />}
        {dataKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={resolvedColors[index % resolvedColors.length]}
            radius={[4, 4, 0, 0]}
            barSize={barSize}
          >
            {data.map((_, entryIndex) => (
              <Cell key={`cell-${entryIndex}`} fill={resolvedColors[index % resolvedColors.length]} />
            ))}
          </Bar>
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
