import React from "react"
import { Button } from "@shared/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@shared/components/ui/sheet"

interface EditSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  /** Called when the user clicks Save */
  onSave?: () => void
  /** Called when the user clicks Cancel */
  onCancel?: () => void
  /** Disables the Save button */
  saveDisabled?: boolean
  /** Shows a loading state on the Save button */
  saving?: boolean
  /** Customize the save button text */
  saveLabel?: string
  /** Customize the cancel button text */
  cancelLabel?: string
  /** Width override (default sm:max-w-lg) */
  className?: string
}

export function EditSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSave,
  onCancel,
  saveDisabled = false,
  saving = false,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  className,
}: EditSheetProps) {
  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  const handleSave = () => {
    onSave?.()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={className}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        <SheetBody>{children}</SheetBody>

        <SheetFooter>
          <Button variant="outline" onClick={handleCancel} className="rounded-full">
            {cancelLabel}
          </Button>
          <Button
            onClick={handleSave}
            disabled={saveDisabled || saving}
            className="rounded-full"
          >
            {saving ? "Saving..." : saveLabel}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
