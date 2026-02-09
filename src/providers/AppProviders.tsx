import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@shared/components/ui/tooltip'
import { ThemeProvider } from './theme-provider'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <TooltipProvider>
        {children}
        <Toaster position="top-right" />
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default AppProviders
