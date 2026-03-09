import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDown, ChevronUp, ChevronsUpDown, CircleCheckBig } from "lucide-react"

import { cn } from "@shared/lib/utils"
import { Z_INDEX_CLASSES } from "@shared/lib/z-index"
import { Checkbox } from "./checkbox"

const STYLES = {
  trigger: "flex h-10 w-full items-center justify-between rounded-[10px] border border-input bg-card px-3 py-2 text-base md:text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-60 [&>span]:line-clamp-1 [&>span]:font-light [&>span]:leading-tight [&[data-placeholder]>span]:text-muted-foreground [&[data-placeholder]>span]:opacity-60",

  content: "relative max-h-96 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md",

  contentAnimation: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",

  contentPopper: "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",

  item: "relative flex w-full cursor-default select-none items-center justify-between py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",

  checkboxItem: "relative flex w-full cursor-default select-none items-center gap-3 py-2 pl-3 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",

  scrollButton: "flex cursor-default items-center justify-center py-1",
  icon: "h-4 w-4",
  itemIndicator: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center"
} as const

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  icon?: React.ComponentType<{ className?: string }>
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, icon: IconComponent = ChevronsUpDown, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(STYLES.trigger, className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <IconComponent className={cn(STYLES.icon, "text-foreground")} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(STYLES.scrollButton, className)}
    {...props}
  >
    <ChevronUp className={STYLES.icon} />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(STYLES.scrollButton, className)}
    {...props}
  >
    <ChevronDown className={STYLES.icon} />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        STYLES.content,
        Z_INDEX_CLASSES.NESTED_DROPDOWN,
        STYLES.contentAnimation,
        position === "popper" && STYLES.contentPopper,
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "w-full",
          position === "popper" && "h-[var(--radix-select-trigger-height)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(STYLES.item, className)}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className={STYLES.itemIndicator}>
      <SelectPrimitive.ItemIndicator>
        <CircleCheckBig className={cn(STYLES.icon, "text-primary")} />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

interface SelectCheckboxItemProps {
  children: React.ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

const SelectCheckboxItem = React.forwardRef<
  HTMLDivElement,
  SelectCheckboxItemProps
>(({ className, children, checked = false, onCheckedChange, disabled = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      STYLES.checkboxItem,
      disabled && "pointer-events-none opacity-50",
      className
    )}
    onClick={() => !disabled && onCheckedChange?.(!checked)}
    {...props}
  >
    <Checkbox
      checked={checked}
      disabled={disabled}
      className="pointer-events-none"
    />
    <span className="flex-1">{children}</span>
  </div>
))
SelectCheckboxItem.displayName = "SelectCheckboxItem"


const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectCheckboxItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
