import { useState } from "react"
import { Button } from "@shared/components/ui/button"
import { Badge } from "@shared/components/ui/badge"
import {
  EntityDetailPage,
  DetailSection,
  SectionCard,
} from "@shared/components/detail-view"
import type { StatusPanelConfig, DetailItem } from "@shared/types/detail-view"

// Mock entity
interface VelocitySchedule {
  id: string
  name: string
  status: "active" | "draft" | "archived"
  amount: string
  effectiveDate: string
  program: string
  merchant: string
  rulesCount: number
  thresholdsCount: number
  createdDate: string
  lastModified: string
  description: string
}

const MOCK_SCHEDULE: VelocitySchedule = {
  id: "vel_sch_001",
  name: "Small Merchant Velocity",
  status: "active",
  amount: "$5,000",
  effectiveDate: "Mar 15, 2026",
  program: "Default Program",
  merchant: "All merchants",
  rulesCount: 3,
  thresholdsCount: 8,
  createdDate: "Feb 10, 2026",
  lastModified: "Mar 5, 2026",
  description: "Velocity limits for small merchant transactions under $5,000",
}

const config: StatusPanelConfig<VelocitySchedule> = {
  entityLabel: "Velocity Schedule",
  primaryField: "name",
  secondaryField: "effectiveDate",
  secondaryFieldFormatter: (v) => String(v),
}

const scheduleDetails: DetailItem[] = [
  { label: "Effective Date", value: "Mar 15, 2026" },
  { label: "Program", value: "Default Program" },
  { label: "Merchant", value: "All merchants" },
  { label: "Rules", value: "3 rules" },
  { label: "Thresholds", value: "8 thresholds" },
  { label: "Created", value: "Feb 10, 2026" },
  { label: "Last Modified", value: "Mar 5, 2026" },
]

const timelineItems: DetailItem[] = [
  { label: "Mar 5, 2026 14:32", value: "Rule 'Card Brand / Channel' threshold updated by admin@brik.com" },
  { label: "Mar 1, 2026 09:15", value: "Schedule activated by admin@brik.com" },
  { label: "Feb 15, 2026 16:45", value: "Rule 'MCC / Currency' added by dev@brik.com" },
  { label: "Feb 10, 2026 11:00", value: "Schedule created as draft by admin@brik.com" },
]

export function DetailViewDemo() {
  const [view, setView] = useState<"detail" | "compact">("detail")

  return (
    <div className="space-y-8">
      {/* View toggle */}
      <div className="flex gap-2">
        <Button
          variant={view === "detail" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("detail")}
        >
          Detail View (Full Page)
        </Button>
        <Button
          variant={view === "compact" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("compact")}
        >
          Compact View (Panel)
        </Button>
      </div>

      {view === "detail" ? (
        /* Full detail page layout */
        <div className="border rounded-xl overflow-hidden -mx-6">
          <EntityDetailPage
            entity={MOCK_SCHEDULE}
            config={config}
            status="Active"
            statusVariant="success"
            metadata={
              <>
                <span>Program: {MOCK_SCHEDULE.program}</span>
                <span>Created: {MOCK_SCHEDULE.createdDate}</span>
              </>
            }
            actions={
              <>
                <Button
                  variant="outline"
                  className="h-7 px-2.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200"
                >
                  Edit
                </Button>
              </>
            }
            onBack={() => {}}
            totalItems={12}
            canNavigatePrevious={true}
            canNavigateNext={true}
          >
            <DetailSection
              title="Schedule Details"
              details={scheduleDetails}
              isDetailView={true}
              actions={[{ label: "Edit", onClick: () => {} }]}
            />

            <SectionCard title="Velocity Rules" isDetailView={true} actions={[{ label: "Edit", onClick: () => {} }]}>
              <div className="space-y-3">
                {["Card Brand / Channel", "MCC / Currency", "Amount / Region"].map(
                  (rule, i) => (
                    <div
                      key={i}
                      className="border rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">{rule}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {i + 2} thresholds configured
                        </p>
                      </div>
                      <Badge variant={i === 2 ? "warning" : "success"}>
                        {i === 2 ? "Draft" : "Active"}
                      </Badge>
                    </div>
                  )
                )}
              </div>
            </SectionCard>

            <DetailSection
              title="Activity Timeline"
              details={timelineItems}
              isDetailView={true}
              visibleCount={10}
            />
          </EntityDetailPage>
        </div>
      ) : (
        /* Compact panel layout */
        <div className="max-w-md space-y-2">
          <DetailSection
            title="Schedule Details"
            details={scheduleDetails}
            isDetailView={false}
            visibleCount={4}
          />

          <SectionCard title="Velocity Rules">
            <div className="space-y-2">
              {["Card Brand / Channel", "MCC / Currency"].map((rule, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span>{rule}</span>
                  <Badge variant="success" className="text-xs">Active</Badge>
                </div>
              ))}
            </div>
          </SectionCard>

          <DetailSection
            title="Activity"
            details={timelineItems.slice(0, 3)}
            isDetailView={false}
            visibleCount={2}
          />
        </div>
      )}    </div>
  )
}
