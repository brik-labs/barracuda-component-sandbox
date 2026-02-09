export const Z_INDEX_CLASSES = {
  BASE: 'z-10',
  TABLE_STICKY: 'z-30',
  STICKY_HEADER: 'z-40',
  SIDEBAR: 'z-40',
  PANEL: 'z-[45]',
  POPOVER: 'z-50',
  MODAL: 'z-[90]',
  SHEET: 'z-[90]',
  NESTED_MODAL: 'z-[100]',
  DROPDOWN: 'z-[110]',
  OVERLAY: 'z-[120]',
  MODAL_POPOVER: 'z-[130]',
  NESTED_DROPDOWN: 'z-[140]',
} as const

export const getZIndexClass = (layer: keyof typeof Z_INDEX_CLASSES): string => {
  return Z_INDEX_CLASSES[layer]
}
