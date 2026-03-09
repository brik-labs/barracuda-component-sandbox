import React from "react"
import { DetailRow } from "./DetailRow"
import { DETAIL_SPACING } from "./constants"
import type { DetailItem } from "@shared/types/detail-view"

interface DetailsListProps {
  details: DetailItem[]
  isDetailView?: boolean
  specialRenderer?: (
    detail: DetailItem,
    index: number,
    isLast: boolean
  ) => React.ReactNode
}

export const DetailsList = React.memo<DetailsListProps>(
  ({ details, isDetailView = false, specialRenderer }) => {
    return (
      <div className={`flex flex-col ${DETAIL_SPACING.FLEX_GAP_MEDIUM}`}>
        {details.map((detail, index) => {
          if (specialRenderer) {
            const isLast = index === details.length - 1
            const specialContent = specialRenderer(detail, index, isLast)
            if (specialContent) {
              return (
                <React.Fragment key={detail.label}>
                  {specialContent}
                </React.Fragment>
              )
            }
          }

          return (
            <DetailRow
              key={detail.label}
              label={detail.label}
              value={detail.value}
              isDetailView={isDetailView}
              showBadge={detail.showBadge}
              badgeVariant={detail.badgeVariant}
              isCopyable={detail.isCopyable}
            />
          )
        })}
      </div>
    )
  }
)

DetailsList.displayName = "DetailsList"
