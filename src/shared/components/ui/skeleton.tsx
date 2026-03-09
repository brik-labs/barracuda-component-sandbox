import { cn } from "@shared/lib/utils"

const barStyle: React.CSSProperties = {
  borderRadius: 4,
  background: "linear-gradient(90deg, #efefef 25%, #f7f7f7 50%, #efefef 75%)",
  backgroundSize: "200% 100%",
  animation: "skeleton-sweep 1.5s ease-in-out infinite",
}

function SkeletonBase({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-md", className)} style={{ ...barStyle, ...style }} {...props} />
}

function SkeletonText({ className, lines = 1 }: { className?: string; lines?: number }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="h-3" style={barStyle} />
      ))}
    </div>
  )
}

function SkeletonBox({ className, width = "w-4", height = "h-4" }: { className?: string; width?: string; height?: string }) {
  return <div className={cn(width, height, className)} style={barStyle} />
}

function SkeletonIcon({ className }: { className?: string }) {
  return <div className={cn("w-4 h-4", className)} style={barStyle} />
}

export const Skeleton = Object.assign(SkeletonBase, {
  Text: SkeletonText,
  Box: SkeletonBox,
  Icon: SkeletonIcon,
})
