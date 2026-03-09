import { memo } from "react"
import { cn } from "@shared/lib/utils"

interface LoadingSkeletonProps {
  columns: number
  rows: number
  hasActions?: boolean
  hasSelection?: boolean
  className?: string
}

const barStyle: React.CSSProperties = {
  height: 14,
  borderRadius: 4,
  background: "linear-gradient(90deg, #efefef 25%, #f7f7f7 50%, #efefef 75%)",
  backgroundSize: "200% 100%",
  animation: "skeleton-sweep 1.5s ease-in-out infinite",
}

export const LoadingSkeleton = memo<LoadingSkeletonProps>(
  ({ columns, rows, className }) => {
    return (
      <div className={cn("relative w-full p-4", className)}>
        <style>{`
          @keyframes skeleton-sweep {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
        <div className="space-y-3">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className="flex gap-4">
              {Array.from({ length: columns }, (_, colIndex) => (
                <div
                  key={colIndex}
                  className="flex-1"
                  style={barStyle}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
)

LoadingSkeleton.displayName = "LoadingSkeleton"
