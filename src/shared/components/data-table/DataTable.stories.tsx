import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from '@shared/components/data-table'
import type { Column, SortState } from '@shared/types/data-table'
import { useState } from 'react'
import { Badge } from '@shared/components/ui/badge'

interface Payment {
  id: string
  merchant: string
  amount: number
  status: string
  date: string
}

const sampleData: Payment[] = [
  { id: 'TXN-001', merchant: 'Acme Corp', amount: 1250.00, status: 'approved', date: '2026-03-15' },
  { id: 'TXN-002', merchant: 'Global Trade', amount: 850.50, status: 'pending', date: '2026-03-14' },
  { id: 'TXN-003', merchant: 'FastPay Ltd', amount: 3200.00, status: 'approved', date: '2026-03-13' },
  { id: 'TXN-004', merchant: 'TechVentures', amount: 475.25, status: 'declined', date: '2026-03-12' },
  { id: 'TXN-005', merchant: 'RetailMax', amount: 2100.75, status: 'approved', date: '2026-03-11' },
  { id: 'TXN-006', merchant: 'Metro Store', amount: 680.00, status: 'pending', date: '2026-03-10' },
  { id: 'TXN-007', merchant: 'CloudSoft', amount: 1890.30, status: 'approved', date: '2026-03-09' },
  { id: 'TXN-008', merchant: 'DataBridge', amount: 950.00, status: 'declined', date: '2026-03-08' },
]

const columns: Column<Payment>[] = [
  {
    key: 'id',
    header: 'Transaction ID',
    sortable: true,
    render: (row) => <span className="font-mono text-sm">{row.id}</span>,
  },
  {
    key: 'merchant',
    header: 'Merchant',
    sortable: true,
    render: (row) => <span>{row.merchant}</span>,
  },
  {
    key: 'amount',
    header: 'Amount',
    sortable: true,
    align: 'right',
    render: (row) => <span className="font-medium">€{row.amount.toLocaleString('en', { minimumFractionDigits: 2 })}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (row) => {
      const variant = row.status === 'approved' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'
      return <Badge variant={variant}>{row.status}</Badge>
    },
  },
  {
    key: 'date',
    header: 'Date',
    sortable: true,
    render: (row) => <span>{row.date}</span>,
  },
]

const meta = {
  title: 'Composed/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [sort, setSort] = useState<SortState | null>(null)

    return (
      <div className="bg-card rounded-lg border p-0">
        <DataTable<Payment>
          data={sampleData}
          columns={columns}
          getItemId={(row) => row.id}
          sort={sort}
          onSortChange={setSort}
        />
      </div>
    )
  },
  args: {} as any,
}

export const WithPagination: Story = {
  render: () => {
    const [sort, setSort] = useState<SortState | null>(null)
    const [page, setPage] = useState(1)
    const pageSize = 5
    const paged = sampleData.slice((page - 1) * pageSize, page * pageSize)

    return (
      <div className="bg-card rounded-lg border p-0">
        <DataTable<Payment>
          data={paged}
          columns={columns}
          getItemId={(row) => row.id}
          sort={sort}
          onSortChange={setSort}
          pagination={{
            currentPage: page,
            totalPages: Math.ceil(sampleData.length / pageSize),
            onPageChange: setPage,
          }}
        />
      </div>
    )
  },
  args: {} as any,
}

export const Loading: Story = {
  render: () => (
    <div className="bg-card rounded-lg border p-0">
      <DataTable<Payment>
        data={[]}
        columns={columns}
        getItemId={(row) => row.id}
        loading={true}
      />
    </div>
  ),
  args: {} as any,
}

export const Empty: Story = {
  render: () => (
    <div className="bg-card rounded-lg border p-0">
      <DataTable<Payment>
        data={[]}
        columns={columns}
        getItemId={(row) => row.id}
        emptyTitle="No transactions found"
        emptyDescription="Try adjusting your filters or create a new transaction."
      />
    </div>
  ),
  args: {} as any,
}
