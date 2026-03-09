import React, { useState, useMemo, useCallback } from "react"
import { SectionCard } from "./SectionCard"
import { ShowMoreButton } from "@shared/components/ui/show-more-button"
import { DetailsList } from "./DetailsList"
import { DETAIL_SPACING, DETAIL_TEXT } from "./constants"
import type { DetailItem, SectionAction } from "@shared/types/detail-view"

interface DetailSectionProps {
  title: string
  details: DetailItem[]
  actions?: SectionAction[]
  visibleCount?: number
  isDetailView?: boolean
  className?: string
  emptyMessage?: string
  specialRenderer?: (
    detail: DetailItem,
    index: number,
    isLast: boolean
  ) => React.ReactNode
}

/**
 * A section card that displays a list of detail rows with optional show more/less.
 * In detail view mode, all items are always shown.
 */
export const DetailSection = React.memo<DetailSectionProps>(
  ({
    title,
    details,
    actions,
    visibleCount = 4,
    isDetailView = false,
    className,
    emptyMessage,
    specialRenderer,
  }) => {
    const [showAll, setShowAll] = useState(false)

    const { visibleDetails, hiddenDetails } = useMemo(() => {
      const visible = details.slice(0, visibleCount)
      const hidden = details.slice(visibleCount)
      return { visibleDetails: visible, hiddenDetails: hidden }
    }, [details, visibleCount])

    const handleToggle = useCallback(() => {
      setShowAll((prev) => !prev)
    }, [])

    if (!details || details.length === 0) {
      return (
        <SectionCard
          title={title}
          actions={actions}
          className={className}
          isDetailView={isDetailView}
        >
          <div className={DETAIL_TEXT.label}>
            {emptyMessage || `No ${title.toLowerCase()} available`}
          </div>
        </SectionCard>
      )
    }

    return (
      <SectionCard
        title={title}
        actions={actions}
        className={className}
        isDetailView={isDetailView}
      >
        <div className="flex flex-col">
          {visibleDetails.length > 0 && (
            <DetailsList
              details={visibleDetails}
              isDetailView={isDetailView}
              specialRenderer={specialRenderer}
            />
          )}

          {hiddenDetails.length > 0 && (
            <div className={DETAIL_SPACING.SECTION_SEPARATOR_HEIGHT} />
          )}

          {(showAll || isDetailView) && hiddenDetails.length > 0 && (
            <div
              className="transition-all duration-200 ease-out will-change-transform"
              style={{ contain: "paint" }}
            >
              <DetailsList
                details={hiddenDetails}
                isDetailView={isDetailView}
                specialRenderer={specialRenderer}
              />
            </div>
          )}

          {hiddenDetails.length > 0 && !isDetailView && (
            <div className="flex justify-start pt-3 pb-1">
              <ShowMoreButton
                isExpanded={showAll}
                onToggle={handleToggle}
                ariaLabel={
                  showAll
                    ? `Show less ${title.toLowerCase()}`
                    : `Show more ${title.toLowerCase()}`
                }
              />
            </div>
          )}
        </div>
      </SectionCard>
    )
  }
)

DetailSection.displayName = "DetailSection"
