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
import { EditSheet } from "@shared/components/edit-sheet"
import { InlineEditSection } from "@shared/components/inline-edit"
import { DetailRow } from "@shared/components/detail-view"

// ── Sheet Edit Demo (simple fields) ─────────────────────────────

function ScheduleDetailsDemo() {
  const [sheetOpen, setSheetOpen] = useState(false)

  // Editable state
  const [effectiveDate, setEffectiveDate] = useState("2026-03-15")
  const [merchant, setMerchant] = useState("All merchants")
  const [program, setProgram] = useState("default")
  const [description, setDescription] = useState(
    "Velocity limits for small merchant transactions under $5,000"
  )

  const programLabels: Record<string, string> = {
    default: "Default Program",
    premium: "Premium Program",
    enterprise: "Enterprise Program",
  }

  const formatDate = (iso: string) => {
    const d = new Date(iso + "T00:00:00")
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div>
      <h3 className="text-base font-semibold mb-3">
        Sheet Edit (slide-in panel for simple fields)
      </h3>
      <div className="max-w-2xl">
        <div className="bg-white dark:bg-card rounded-xl border overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-3">
            <h3 className="text-base font-semibold text-card-foreground leading-6">
              Schedule Details
            </h3>
            <Button
              variant="outline"
              className="h-7 px-2.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200"
              onClick={() => setSheetOpen(true)}
            >
              Edit
            </Button>
          </div>
          <div className="px-5 pb-4">
            <DetailRow label="Effective Date" value={formatDate(effectiveDate)} isDetailView />
            <DetailRow label="Merchant" value={merchant} isDetailView />
            <DetailRow label="Program" value={programLabels[program]} isDetailView />
            <DetailRow label="Description" value={description} isDetailView />
          </div>
        </div>

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
    </div>
  )
}

// ── Inline Edit Demo (complex content) ──────────────────────────

function VelocityRulesDemo() {
  const [rules, setRules] = useState([
    { id: 1, name: "Card Brand / Channel", thresholds: 3, status: "Active" },
    { id: 2, name: "MCC / Currency", thresholds: 2, status: "Active" },
    { id: 3, name: "Amount / Region", thresholds: 4, status: "Draft" },
  ])

  return (
    <div>
      <h3 className="text-base font-semibold mb-3">
        Inline Edit (edit in place for complex content)
      </h3>
      <div className="max-w-2xl">
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
                    <Input
                      defaultValue={rule.name}
                      className="mb-2"
                    />
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
                    onClick={() =>
                      setRules(rules.filter((r) => r.id !== rule.id))
                    }
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
                    {
                      id: Date.now(),
                      name: "New Rule",
                      thresholds: 0,
                      status: "Draft",
                    },
                  ])
                }
              >
                Add Rule
              </Button>
            </div>
          }
        >
          {/* Read-only view */}
          <div className="space-y-2">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="border rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium">{rule.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
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
      </div>
    </div>
  )
}

// ── Combined Demo ───────────────────────────────────────────────

export function EditPatternsDemo() {
  return (
    <div className="space-y-8">
      <ScheduleDetailsDemo />
      <VelocityRulesDemo />
    </div>
  )
}
