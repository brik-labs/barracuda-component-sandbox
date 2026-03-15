import type { Meta, StoryObj } from '@storybook/react'
import { EditSheet } from '@shared/components/edit-sheet'
import { Input } from '@shared/components/ui/input'
import { Label } from '@shared/components/ui/label'
import { Textarea } from '@shared/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select'
import { Button } from '@shared/components/ui/button'
import { useState } from 'react'

const meta = {
  title: 'Composed/EditSheet',
  component: EditSheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Edit Merchant</Button>
        <EditSheet
          open={open}
          onOpenChange={setOpen}
          title="Edit Merchant"
          description="Update merchant details and configuration."
          onSave={() => {
            console.log('Saved!')
            setOpen(false)
          }}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="merchant-name">Merchant Name</Label>
              <Input id="merchant-name" defaultValue="Acme Corp" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select defaultValue="retail">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="merchant-notes">Notes</Label>
              <Textarea id="merchant-notes" placeholder="Additional notes..." rows={4} />
            </div>
          </div>
        </EditSheet>
      </>
    )
  },
  args: {} as any,
}

export const AddNew: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button variant="action" onClick={() => setOpen(true)}>+ Add Payment</Button>
        <EditSheet
          open={open}
          onOpenChange={setOpen}
          title="Add Payment"
          description="Create a new payment transaction."
          saveLabel="Create"
          onSave={() => {
            console.log('Created!')
            setOpen(false)
          }}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (€)</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input id="recipient" placeholder="Enter recipient name" />
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="wallet">Digital Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </EditSheet>
      </>
    )
  },
  args: {} as any,
}
