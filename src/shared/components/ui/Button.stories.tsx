import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@shared/components/ui/button'
import { CirclePlus, Trash2, Settings, Download } from 'lucide-react'

const meta = {
  title: 'UI Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'action', 'action-outline'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'action'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
}

export const Action: Story = {
  args: {
    children: 'Create New',
    variant: 'action',
  },
}

export const ActionOutline: Story = {
  args: {
    children: 'Cancel',
    variant: 'action-outline',
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'action',
    children: (
      <>
        <CirclePlus />
        <span>Add Item</span>
      </>
    ),
  },
}

export const IconOnly: Story = {
  args: {
    variant: 'ghost',
    size: 'icon',
    children: <Settings />,
    'aria-label': 'Settings',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="destructive"><Trash2 /> Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="action"><CirclePlus /> Create</Button>
      <Button variant="action-outline">Cancel</Button>
      <Button variant="ghost" size="icon"><Download /></Button>
    </div>
  ),
}
