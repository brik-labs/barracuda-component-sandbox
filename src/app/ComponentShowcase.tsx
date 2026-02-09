import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@shared/components/ui/hooks/use-theme'
import { Button } from '@shared/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@shared/components/ui/card'
import { Input } from '@shared/components/ui/input'
import { Label } from '@shared/components/ui/label'
import { Badge } from '@shared/components/ui/badge'
import { Separator } from '@shared/components/ui/separator'
import { Checkbox } from '@shared/components/ui/checkbox'
import { Switch } from '@shared/components/ui/switch'
import { Textarea } from '@shared/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shared/components/ui/tabs'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@shared/components/ui/select'
import { Progress } from '@shared/components/ui/progress'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@shared/components/ui/table'
import { SampleMetricCard } from '@/components/SampleMetricCard'

export function ComponentShowcase() {
  const { theme, setTheme } = useTheme()
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [switchChecked, setSwitchChecked] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="page-title">Component Sandbox</h1>
          <p className="text-muted-foreground mt-1">
            Build and preview components using the shared design system
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <Separator className="mb-10" />

      {/* Sample Component */}
      <section className="mb-10">
        <h2 className="section-header mb-4">Your Component</h2>
        <p className="text-sm text-muted-foreground mb-6">
          This is a sample component built with the shared primitives. Create your own in <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">src/components/</code>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SampleMetricCard
            title="Total Revenue"
            value="$48,290"
            change="+12.5%"
            trend="up"
          />
          <SampleMetricCard
            title="Active Users"
            value="2,847"
            change="+4.2%"
            trend="up"
          />
          <SampleMetricCard
            title="Churn Rate"
            value="1.8%"
            change="-0.3%"
            trend="down"
          />
        </div>
      </section>

      <Separator className="mb-10" />

      {/* UI Primitives Gallery */}
      <section>
        <h2 className="section-header mb-6">UI Primitives</h2>

        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          {/* Buttons Tab */}
          <TabsContent value="buttons">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Buttons</CardTitle>
                <CardDescription>Button variants and sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Button>Default</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="action">Action</Button>
                  <Button variant="action-outline">Action Outline</Button>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inputs Tab */}
          <TabsContent value="inputs">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Form Controls</CardTitle>
                <CardDescription>Inputs, selects, and toggles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Text Input</Label>
                    <Input placeholder="Enter text..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Select</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose option..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="opt1">Option 1</SelectItem>
                        <SelectItem value="opt2">Option 2</SelectItem>
                        <SelectItem value="opt3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Textarea</Label>
                  <Textarea placeholder="Enter a longer message..." />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={checkboxChecked}
                      onCheckedChange={(v) => setCheckboxChecked(v === true)}
                    />
                    <Label>Checkbox</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={switchChecked}
                      onCheckedChange={setSwitchChecked}
                    />
                    <Label>Switch</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display Tab */}
          <TabsContent value="display">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Display Elements</CardTitle>
                <CardDescription>Badges, progress, and separators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-3 block">Badges</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="mb-3 block">Progress</Label>
                  <div className="space-y-3">
                    <Progress value={25} className="h-2" />
                    <Progress value={60} className="h-2" />
                    <Progress value={90} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Table</CardTitle>
                <CardDescription>Table component with styled headers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV-001</TableCell>
                      <TableCell><Badge variant="success">Paid</Badge></TableCell>
                      <TableCell>$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">INV-002</TableCell>
                      <TableCell><Badge variant="warning">Pending</Badge></TableCell>
                      <TableCell>$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">INV-003</TableCell>
                      <TableCell><Badge variant="danger">Overdue</Badge></TableCell>
                      <TableCell>$350.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
