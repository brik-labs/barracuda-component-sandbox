import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { Textarea } from "@shared/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu"
import { EditSheet } from "@shared/components/edit-sheet"

type SheetType = "entity" | "rule" | null

export function AddPatternDemo() {
  const [activeSheet, setActiveSheet] = useState<SheetType>(null)

  // Entity form state
  const [entityName, setEntityName] = useState("")
  const [entityType, setEntityType] = useState("merchant")
  const [entityDescription, setEntityDescription] = useState("")

  // Rule form state
  const [ruleName, setRuleName] = useState("")
  const [ruleType, setRuleType] = useState("block")
  const [ruleThreshold, setRuleThreshold] = useState("")
  const [ruleDescription, setRuleDescription] = useState("")

  const resetEntityForm = () => {
    setEntityName("")
    setEntityType("merchant")
    setEntityDescription("")
  }

  const resetRuleForm = () => {
    setRuleName("")
    setRuleType("block")
    setRuleThreshold("")
    setRuleDescription("")
  }

  const handleSave = () => {
    if (activeSheet === "entity") resetEntityForm()
    if (activeSheet === "rule") resetRuleForm()
    setActiveSheet(null)
  }

  const handleClose = (open: boolean) => {
    if (!open) setActiveSheet(null)
  }

  return (
    <div>
      <div className="flex items-center gap-5 mb-6">
        <h3 className="page-title">Sonar</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-foreground focus-visible:ring-offset-0"
              aria-label="Create new"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wide">
              Entities
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setActiveSheet("entity")}>
              Add entity
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wide">
              Rules
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setActiveSheet("rule")}>
              Add rule
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm text-muted-foreground">
        Click the <strong>+</strong> button to open the creation menu, then choose an item to open the add sheet.
      </p>

      {/* Add Entity Sheet */}
      <EditSheet
        open={activeSheet === "entity"}
        onOpenChange={handleClose}
        title="Add Entity"
        description="Create a new entity for monitoring."
        onSave={handleSave}
        onCancel={resetEntityForm}
        saveLabel="Create"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Entity name"
              value={entityName}
              onChange={(e) => setEntityName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={entityType} onValueChange={setEntityType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="merchant">Merchant</SelectItem>
                <SelectItem value="processor">Processor</SelectItem>
                <SelectItem value="bank">Bank</SelectItem>
                <SelectItem value="card-brand">Card Brand</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe this entity..."
              value={entityDescription}
              onChange={(e) => setEntityDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </EditSheet>

      {/* Add Rule Sheet */}
      <EditSheet
        open={activeSheet === "rule"}
        onOpenChange={handleClose}
        title="Add Rule"
        description="Create a new Sonar rule."
        onSave={handleSave}
        onCancel={resetRuleForm}
        saveLabel="Create"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Rule Name</Label>
            <Input
              placeholder="Rule name"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Rule Type</Label>
            <Select value={ruleType} onValueChange={setRuleType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="authentication">Authentication</SelectItem>
                <SelectItem value="block">Block</SelectItem>
                <SelectItem value="review">Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Threshold</Label>
            <Input
              type="number"
              placeholder="e.g. 5"
              value={ruleThreshold}
              onChange={(e) => setRuleThreshold(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe what this rule does..."
              value={ruleDescription}
              onChange={(e) => setRuleDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </EditSheet>
    </div>
  )
}
