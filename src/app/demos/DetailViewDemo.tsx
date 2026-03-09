import { useState } from "react"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { Badge } from "@shared/components/ui/badge"
import { Textarea } from "@shared/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/components/ui/select"
import {
  EntityDetailPage,
  DetailSection,
  SectionCard,
  DetailRow,
} from "@shared/components/detail-view"
import { EditSheet } from "@shared/components/edit-sheet"
import { InlineEditSection } from "@shared/components/inline-edit"
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

const timelineItems: DetailItem[] = [
  { label: "Mar 5, 2026 14:32", value: "Rule 'Card Brand / Channel' threshold updated by admin@brik.com" },
  { label: "Mar 1, 2026 09:15", value: "Schedule activated by admin@brik.com" },
  { label: "Feb 15, 2026 16:45", value: "Rule 'MCC / Currency' added by dev@brik.com" },
  { label: "Feb 10, 2026 11:00", value: "Schedule created as draft by admin@brik.com" },
]

const programLabels: Record<string, string> = {
  default: "Default Program",
  premium: "Premium Program",
  enterprise: "Enterprise Program",
}

const formatDate = (iso: string) => {
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function DetailViewDemo() {
  const [view, setView] = useState<"detail" | "compact">("detail")

  // Sheet edit state for Schedule Details
  const [sheetOpen, setSheetOpen] = useState(false)
  const [effectiveDate, setEffectiveDate] = useState("2026-03-15")
  const [merchant, setMerchant] = useState("All merchants")
  const [program, setProgram] = useState("default")
  const [description, setDescription] = useState(
    "Velocity limits for small merchant transactions under $5,000"
  )

  // Inline edit state for Velocity Rules
  const [rules, setRules] = useState([
    { id: 1, name: "Card Brand / Channel", thresholds: 3, status: "Active" },
    { id: 2, name: "MCC / Currency", thresholds: 2, status: "Active" },
    { id: 3, name: "Amount / Region", thresholds: 4, status: "Draft" },
  ])

  const scheduleDetails: DetailItem[] = [
    { label: "Effective Date", value: formatDate(effectiveDate) },
    { label: "Program", value: programLabels[program] },
    { label: "Merchant", value: merchant },
    { label: "Description", value: description },
    { label: "Created", value: "Feb 10, 2026" },
    { label: "Last Modified", value: "Mar 5, 2026" },
  ]

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
        <EntityDetailPage
          entity={MOCK_SCHEDULE}
          config={config}
          status="Active"
          statusVariant="success"
          metadata={
            <>
              <span>Program: {programLabels[program]}</span>
              <span>Created: {MOCK_SCHEDULE.createdDate}</span>
            </>
          }
          actions={
            <Button
              variant="outline"
              className="h-7 px-2.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200"
              onClick={() => setSheetOpen(true)}
            >
              Edit
            </Button>
          }
          onBack={() => {}}
          totalItems={12}
          canNavigatePrevious={true}
          canNavigateNext={true}
        >
          {/* Panel 1: Schedule Details — sheet edit */}
          <SectionCard
            title="Schedule Details"
            isDetailView={true}
          >
            <div>
              <DetailRow label="Effective Date" value={formatDate(effectiveDate)} isDetailView />
              <DetailRow label="Program" value={programLabels[program]} isDetailView />
              <DetailRow label="Merchant" value={merchant} isDetailView />
              <DetailRow label="Description" value={description} isDetailView />
              <DetailRow label="Created" value="Feb 10, 2026" isDetailView />
              <DetailRow label="Last Modified" value="Mar 5, 2026" isDetailView />
            </div>
          </SectionCard>

          {/* Panel 2: Velocity Rules — inline edit */}
          <InlineEditSection
            title="Velocity Rules"
            onSave={() => {}}
            onCancel={() => {}}
            editContent={
              <div className="space-y-3">
                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <Input defaultValue={rule.name} className="mb-2" />
                      <div className="flex items-center gap-3">
                        <Label className="text-sm text-muted-foreground font-normal">
                          Thresholds:
                        </Label>
                        <Input
                          type="number"
                          defaultValue={rule.thresholds}
                          className="w-20"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive ml-4"
                      onClick={() => setRules(rules.filter((r) => r.id !== rule.id))}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-dashed"
                  onClick={() =>
                    setRules([
                      ...rules,
                      { id: Date.now(), name: "New Rule", thresholds: 0, status: "Draft" },
                    ])
                  }
                >
                  Add Rule
                </Button>
              </div>
            }
          >
            <div className="space-y-3">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">{rule.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {rule.thresholds} thresholds configured
                    </p>
                  </div>
                  <Badge variant={rule.status === "Draft" ? "warning" : "success"}>
                    {rule.status}
                  </Badge>
                </div>
              ))}
            </div>
          </InlineEditSection>

          {/* Panel 3: Activity Timeline — no edit */}
          <SectionCard title="Activity Timeline" isDetailView={true}>
            <div>
              {timelineItems.map((item, i) => (
                <DetailRow
                  key={i}
                  label={item.label}
                  value={String(item.value)}
                  isDetailView
                />
              ))}
            </div>
          </SectionCard>
        </EntityDetailPage>
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
      )}

      {/* Sheet for editing Schedule Details */}
      <EditSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Edit Schedule Details"
        description="Update the velocity schedule configuration."
        onSave={() => setSheetOpen(false)}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Effective Date</Label>
            <Input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Merchant</Label>
            <Input
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Program</Label>
            <Select value={program} onValueChange={setProgram}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Program</SelectItem>
                <SelectItem value="premium">Premium Program</SelectItem>
                <SelectItem value="enterprise">Enterprise Program</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </EditSheet>
    </div>
  )
}
