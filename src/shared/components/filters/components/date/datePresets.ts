export const DATE_PRESET_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last-7-days', label: 'Last 7 days' },
  { value: 'last-30-days', label: 'Last 30 days' },
  { value: 'last-week', label: 'Last week' },
  { value: 'last-month', label: 'Last month' },
] as const

export type DatePresetValue = typeof DATE_PRESET_OPTIONS[number]['value']
