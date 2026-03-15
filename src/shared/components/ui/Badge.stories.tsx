import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@shared/components/ui/badge'

const meta = {
  title: 'UI Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'secondary', 'outline', 'destructive'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Active',
    variant: 'default',
  },
}

export const Success: Story = {
  args: {
    children: 'Approved',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    children: 'Pending',
    variant: 'warning',
  },
}

export const Danger: Story = {
  args: {
    children: 'Failed',
    variant: 'danger',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Active</Badge>
      <Badge variant="success">Approved</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger">Failed</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Review</Badge>
      <Badge variant="destructive">Rejected</Badge>
    </div>
  ),
}
