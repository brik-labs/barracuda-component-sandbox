import React, { useState, useCallback } from "react"
import { Button } from "@shared/components/ui/button"
import { cn } from "@shared/lib/utils"

interface InlineEditSectionProps {
  /** Section title */
  title: string
  /** Read-only content shown when not editing */
  children: React.ReactNode
  /** Edit mode content (form fields, rule builders, etc.) */
  editContent: React.ReactNode
  /** Called when the user saves */
  onSave?: () => void
  /** Called when the user cancels */
  onCancel?: () => void
  /** Externally control edit mode */
  editing?: boolean
  /** Callback when edit mode changes */
  onEditingChange?: (editing: boolean) => void
  /** Disable the Save button */
  saveDisabled?: boolean
  /** Show saving state */
  saving?: boolean
  /** Custom save button text */
  saveLabel?: string
  className?: string
}

export function InlineEditSection({
  title,
  children,
  editContent,
  onSave,
  onCancel,
  editing: controlledEditing,
  onEditingChange,
  saveDisabled = false,
  saving = false,
  saveLabel = "Save",
  className,
}: InlineEditSectionProps) {
  const [internalEditing, setInternalEditing] = useState(false)
  const isEditing = controlledEditing ?? internalEditing

  const setEditing = useCallback(
    (value: boolean) => {
      if (onEditingChange) {
        onEditingChange(value)
      } else {
        setInternalEditing(value)
      }
    },
    [onEditingChange]
  )

  const handleEdit = () => setEditing(true)

  const handleCancel = () => {
    onCancel?.()
    setEditing(false)
  }

  const handleSave = () => {
    onSave?.()
    setEditing(false)
  }

  return (
    <div
      className={cn(
        "bg-white dark:bg-card rounded-xl border overflow-hidden mb-2 shadow-sm",
        isEditing && "ring-1 ring-primary/20",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3">
        <h3 className="text-base font-semibold text-card-foreground leading-6">
          {title}
        </h3>
        {!isEditing && (
          <Button
            variant="outline"
            className="h-7 px-2.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200"
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="px-5 pb-4">
        {isEditing ? editContent : children}
      </div>

      {/* Edit mode footer */}
      {isEditing && (
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className="rounded-full"
            onClick={handleSave}
            disabled={saveDisabled || saving}
          >
            {saving ? "Saving..." : saveLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
