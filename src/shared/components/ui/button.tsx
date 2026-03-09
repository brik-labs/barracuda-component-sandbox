import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@shared/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-md text-sm [&_svg]:size-4",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2 rounded-md text-sm [&_svg]:size-4",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground gap-2 rounded-md text-sm [&_svg]:size-4",
        secondary:
          "bg-secondary text-secondary-foreground gap-2 rounded-md text-sm [&_svg]:size-4",
        ghost: "hover:bg-accent hover:text-accent-foreground gap-2 rounded-md text-sm [&_svg]:size-4",
        link: "text-primary underline-offset-4 hover:underline gap-2 rounded-md text-sm [&_svg]:size-4",
        action: "bg-foreground text-background hover:bg-foreground/90 gap-1.5 rounded-full text-sm shadow-[0_10px_28px_0_rgba(0,0,0,0.10),0_1px_2px_0_rgba(0,0,0,0.06)] [&_svg]:size-4",
        "action-outline": "bg-card border border-foreground text-foreground hover:bg-accent gap-2 rounded-full text-sm shadow-none [&_svg]:size-4",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        action: "h-10 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
