import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@shared/components/ui/card'
import { Button } from '@shared/components/ui/button'
import { Badge } from '@shared/components/ui/badge'

const meta = {
  title: 'UI Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A description of the card's purpose.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is the main content area of the card component.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transaction</CardTitle>
          <Badge variant="success">Approved</Badge>
        </div>
        <CardDescription>TXN-2024-00142</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-medium">€1,250.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span>Mar 15, 2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Merchant</span>
            <span>Acme Corp</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}

export const Compact: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card className="w-[200px] p-4">
        <p className="text-sm text-muted-foreground font-mono uppercase">Total Volume</p>
        <p className="text-2xl font-medium mt-1">€24,500</p>
      </Card>
      <Card className="w-[200px] p-4">
        <p className="text-sm text-muted-foreground font-mono uppercase">Transactions</p>
        <p className="text-2xl font-medium mt-1">1,482</p>
      </Card>
      <Card className="w-[200px] p-4">
        <p className="text-sm text-muted-foreground font-mono uppercase">Approval Rate</p>
        <p className="text-2xl font-medium mt-1">97.3%</p>
      </Card>
    </div>
  ),
}
