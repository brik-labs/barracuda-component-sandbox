import { Inbox } from "lucide-react"
import { cn } from "@shared/lib/utils"

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  className?: string
}

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your filters or search criteria.",
  icon: Icon = Inbox,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "border border-dashed border-sidebar-primary rounded-3xl p-8 max-w-lg mx-auto",
        className
      )}
      role="region"
    >
      <div className="flex flex-col gap-6 items-center text-center w-full">
        <div className="bg-white border border-[#F4F6F6] rounded-xl p-2 size-12 flex items-center justify-center shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
          <Icon className="size-6 text-sidebar-primary" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-xl font-medium text-foreground leading-[100%] tracking-[-0.3px]">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-5 tracking-[-0.14px] opacity-70">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
