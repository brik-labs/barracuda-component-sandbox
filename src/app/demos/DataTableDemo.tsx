import { useState } from "react"
import { DataTable } from "@shared/components/data-table"
import type { Column, TableAction, SortState } from "@shared/types/data-table"
import { Badge } from "@shared/components/ui/badge"
import { Eye, Copy } from "lucide-react"

// Mock data
interface Payment {
  id: string
  transactionRef: string
  customer: string
  amount: number
  currency: string
  status: "succeeded" | "pending" | "failed" | "refunded"
  method: string
  date: string
}

const MOCK_PAYMENTS: Payment[] = [
  { id: "1", transactionRef: "txn_a1b2c3", customer: "Alice Johnson", amount: 125000, currency: "USD", status: "succeeded", method: "Visa •••• 4242", date: "2026-03-09" },
  { id: "2", transactionRef: "txn_d4e5f6", customer: "Bob Smith", amount: 89900, currency: "USD", status: "succeeded", method: "Mastercard •••• 5555", date: "2026-03-09" },
  { id: "3", transactionRef: "txn_g7h8i9", customer: "Carol White", amount: 45000, currency: "EUR", status: "pending", method: "SEPA Direct Debit", date: "2026-03-08" },
  { id: "4", transactionRef: "txn_j0k1l2", customer: "David Brown", amount: 210000, currency: "USD", status: "failed", method: "Visa •••• 1234", date: "2026-03-08" },
  { id: "5", transactionRef: "txn_m3n4o5", customer: "Eve Davis", amount: 67500, currency: "GBP", status: "refunded", method: "Amex •••• 0001", date: "2026-03-07" },
  { id: "6", transactionRef: "txn_p6q7r8", customer: "Frank Miller", amount: 33300, currency: "USD", status: "succeeded", method: "Visa •••• 9876", date: "2026-03-07" },
  { id: "7", transactionRef: "txn_s9t0u1", customer: "Grace Lee", amount: 155000, currency: "USD", status: "succeeded", method: "Mastercard •••• 3333", date: "2026-03-06" },
  { id: "8", transactionRef: "txn_v2w3x4", customer: "Henry Wilson", amount: 22000, currency: "EUR", status: "pending", method: "iDEAL", date: "2026-03-06" },
]

const STATUS_VARIANTS: Record<string, "success" | "warning" | "danger" | "secondary"> = {
  succeeded: "success",
  pending: "warning",
  failed: "danger",
  refunded: "secondary",
}

const formatAmount = (amount: number, currency: string) => {
  const symbols: Record<string, string> = { USD: "$", EUR: "\u20AC", GBP: "\u00A3" }
  return `${symbols[currency] || currency} ${(amount / 100).toFixed(2)}`
}

const columns: Column<Payment>[] = [
  {
    key: "transactionRef",
    header: "Transaction",
    width: 140,
    render: (item) => (
      <span className="text-xs text-primary">{item.transactionRef}</span>
    ),
  },
  {
    key: "customer",
    header: "Customer",
    width: 160,
    sortable: true,
    render: (item) => <span className="font-medium">{item.customer}</span>,
  },
  {
    key: "amount",
    header: "Amount",
    width: 120,
    align: "right",
    sortable: true,
    render: (item) => (
      <span className="font-medium tabular-nums">
        {formatAmount(item.amount, item.currency)}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: 110,
    sortable: true,
    render: (item) => (
      <Badge variant={STATUS_VARIANTS[item.status]}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Badge>
    ),
  },
  {
    key: "method",
    header: "Method",
    width: 180,
    render: (item) => (
      <span className="text-muted-foreground">{item.method}</span>
    ),
  },
  {
    key: "date",
    header: "Date",
    width: 110,
    sortable: true,
    render: (item) => (
      <span className="text-muted-foreground">{item.date}</span>
    ),
  },
]

const rowActions: TableAction<Payment>[] = [
  { key: "view", label: "View Details", onClick: () => {} },
  { key: "copy", label: "Copy ID", onClick: () => {} },
  { key: "refund", label: "Refund", onClick: () => {}, condition: (item) => item.status === "succeeded" },
  { key: "retry", label: "Retry", onClick: () => {}, condition: (item) => item.status === "failed" },
]

const hoverActions: TableAction<Payment>[] = [
  { key: "quick-view", label: "Quick View", icon: <Eye className="h-3.5 w-3.5" />, onClick: () => {} },
  { key: "copy-id", label: "Copy ID", icon: <Copy className="h-3.5 w-3.5" />, onClick: () => {} },
]

export function DataTableDemo() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [activeItemId, setActiveItemId] = useState<string | undefined>()
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortState | null>(null)

  return (
    <div className="space-y-6">
      {/* Full-featured table */}
      <div>
        <h3 className="text-base font-semibold mb-3">
          Full-featured table (selection, actions, hover actions, pagination)
        </h3>
        <div className="border rounded-xl overflow-hidden bg-card">
          <DataTable
            data={MOCK_PAYMENTS}
            columns={columns}
            getItemId={(item) => item.id}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            onRowClick={(item) => setActiveItemId(item.id)}
            activeItemId={activeItemId}
            rowActions={rowActions}
            hoverActions={hoverActions}
            sort={sort}
            onSortChange={setSort}
            pagination={{
              currentPage: page,
              totalPages: 5,
              onPageChange: setPage,
            }}
          />
        </div>
        {selectedItems.length > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {selectedItems.join(", ")}
          </p>
        )}
      </div>

      {/* Minimal table */}
      <div>
        <h3 className="text-base font-semibold mb-3">
          Minimal table (no selection, no actions)
        </h3>
        <div className="border rounded-xl overflow-hidden bg-card">
          <DataTable
            data={MOCK_PAYMENTS.slice(0, 3)}
            columns={columns.slice(0, 4)}
            getItemId={(item) => item.id}
          />
        </div>
      </div>

      {/* Empty state */}
      <div>
        <h3 className="text-base font-semibold mb-3">Empty state</h3>
        <div className="border rounded-xl overflow-hidden bg-card">
          <DataTable
            data={[]}
            columns={columns}
            getItemId={(item) => item.id}
            emptyTitle="No payments found"
            emptyDescription="Try adjusting your filters or create a new payment."
          />
        </div>
      </div>

      {/* Loading state */}
      <div>
        <h3 className="text-base font-semibold mb-3">Loading state</h3>
        <div className="border rounded-xl overflow-hidden bg-card">
          <DataTable
            data={[]}
            columns={columns}
            getItemId={(item) => item.id}
            loading={true}
            loadingRows={5}
          />
        </div>
      </div>
    </div>
  )
}
