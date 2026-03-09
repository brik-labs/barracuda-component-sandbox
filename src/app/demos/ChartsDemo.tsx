import { LineChart } from "@shared/components/charts"
import { BarChart } from "@shared/components/charts"
import { Separator } from "@shared/components/ui/separator"

const LINE_DATA = [
  { name: "Jan", approvalRate: 94.2, previousRate: 91.8 },
  { name: "Feb", approvalRate: 93.8, previousRate: 92.1 },
  { name: "Mar", approvalRate: 95.1, previousRate: 92.5 },
  { name: "Apr", approvalRate: 94.5, previousRate: 93.0 },
  { name: "May", approvalRate: 96.2, previousRate: 93.4 },
  { name: "Jun", approvalRate: 95.8, previousRate: 93.8 },
  { name: "Jul", approvalRate: 96.5, previousRate: 94.1 },
]

const BAR_DATA = [
  { name: "Mon", transactions: 1240, refunds: 85 },
  { name: "Tue", transactions: 1580, refunds: 120 },
  { name: "Wed", transactions: 1350, refunds: 95 },
  { name: "Thu", transactions: 1720, refunds: 110 },
  { name: "Fri", transactions: 1980, refunds: 145 },
  { name: "Sat", transactions: 890, refunds: 60 },
  { name: "Sun", transactions: 650, refunds: 42 },
]

const HORIZONTAL_BAR_DATA = [
  { name: "Insufficient Funds", count: 342 },
  { name: "Do Not Honor", count: 218 },
  { name: "Expired Card", count: 156 },
  { name: "Invalid CVV", count: 98 },
  { name: "Limit Exceeded", count: 74 },
]

const MULTI_LINE_DATA = [
  { name: "W1", visa: 12400, mastercard: 8900, amex: 3200 },
  { name: "W2", visa: 13100, mastercard: 9200, amex: 3500 },
  { name: "W3", visa: 11800, mastercard: 8600, amex: 2900 },
  { name: "W4", visa: 14200, mastercard: 9800, amex: 3800 },
  { name: "W5", visa: 15100, mastercard: 10500, amex: 4100 },
  { name: "W6", visa: 14600, mastercard: 10100, amex: 3900 },
]

export function ChartsDemo() {
  return (
    <div className="space-y-8">
      {/* Line Chart */}
      <div>
        <h3 className="text-base font-semibold mb-1">Line Chart</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Approval rate trend with previous period comparison (dashed)
        </p>
        <div className="bg-card rounded-xl border p-4">
          <LineChart
            data={LINE_DATA}
            dataKeys={["approvalRate", "previousRate"]}
            dashedKeys={["previousRate"]}
            labelMap={{ approvalRate: "Current", previousRate: "Previous" }}
            formatYAxis={(v) => `${v}%`}
            formatTooltip={(v) => `${v.toFixed(1)}%`}
            showLegend={false}
            height={280}
          />
        </div>
      </div>

      <Separator />

      {/* Multi-series Line Chart */}
      <div>
        <h3 className="text-base font-semibold mb-1">Multi-Series Line Chart</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Transaction volume by card network
        </p>
        <div className="bg-card rounded-xl border p-4">
          <LineChart
            data={MULTI_LINE_DATA}
            dataKeys={["visa", "mastercard", "amex"]}
            labelMap={{ visa: "Visa", mastercard: "Mastercard", amex: "Amex" }}
            formatYAxis={(v) => `${(v / 1000).toFixed(0)}k`}
            formatTooltip={(v) => v.toLocaleString()}
            height={280}
          />
        </div>
      </div>

      <Separator />

      {/* Bar Chart */}
      <div>
        <h3 className="text-base font-semibold mb-1">Bar Chart</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Daily transaction volume with refunds
        </p>
        <div className="bg-card rounded-xl border p-4">
          <BarChart
            data={BAR_DATA}
            dataKeys={["transactions", "refunds"]}
            formatYAxis={(v) => `${(v / 1000).toFixed(1)}k`}
            formatTooltip={(v) => v.toLocaleString()}
            height={280}
          />
        </div>
      </div>

      <Separator />

      {/* Horizontal Bar Chart */}
      <div>
        <h3 className="text-base font-semibold mb-1">Horizontal Bar Chart</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Top decline reasons breakdown
        </p>
        <div className="bg-card rounded-xl border p-4">
          <BarChart
            data={HORIZONTAL_BAR_DATA}
            dataKeys={["count"]}
            layout="vertical"
            showLegend={false}
            formatTooltip={(v) => `${v} declines`}
            barSize={24}
            height={250}
          />
        </div>
      </div>
    </div>
  )
}
