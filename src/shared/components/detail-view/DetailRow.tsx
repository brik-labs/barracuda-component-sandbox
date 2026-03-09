import React, { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Badge } from "@shared/components/ui/badge"
import { DETAIL_SPACING, DETAIL_TEXT } from "./constants"

interface DetailRowProps {
  label: string
  value: string
  isDetailView?: boolean
  showBadge?: boolean
  badgeVariant?: "default" | "secondary" | "destructive" | "outline" | "success"
  isCopyable?: boolean
}

export const DetailRow = React.memo<DetailRowProps>(
  ({
    label,
    value,
    isDetailView = false,
    showBadge = false,
    badgeVariant = "secondary",
    isCopyable = false,
  }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }

    const renderValue = (text: string) => {
      if (!text.includes("\u2713")) return text
      const cleanedText = text.replace(/\u2713\s?/g, "")
      return (
        <span
          className={`inline-flex items-center ${DETAIL_SPACING.FLEX_GAP_SMALL}`}
        >
          <Check className="h-3 w-3 text-success flex-shrink-0" />
          <span>{cleanedText}</span>
        </span>
      )
    }

    const renderContent = () => {
      const content = showBadge ? (
        <Badge variant={badgeVariant === "success" ? "default" : badgeVariant}>
          {value}
        </Badge>
      ) : (
        <span>{renderValue(value)}</span>
      )

      if (!isCopyable) return content

      return (
        <button
          onClick={handleCopy}
          className={`inline-flex items-center text-primary ${DETAIL_SPACING.FLEX_GAP_SMALL} min-w-0 max-w-full`}
          title="Click to copy"
        >
          <span className="truncate min-w-0 flex-1">{content}</span>
          <span className="flex-shrink-0 ml-1">
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </span>
        </button>
      )
    }

    if (isDetailView) {
      return (
        <div
          className={`flex items-start ${DETAIL_SPACING.DETAIL_ROW_PADDING} w-full gap-6`}
        >
          <p
            className={`${DETAIL_TEXT.label} flex-shrink-0 min-w-0 w-36`}
          >
            {label}
          </p>
          <div className={`${DETAIL_TEXT.value} text-left flex-1`}>
            {renderContent()}
          </div>
        </div>
      )
    }

    return (
      <div
        className={`flex justify-between items-start ${DETAIL_SPACING.DETAIL_ROW_PADDING}`}
      >
        <p
          className={`${DETAIL_TEXT.label} pr-4 flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap`}
        >
          {label}
        </p>
        <div
          className={`${DETAIL_TEXT.value} text-right flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap flex-shrink-0`}
        >
          {renderContent()}
        </div>
      </div>
    )
  }
)

DetailRow.displayName = "DetailRow"
