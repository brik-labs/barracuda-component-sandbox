import { AppProviders } from '@/providers/AppProviders'
import { ComponentShowcase } from './ComponentShowcase'

export function App() {
  return (
    <AppProviders>
      <div className="min-h-screen bg-background">
        <ComponentShowcase />
      </div>
    </AppProviders>
  )
}
