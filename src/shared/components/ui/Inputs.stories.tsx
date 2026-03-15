import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@shared/components/ui/input'
import { Label } from '@shared/components/ui/label'
import { Textarea } from '@shared/components/ui/textarea'
import { Checkbox } from '@shared/components/ui/checkbox'
import { Switch } from '@shared/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select'

const meta = {
  title: 'UI Primitives/Inputs',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const TextInput: Story = {
  render: () => (
    <div className="w-[320px] space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
    </div>
  ),
}

export const TextArea: Story = {
  render: () => (
    <div className="w-[320px] space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea id="description" placeholder="Enter a description..." rows={4} />
    </div>
  ),
}

export const CheckboxField: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const SwitchField: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
}

export const SelectField: Story = {
  render: () => (
    <div className="w-[320px] space-y-2">
      <Label>Status</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="w-[400px] space-y-4 p-6 bg-card rounded-lg border">
      <div className="space-y-2">
        <Label htmlFor="name">Merchant Name</Label>
        <Input id="name" placeholder="Enter merchant name" />
      </div>
      <div className="space-y-2">
        <Label>Category</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="food">Food & Beverage</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" placeholder="Additional notes..." rows={3} />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="verified" />
        <Label htmlFor="verified">Mark as verified</Label>
      </div>
    </div>
  ),
}
