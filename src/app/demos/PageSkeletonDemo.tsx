import { useState, useMemo, useCallback } from "react"
import { Plus, Eye, Copy, ArrowLeft } from "lucide-react"
import { DataTable } from "@shared/components/data-table"
import type { Column, TableAction, SortState } from "@shared/types/data-table"
import { Badge } from "@shared/components/ui/badge"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { Textarea } from "@shared/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu"
import { TableFilters } from "@shared/components/filters/TableFilters"
import type { TableFiltersConfig, FilterConfig } from "@shared/types/filters"
import {
  EntityDetailPage,
  SectionCard,
  DetailRow,
} from "@shared/components/detail-view"
import type { StatusPanelConfig, DetailItem } from "@shared/types/detail-view"
import { EditSheet } from "@shared/components/edit-sheet"

// ========================================
// DATA TYPES
// ========================================

interface Transaction {
  id: string
  transactionRef: string
  customer: string
  email: string
  amount: number
  currency: string
  status: "succeeded" | "pending" | "failed" | "refunded" | "disputed" | "uncaptured"
  method: string
  channel: string
  date: string
  description: string
  riskScore: string
  merchant: string
  program: string
}

type StatusFilter = "all" | Transaction["status"]

// ========================================
// MOCK DATA
// ========================================

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "1", transactionRef: "txn_a1b2c3d4", customer: "Alice Johnson", email: "alice@company.com", amount: 125000, currency: "USD", status: "succeeded", method: "Visa •••• 4242", channel: "Online", date: "2026-03-09", description: "Monthly subscription", riskScore: "Low", merchant: "Acme Corp", program: "Default" },
  { id: "2", transactionRef: "txn_e5f6g7h8", customer: "Bob Smith", email: "bob@startup.io", amount: 89900, currency: "USD", status: "succeeded", method: "Mastercard •••• 5555", channel: "Online", date: "2026-03-09", description: "One-time purchase", riskScore: "Low", merchant: "TechStore", program: "Premium" },
  { id: "3", transactionRef: "txn_i9j0k1l2", customer: "Carol White", email: "carol@shop.eu", amount: 45000, currency: "EUR", status: "pending", method: "SEPA Direct Debit", channel: "Online", date: "2026-03-08", description: "Recurring payment", riskScore: "Medium", merchant: "EuroShop", program: "Default" },
  { id: "4", transactionRef: "txn_m3n4o5p6", customer: "David Brown", email: "david@mail.com", amount: 210000, currency: "USD", status: "failed", method: "Visa •••• 1234", channel: "POS", date: "2026-03-08", description: "Large purchase", riskScore: "High", merchant: "Acme Corp", program: "Enterprise" },
  { id: "5", transactionRef: "txn_q7r8s9t0", customer: "Eve Davis", email: "eve@finance.co", amount: 67500, currency: "GBP", status: "refunded", method: "Amex •••• 0001", channel: "Online", date: "2026-03-07", description: "Returned merchandise", riskScore: "Low", merchant: "LuxBrand", program: "Premium" },
  { id: "6", transactionRef: "txn_u1v2w3x4", customer: "Frank Miller", email: "frank@retail.com", amount: 33300, currency: "USD", status: "succeeded", method: "Visa •••• 9876", channel: "POS", date: "2026-03-07", description: "In-store purchase", riskScore: "Low", merchant: "RetailMax", program: "Default" },
  { id: "7", transactionRef: "txn_y5z6a7b8", customer: "Grace Lee", email: "grace@tech.com", amount: 155000, currency: "USD", status: "disputed", method: "Mastercard •••• 3333", channel: "Online", date: "2026-03-06", description: "Service charge", riskScore: "High", merchant: "Acme Corp", program: "Enterprise" },
  { id: "8", transactionRef: "txn_c9d0e1f2", customer: "Henry Wilson", email: "henry@eu.org", amount: 22000, currency: "EUR", status: "pending", method: "iDEAL", channel: "Online", date: "2026-03-06", description: "Donation", riskScore: "Low", merchant: "CharityOrg", program: "Default" },
  { id: "9", transactionRef: "txn_g3h4i5j6", customer: "Iris Chen", email: "iris@global.co", amount: 480000, currency: "USD", status: "uncaptured", method: "Visa •••• 7777", channel: "Online", date: "2026-03-05", description: "Pre-authorized hold", riskScore: "Medium", merchant: "TechStore", program: "Premium" },
  { id: "10", transactionRef: "txn_k7l8m9n0", customer: "Jack Taylor", email: "jack@store.com", amount: 15900, currency: "GBP", status: "succeeded", method: "Visa •••• 6543", channel: "POS", date: "2026-03-05", description: "Coffee & snacks", riskScore: "Low", merchant: "CafeChain", program: "Default" },
  { id: "11", transactionRef: "txn_o1p2q3r4", customer: "Karen Lopez", email: "karen@biz.com", amount: 99000, currency: "USD", status: "succeeded", method: "Amex •••• 8888", channel: "Online", date: "2026-03-04", description: "Software license", riskScore: "Low", merchant: "Acme Corp", program: "Enterprise" },
  { id: "12", transactionRef: "txn_s5t6u7v8", customer: "Leo Martinez", email: "leo@shop.mx", amount: 37500, currency: "EUR", status: "failed", method: "Mastercard •••• 2222", channel: "Online", date: "2026-03-04", description: "Insufficient funds", riskScore: "Medium", merchant: "EuroShop", program: "Default" },
]

// ========================================
// CONSTANTS
// ========================================

const STATUS_VARIANTS: Record<Transaction["status"], "success" | "warning" | "danger" | "secondary" | "default"> = {
  succeeded: "success",
  pending: "warning",
  failed: "danger",
  refunded: "secondary",
  disputed: "danger",
  uncaptured: "default",
}

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "succeeded", label: "Succeeded" },
  { value: "refunded", label: "Refunded" },
  { value: "disputed", label: "Disputed" },
  { value: "failed", label: "Failed" },
  { value: "uncaptured", label: "Uncaptured" },
]

const formatAmount = (amount: number, currency: string) => {
  const symbols: Record<string, string> = { USD: "$", EUR: "\u20AC", GBP: "\u00A3" }
  return `${symbols[currency] || currency} ${(amount / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

const CURRENCY_OPTIONS_MAP: Record<string, string> = { USD: "$", EUR: "\u20AC", GBP: "\u00A3" }
const METHOD_OPTIONS = [
  { value: "visa", label: "Visa", template: "Visa •••• " },
  { value: "mastercard", label: "Mastercard", template: "Mastercard •••• " },
  { value: "amex", label: "Amex", template: "Amex •••• " },
  { value: "sepa", label: "SEPA Direct Debit", template: "SEPA Direct Debit" },
  { value: "ideal", label: "iDEAL", template: "iDEAL" },
]

// ========================================
// TABLE COLUMNS
// ========================================

const columns: Column<Transaction>[] = [
  {
    key: "amount",
    header: "Amount",
    width: 130,
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
      <Badge variant={STATUS_VARIANTS[item.status]}>
        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
      </Badge>
    ),
  },
  {
    key: "customer",
    header: "Customer",
    width: 160,
    sortable: true,
    render: (item) => (
      <span className="font-medium truncate max-w-[150px] inline-block">{item.customer}</span>
    ),
  },
  {
    key: "description",
    header: "Description",
    width: 180,
    render: (item) => (
      <span className="text-muted-foreground truncate max-w-[170px] inline-block">{item.description}</span>
    ),
  },
  {
    key: "method",
    header: "Payment Method",
    width: 180,
    render: (item) => (
      <span className="text-muted-foreground">{item.method}</span>
    ),
  },
  {
    key: "date",
    header: "Date",
    width: 120,
    sortable: true,
    render: (item) => (
      <span className="text-muted-foreground">{formatDate(item.date)}</span>
    ),
  },
  {
    key: "channel",
    header: "Channel",
    width: 90,
    render: (item) => (
      <span className="text-muted-foreground">{item.channel}</span>
    ),
  },
]

// ========================================
// TABLE ACTIONS
// ========================================

const rowActions: TableAction<Transaction>[] = [
  { key: "view", label: "View Details", onClick: () => {} },
  { key: "copy", label: "Copy ID", onClick: () => {} },
  { key: "refund", label: "Refund", onClick: () => {}, condition: (item) => item.status === "succeeded" },
  { key: "capture", label: "Capture", onClick: () => {}, condition: (item) => item.status === "uncaptured" },
  { key: "retry", label: "Retry", onClick: () => {}, condition: (item) => item.status === "failed" },
]

const hoverActions: TableAction<Transaction>[] = [
  { key: "quick-view", label: "Quick View", icon: <Eye className="h-3.5 w-3.5" />, onClick: () => {} },
  { key: "copy-id", label: "Copy ID", icon: <Copy className="h-3.5 w-3.5" />, onClick: () => {} },
]

// ========================================
// FILTER CONFIG
// ========================================

const PAYMENT_STATUS_OPTIONS = [
  { value: "succeeded", label: "Succeeded" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
  { value: "disputed", label: "Disputed" },
  { value: "uncaptured", label: "Uncaptured" },
] as const

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "CAD", label: "CAD" },
  { value: "AUD", label: "AUD" },
  { value: "JPY", label: "JPY" },
] as const

const PAYMENT_METHOD_OPTIONS = [
  { value: "card", label: "Card" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "digital_wallet", label: "Digital Wallet" },
  { value: "ach", label: "ACH" },
  { value: "wire", label: "Wire Transfer" },
] as const

const CHANNEL_OPTIONS = [
  { value: "online", label: "Online" },
  { value: "pos", label: "POS" },
  { value: "moto", label: "MOTO" },
] as const

const filterConfig: TableFiltersConfig = {
  filters: [
    { type: "amountRange", key: "amount", label: "Amount", currency: "$" },
    { type: "dateRange", key: "dateRange", label: "Date" },
    { type: "multiSelect", key: "status", label: "Status", options: [...PAYMENT_STATUS_OPTIONS] },
    { type: "currency", key: "currency", label: "Currency", options: [...CURRENCY_OPTIONS] },
    { type: "channel", key: "channel", label: "Channel", options: [...CHANNEL_OPTIONS] },
  ] as FilterConfig[],
  additionalFilters: [
    { type: "paymentMethod", key: "paymentMethod", label: "Payment Method", options: [...PAYMENT_METHOD_OPTIONS] },
  ] as FilterConfig[],
  visibleFilters: 5,
  entityType: "payments",
  enableSessionPersistence: false,
}

// ========================================
// DETAIL VIEW CONFIG
// ========================================

const detailConfig: StatusPanelConfig<Transaction> = {
  entityLabel: "Transaction",
  primaryField: "customer",
  secondaryField: "transactionRef",
  secondaryFieldFormatter: (v) => String(v),
}

function getTransactionDetails(txn: Transaction): DetailItem[] {
  return [
    { label: "Transaction ID", value: txn.transactionRef, isCopyable: true },
    { label: "Amount", value: formatAmount(txn.amount, txn.currency) },
    { label: "Currency", value: txn.currency },
    { label: "Status", value: txn.status.charAt(0).toUpperCase() + txn.status.slice(1), showBadge: true, badgeVariant: STATUS_VARIANTS[txn.status] as DetailItem["badgeVariant"] },
    { label: "Description", value: txn.description },
    { label: "Date", value: formatDate(txn.date) },
  ]
}

function getPaymentMethodDetails(txn: Transaction): DetailItem[] {
  return [
    { label: "Method", value: txn.method },
    { label: "Channel", value: txn.channel },
  ]
}

function getCustomerDetails(txn: Transaction): DetailItem[] {
  return [
    { label: "Name", value: txn.customer },
    { label: "Email", value: txn.email },
  ]
}

function getRiskDetails(txn: Transaction): DetailItem[] {
  return [
    { label: "Risk Score", value: txn.riskScore },
    { label: "Merchant", value: txn.merchant },
    { label: "Program", value: txn.program },
  ]
}

// ========================================
// COMPONENT
// ========================================

export function PageSkeletonDemo() {
  // Data state
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS)

  // View state
  const [view, setView] = useState<"list" | "detail">("list")
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  // Quick status filter
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  // Table state
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortState | null>(null)
  const [, setTableFilters] = useState<Record<string, unknown>>({})

  // Page size
  const [pageSize, setPageSize] = useState(10)

  // Add sheet state
  const [addSheetOpen, setAddSheetOpen] = useState(false)
  const [addCustomer, setAddCustomer] = useState("")
  const [addEmail, setAddEmail] = useState("")
  const [addAmount, setAddAmount] = useState("")
  const [addCurrency, setAddCurrency] = useState("USD")
  const [addMethod, setAddMethod] = useState("visa")
  const [addChannel, setAddChannel] = useState("Online")
  const [addDescription, setAddDescription] = useState("")

  const resetAddForm = () => {
    setAddCustomer("")
    setAddEmail("")
    setAddAmount("")
    setAddCurrency("USD")
    setAddMethod("visa")
    setAddChannel("Online")
    setAddDescription("")
  }

  const handleCreate = () => {
    const id = String(Date.now())
    const ref = `txn_${id.slice(-8)}`
    const methodInfo = METHOD_OPTIONS.find((m) => m.value === addMethod)
    const methodLabel = methodInfo
      ? methodInfo.template + (["visa", "mastercard", "amex"].includes(addMethod) ? String(Math.floor(1000 + Math.random() * 9000)) : "")
      : addMethod
    const today = new Date().toISOString().slice(0, 10)

    const newTxn: Transaction = {
      id,
      transactionRef: ref,
      customer: addCustomer || "New Customer",
      email: addEmail || "new@example.com",
      amount: Math.round((parseFloat(addAmount) || 0) * 100),
      currency: addCurrency,
      status: "pending",
      method: methodLabel,
      channel: addChannel,
      date: today,
      description: addDescription || "New transaction",
      riskScore: "Low",
      merchant: "Acme Corp",
      program: "Default",
    }

    setTransactions((prev) => [newTxn, ...prev])
    resetAddForm()
    setAddSheetOpen(false)

    // Navigate to the detail view for the newly created transaction
    setSelectedTransaction(newTxn)
    setView("detail")
  }

  // Computed: status counts for quick filter badges
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: transactions.length }
    for (const txn of transactions) {
      counts[txn.status] = (counts[txn.status] || 0) + 1
    }
    return counts
  }, [transactions])

  // Computed: filtered data
  const filteredData = useMemo(() => {
    let data = transactions

    // Apply quick status filter
    if (statusFilter !== "all") {
      data = data.filter((t) => t.status === statusFilter)
    }

    return data
  }, [statusFilter, transactions])

  // Paginated data
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, page, pageSize])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))

  const handleRowClick = useCallback((item: Transaction) => {
    setSelectedTransaction(item)
    setView("detail")
  }, [])

  const handleBack = useCallback(() => {
    setView("list")
    setSelectedTransaction(null)
  }, [])

  const handleNavigate = useCallback((direction: "prev" | "next") => {
    if (!selectedTransaction) return
    const idx = filteredData.findIndex((t) => t.id === selectedTransaction.id)
    const newIdx = direction === "prev" ? idx - 1 : idx + 1
    if (newIdx >= 0 && newIdx < filteredData.length) {
      setSelectedTransaction(filteredData[newIdx])
    }
  }, [selectedTransaction, filteredData])

  // ===== DETAIL VIEW =====
  if (view === "detail" && selectedTransaction) {
    const idx = filteredData.findIndex((t) => t.id === selectedTransaction.id)

    return (
      <div>
        <EntityDetailPage
          entity={selectedTransaction}
          config={detailConfig}
          status={selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
          statusVariant={STATUS_VARIANTS[selectedTransaction.status]}
          metadata={
            <>
              <span className="tabular-nums">{formatAmount(selectedTransaction.amount, selectedTransaction.currency)}</span>
              <span>{formatDate(selectedTransaction.date)}</span>
            </>
          }
          actions={
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground"
              onClick={handleBack}
            >
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back to list
            </Button>
          }
          onBack={handleBack}
          totalItems={filteredData.length}
          navigatePrevious={() => handleNavigate("prev")}
          navigateNext={() => handleNavigate("next")}
          canNavigatePrevious={idx > 0}
          canNavigateNext={idx < filteredData.length - 1}
        >
          <SectionCard title="Transaction Details" isDetailView>
            <div>
              {getTransactionDetails(selectedTransaction).map((item, i) => (
                <DetailRow
                  key={i}
                  label={item.label}
                  value={item.value}
                  isDetailView
                  isCopyable={item.isCopyable}
                  showBadge={item.showBadge}
                  badgeVariant={item.badgeVariant}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Payment Method" isDetailView>
            <div>
              {getPaymentMethodDetails(selectedTransaction).map((item, i) => (
                <DetailRow key={i} label={item.label} value={item.value} isDetailView />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Customer" isDetailView>
            <div>
              {getCustomerDetails(selectedTransaction).map((item, i) => (
                <DetailRow key={i} label={item.label} value={item.value} isDetailView />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Risk & Routing" isDetailView>
            <div>
              {getRiskDetails(selectedTransaction).map((item, i) => (
                <DetailRow key={i} label={item.label} value={item.value} isDetailView />
              ))}
            </div>
          </SectionCard>
        </EntityDetailPage>
      </div>
    )
  }

  // ===== LIST VIEW =====
  return (
    <div className="space-y-0">
      {/* Title + Add button */}
      <div className="flex items-center gap-5 mb-6">
        <h3 className="page-title">Skeleton</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-foreground focus-visible:ring-offset-0"
              aria-label="Create new"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wide">
              Transactions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setAddSheetOpen(true)}>
              Add transaction
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Quick status filter cards */}
      <div className="flex gap-2 mb-4 w-full">
        {STATUS_FILTERS.map((sf) => {
          const isActive = statusFilter === sf.value
          return (
            <button
              key={sf.value}
              className={`cursor-pointer transition-all rounded-xl w-[140px] shrink-0 p-4 flex flex-col items-start gap-1 border ${
                isActive
                  ? "bg-primary/10 border-primary/20"
                  : "bg-card border-transparent hover:border-border"
              }`}
              onClick={() => {
                setStatusFilter(sf.value)
                setPage(1)
                setSelectedItems([])
              }}
            >
              <span className={`text-xl font-mono font-bold leading-tight ${
                isActive ? "text-primary" : "text-foreground"
              }`}>
                {statusCounts[sf.value] ?? 0}
              </span>
              <span className={`text-xs font-mono uppercase tracking-wide leading-tight whitespace-nowrap ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}>
                {sf.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Regular filters */}
      <TableFilters
        config={filterConfig}
        onFiltersChange={setTableFilters}
        hasSelection={selectedItems.length > 0}
        selectedCount={selectedItems.length}
        onSelectionCancel={() => setSelectedItems([])}
        onSelectionFlag={() => {}}
        onClearSelection={() => setSelectedItems([])}
        currentPageSize={pageSize}
        onPageSizeChange={setPageSize}
        availablePageSizes={[5, 10, 25]}
      />

      {/* Data table */}
      <div className="border rounded-xl overflow-hidden bg-card">
        <DataTable
          data={paginatedData}
          columns={columns}
          getItemId={(item) => item.id}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          onRowClick={handleRowClick}
          activeItemId={selectedTransaction?.id}
          rowActions={rowActions}
          hoverActions={hoverActions}
          sort={sort}
          onSortChange={setSort}
          pagination={totalPages > 1 ? {
            currentPage: page,
            totalPages,
            onPageChange: setPage,
          } : undefined}
        />
      </div>

      {/* Add Transaction Sheet */}
      <EditSheet
        open={addSheetOpen}
        onOpenChange={setAddSheetOpen}
        title="Add Transaction"
        description="Create a new transaction entry."
        onSave={handleCreate}
        onCancel={resetAddForm}
        saveLabel="Create"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Customer Name</Label>
            <Input
              placeholder="e.g. Alice Johnson"
              value={addCustomer}
              onChange={(e) => setAddCustomer(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="e.g. alice@company.com"
              value={addEmail}
              onChange={(e) => setAddEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder={`e.g. 1250.00`}
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={addCurrency} onValueChange={setAddCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CURRENCY_OPTIONS_MAP).map(([code, symbol]) => (
                    <SelectItem key={code} value={code}>
                      {code} ({symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select value={addMethod} onValueChange={setAddMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {METHOD_OPTIONS.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Channel</Label>
              <Select value={addChannel} onValueChange={setAddChannel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="POS">POS</SelectItem>
                  <SelectItem value="MOTO">MOTO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Transaction description..."
              value={addDescription}
              onChange={(e) => setAddDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </EditSheet>
    </div>
  )
}
