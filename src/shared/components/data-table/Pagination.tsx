import { useMemo } from "react"
import { Button } from "@shared/components/ui/button"
import { cn } from "@shared/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  loading?: boolean
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  loading = false,
  onPageChange,
  className,
}: PaginationProps) {
  const visiblePages = useMemo(() => {
    const pages: (number | "ellipsis")[] = []

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, "ellipsis")
      } else if (currentPage >= totalPages - 1) {
        pages.push("ellipsis", totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis"
        )
      }
    }

    return pages
  }, [currentPage, totalPages])

  if (totalPages <= 1) return null

  const buttonStyles =
    "h-9 text-sm border border-transparent rounded-xl text-foreground hover:bg-card hover:border-sidebar-border hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

  return (
    <nav
      className={cn("bg-component border-t", className)}
      role="navigation"
      aria-label="Table pagination"
    >
      <div className="flex items-center justify-end px-4 py-2">
        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Pagination controls"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className={cn(
              buttonStyles,
              "px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4 mr-0.5" />
            Previous
          </Button>

          {visiblePages.map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-sm text-foreground"
              >
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(page)}
                disabled={loading}
                className={cn(
                  buttonStyles,
                  "w-9 p-0",
                  currentPage === page &&
                    "bg-card border-sidebar-border shadow-sm"
                )}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Button>
            )
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className={cn(
              buttonStyles,
              "px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Next page"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
