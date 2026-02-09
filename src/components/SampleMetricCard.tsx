import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'

interface SampleMetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
}

export function SampleMetricCard({ title, value, change, trend }: SampleMetricCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown
  const badgeVariant = trend === 'up' ? 'success' : 'danger'

  return (
    <Card className="shadow-card">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground font-medium">{title}</span>
          <Badge variant={badgeVariant} className="text-xs gap-1">
            <TrendIcon className="h-3 w-3" />
            {change}
          </Badge>
        </div>
        <div className="chart-value-lg">{value}</div>
      </CardContent>
    </Card>
  )
}
