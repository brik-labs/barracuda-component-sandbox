import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@shared/components/ui/hooks/use-theme';
import { Button } from '@shared/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@shared/components/ui/card';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import { Badge } from '@shared/components/ui/badge';
import { Separator } from '@shared/components/ui/separator';
import { Checkbox } from '@shared/components/ui/checkbox';
import { Switch } from '@shared/components/ui/switch';
import { Textarea } from '@shared/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shared/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@shared/components/ui/select';
import { Progress } from '@shared/components/ui/progress';
import { SampleMetricCard } from '@/components/SampleMetricCard';

// Filter components
import { DateFilter } from '@shared/components/filters/components/date';
import { AmountFilterDropdown } from '@shared/components/filters/components/amount';
import { MultiSelectFilter } from '@shared/components/filters/base/MultiSelectFilter';
import { SearchableSelectFilter } from '@shared/components/filters/base/SearchableSelectFilter';
import {
	BankFilter,
	ChannelFilter,
	CurrencyFilter,
	ProcessorFilter,
} from '@shared/components/filters/components/FilterFactory';
import { SelectionActions } from '@shared/components/filters/components/SelectionActions';
import { DatePicker, DateRangePicker } from '@shared/components/ui/date-picker';
import type { DateFilterValue } from '@shared/types/dateFilter';
import type { AmountFilterValue } from '@shared/types/amountFilter';
import type { DateRange } from 'react-day-picker';

import ruleBuilderData from '@/data/rule-builder-data.json';
import RuleBuilder from '@/shared/components/rule-builder/rule-builder';
import RuleBuilderModal from '@/shared/components/rule-builder-modal/rule-builder-modal';

import { DataTableDemo } from './demos/DataTableDemo';
import { DetailViewDemo } from './demos/DetailViewDemo';
import { EditPatternsDemo } from './demos/EditPatternsDemo';
import { AddPatternDemo } from './demos/AddPatternDemo';
import { ChartsDemo } from './demos/ChartsDemo';
import { PageSkeletonDemo } from './demos/PageSkeletonDemo';

export function ComponentShowcase() {
	const { theme, setTheme } = useTheme();
	const [checkboxChecked, setCheckboxChecked] = useState(false);
	const [switchChecked, setSwitchChecked] = useState(false);

	// Filter states
	const [dateFilterValue, setDateFilterValue] = useState<DateFilterValue | null>(null);
	const [datePresetValue, setDatePresetValue] = useState<string | null>(null);
	const [amountValue, setAmountValue] = useState<AmountFilterValue | null>(null);
	const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
	const [searchSelectValue, setSearchSelectValue] = useState<string | null>(null);
	const [bankValue, setBankValue] = useState<string | null>(null);
	const [channelValue, setChannelValue] = useState<string[]>([]);
	const [currencyValue, setCurrencyValue] = useState<string | null>(null);
	const [processorValue, setProcessorValue] = useState<string[]>([]);
	const [selectionCount, setSelectionCount] = useState(3);

	// Date picker states
	const [pickerDate, setPickerDate] = useState<Date | undefined>(undefined);
	const [pickerDateRange, setPickerDateRange] = useState<DateRange | undefined>(undefined);

	return (
		<div className='max-w-5xl mx-auto px-6 py-10'>
			{/* Header */}
			<div className='flex items-center justify-between mb-10'>
				<div>
					<h1 className='page-title'>Component Sandbox</h1>
					<p className='text-muted-foreground mt-1'>
						Build and preview components using the shared design system
					</p>
				</div>
				<Button variant='outline' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
					{theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
				</Button>
			</div>

			<Separator className='mb-10' />

			{/* ===== UI Primitives ===== */}
			<section className='mb-10'>
				<h2 className='section-header mb-6'>UI Primitives</h2>

				<Tabs defaultValue='display' className='w-full'>
					<TabsList className='mb-6'>
						<TabsTrigger value='display'>Display</TabsTrigger>
						<TabsTrigger value='buttons'>Buttons</TabsTrigger>
						<TabsTrigger value='inputs'>Inputs</TabsTrigger>
						<TabsTrigger value='filters'>Filters</TabsTrigger>
						<TabsTrigger value='charts'>Charts</TabsTrigger>
					</TabsList>

					{/* Buttons Tab */}
					<TabsContent value='buttons'>
						<div className='space-y-6'>
							<div>
								<h3 className='text-base font-semibold mb-3'>Variants</h3>
								<div className='flex flex-wrap gap-3'>
									<Button>Default</Button>
									<Button variant='destructive'>Destructive</Button>
									<Button variant='outline'>Outline</Button>
									<Button variant='secondary'>Secondary</Button>
									<Button variant='ghost'>Ghost</Button>
									<Button variant='link'>Link</Button>
								</div>
							</div>
							<div>
								<h3 className='text-base font-semibold mb-3'>Action Variants</h3>
								<div className='flex flex-wrap gap-3'>
									<Button variant='action'>Action</Button>
									<Button variant='action-outline'>Action Outline</Button>
								</div>
							</div>
							<div>
								<h3 className='text-base font-semibold mb-3'>Sizes</h3>
								<div className='flex flex-wrap gap-3 items-center'>
									<Button size='sm'>Small</Button>
									<Button size='default'>Default</Button>
									<Button size='lg'>Large</Button>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Display Tab */}
					<TabsContent value='display'>
						<div className='space-y-6'>
							<div>
								<h3 className='text-base font-semibold mb-3'>Badges</h3>
								<div className='flex flex-wrap gap-2'>
									<Badge>Default</Badge>
									<Badge variant='success'>Success</Badge>
									<Badge variant='warning'>Warning</Badge>
									<Badge variant='danger'>Danger</Badge>
									<Badge variant='secondary'>Secondary</Badge>
								</div>
							</div>
							<Separator />
							<div>
								<h3 className='text-base font-semibold mb-3'>Progress</h3>
								<div className='space-y-3'>
									<Progress value={25} className='h-2' />
									<Progress value={60} className='h-2' />
									<Progress value={90} className='h-2' />
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Inputs Tab */}
					<TabsContent value='inputs'>
						<div className='space-y-6'>
							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label>Text Input</Label>
									<Input placeholder='Enter text...' />
								</div>
								<div className='space-y-2'>
									<Label>Select</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder='Choose option...' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='opt1'>Option 1</SelectItem>
											<SelectItem value='opt2'>Option 2</SelectItem>
											<SelectItem value='opt3'>Option 3</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className='space-y-2'>
								<Label>Textarea</Label>
								<Textarea placeholder='Enter a longer message...' />
							</div>
							<div className='flex items-center gap-6'>
								<div className='flex items-center gap-2'>
									<Checkbox
										checked={checkboxChecked}
										onCheckedChange={(v) => setCheckboxChecked(v === true)}
									/>
									<Label>Checkbox</Label>
								</div>
								<div className='flex items-center gap-2'>
									<Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
									<Label>Switch</Label>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Filters Tab */}
					<TabsContent value='filters'>
						<div className='space-y-8'>
							<div>
								<h3 className='text-base font-semibold mb-3'>Date Filters</h3>
								<div className='space-y-6'>
									<div>
										<Label className='mb-3 block text-sm text-muted-foreground font-normal'>
											Full mode (operators: equal, before, after, between, last)
										</Label>
										<div className='flex flex-wrap gap-3 items-start'>
											<DateFilter
												mode='full'
												label='Created Date'
												value={dateFilterValue}
												onChange={setDateFilterValue}
											/>
											{dateFilterValue && (
												<code className='text-xs bg-muted px-2 py-1 rounded mt-1'>
													{JSON.stringify(dateFilterValue)}
												</code>
											)}
										</div>
									</div>
									<div>
										<Label className='mb-3 block text-sm text-muted-foreground font-normal'>
											Select mode (preset options: today, last 7 days, etc.)
										</Label>
										<div className='flex flex-wrap gap-3 items-start'>
											<DateFilter
												mode='select'
												label='Date Range'
												value={datePresetValue}
												onChange={setDatePresetValue}
											/>
											{datePresetValue && (
												<code className='text-xs bg-muted px-2 py-1 rounded mt-1'>
													{datePresetValue}
												</code>
											)}
										</div>
									</div>
								</div>
							</div>

							<Separator />

							<div>
								<h3 className='text-base font-semibold mb-3'>Date Pickers</h3>
								<div className='space-y-6'>
									<div className='grid grid-cols-2 gap-6'>
										<div>
											<Label className='mb-3 block text-sm text-muted-foreground font-normal'>
												Single date picker
											</Label>
											<DatePicker
												date={pickerDate}
												onSelect={setPickerDate}
												placeholder='Pick a date'
												clearable
											/>
										</div>
										<div>
											<Label className='mb-3 block text-sm text-muted-foreground font-normal'>
												Compact variant
											</Label>
											<DatePicker date={pickerDate} onSelect={setPickerDate} variant='compact' />
										</div>
									</div>
									<div>
										<Label className='mb-3 block text-sm text-muted-foreground font-normal'>
											Date range picker (2 months)
										</Label>
										<DateRangePicker
											dateRange={pickerDateRange}
											onSelect={setPickerDateRange}
											placeholder='Select date range'
											numberOfMonths={2}
											className='w-[300px]'
										/>
									</div>
								</div>
							</div>

							<Separator />

							<div>
								<h3 className='text-base font-semibold mb-3'>Amount Filter</h3>
								<div className='flex flex-wrap gap-3 items-start'>
									<AmountFilterDropdown
										value={amountValue}
										onChange={setAmountValue}
										currency='$'
										filterConfig={{ key: 'amount', label: 'Amount', type: 'amountRange' }}
									/>
									{amountValue && (
										<code className='text-xs bg-muted px-2 py-1 rounded mt-1'>
											{JSON.stringify(amountValue)}
										</code>
									)}
								</div>
							</div>

							<Separator />

							<div>
								<h3 className='text-base font-semibold mb-3'>Select Filters</h3>
								<div className='space-y-6'>
									<div>
										<Label className='mb-3 block text-sm text-muted-foreground font-normal'>
											Multi-select filter (checkbox-based)
										</Label>
										<div className='flex flex-wrap gap-3 items-start'>
											<MultiSelectFilter
												options={[
													{ value: 'pending', label: 'Pending' },
													{ value: 'approved', label: 'Approved' },
													{ value: 'declined', label: 'Declined' },
													{ value: 'refunded', label: 'Refunded' },
												]}
												value={multiSelectValue}
												onChange={(v) => setMultiSelectValue(v || [])}
												filterConfig={{ key: 'status', label: 'Status', type: 'multiSelect' }}
											/>
											{multiSelectValue.length > 0 && (
												<code className='text-xs bg-muted px-2 py-1 rounded mt-1'>
													[{multiSelectValue.join(', ')}]
												</code>
											)}
										</div>
									</div>
									<div>
										<Label className='mb-3 block text-sm text-muted-foreground font-normal'>
											Searchable single-select filter
										</Label>
										<div className='flex flex-wrap gap-3 items-start'>
											<SearchableSelectFilter
												options={[
													{ value: 'us', label: 'United States' },
													{ value: 'ca', label: 'Canada' },
													{ value: 'uk', label: 'United Kingdom' },
													{ value: 'de', label: 'Germany' },
													{ value: 'fr', label: 'France' },
													{ value: 'au', label: 'Australia' },
													{ value: 'jp', label: 'Japan' },
												]}
												value={searchSelectValue}
												onChange={setSearchSelectValue}
												filterConfig={{ key: 'country', label: 'Country', type: 'select' }}
												searchPlaceholder='Search countries...'
											/>
											{searchSelectValue && (
												<code className='text-xs bg-muted px-2 py-1 rounded mt-1'>
													{searchSelectValue}
												</code>
											)}
										</div>
									</div>
								</div>
							</div>

							<Separator />

							<div>
								<h3 className='text-base font-semibold mb-3'>Factory Filters</h3>
								<div className='flex flex-wrap gap-3'>
									<BankFilter
										value={bankValue}
										onChange={(v) => setBankValue(v as string | null)}
									/>
									<ChannelFilter
										value={channelValue}
										onChange={(v) => setChannelValue((v as string[]) || [])}
									/>
									<CurrencyFilter
										value={currencyValue}
										onChange={(v) => setCurrencyValue(v as string | null)}
									/>
									<ProcessorFilter
										value={processorValue}
										onChange={(v) => setProcessorValue((v as string[]) || [])}
									/>
								</div>
							</div>

							<Separator />

							<div>
								<h3 className='text-base font-semibold mb-3'>Selection Actions</h3>
								<div className='space-y-4'>
									<div className='flex items-center gap-3'>
										<Label className='text-sm text-muted-foreground font-normal'>Selected count:</Label>
										<div className='flex items-center gap-2'>
											<Button
												variant='outline'
												size='sm'
												onClick={() => setSelectionCount(Math.max(1, selectionCount - 1))}>
												-
											</Button>
											<span className='text-sm font-medium w-6 text-center'>
												{selectionCount}
											</span>
											<Button
												variant='outline'
												size='sm'
												onClick={() => setSelectionCount(selectionCount + 1)}>
												+
											</Button>
										</div>
									</div>
									<SelectionActions
										selectedCount={selectionCount}
										entityType='transaction'
										onCancel={() => {}}
										onFlag={() => {}}
										onExport={() => {}}
										onClearSelection={() => setSelectionCount(0)}
									/>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Charts Tab */}
					<TabsContent value='charts'>
						<ChartsDemo />
					</TabsContent>
				</Tabs>
			</section>

			<Separator className='mb-10' />

			{/* ===== Page Components ===== */}
			<section>
				<h2 className='section-header mb-6'>Page Components</h2>

				<Tabs defaultValue='data-table' className='w-full'>
					<TabsList className='mb-6'>
						<TabsTrigger value='data-table'>Data Table</TabsTrigger>
						<TabsTrigger value='detail-view'>Detail View</TabsTrigger>
						<TabsTrigger value='add-pattern'>Add Pattern</TabsTrigger>
						<TabsTrigger value='edit-patterns'>Edit Patterns</TabsTrigger>
						<TabsTrigger value='rules'>Rules</TabsTrigger>
						<TabsTrigger value='info-box'>Info Box</TabsTrigger>
					</TabsList>

					{/* Info Box Tab */}
					<TabsContent value='info-box'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<SampleMetricCard title='Total Revenue' value='$48,290' change='+12.5%' trend='up' />
							<SampleMetricCard title='Active Users' value='2,847' change='+4.2%' trend='up' />
							<SampleMetricCard title='Churn Rate' value='1.8%' change='-0.3%' trend='down' />
						</div>
					</TabsContent>

					{/* Rules Tab */}
					<TabsContent value='rules'>
						<div className='space-y-10'>
							<Card>
								<CardHeader>
									<CardTitle className='text-foreground font-semibold text-lg'>Rule Parameters</CardTitle>
								</CardHeader>
								<CardContent>
									<RuleBuilder data={ruleBuilderData} />
								</CardContent>
							</Card>

							<div>
								<h3 className='text-base font-semibold mb-4'>Rule Builder Modal</h3>
								<div className='flex flex-wrap gap-4'>
									<RuleBuilderModal
										title='Rule Builder Modal'
										description='Phasellus lacus massa cras ante integer tortor eu consequat.'
										buttonText='Open Rule Builder Modal'
									/>
									<RuleBuilderModal
										title='Rule Builder Modal'
										description='Phasellus lacus massa cras ante integer tortor eu consequat.'
										buttonText='Open Rule Builder Modal - Size LG'
										size='lg'
									/>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Data Table Tab */}
					<TabsContent value='data-table'>
						<DataTableDemo />
					</TabsContent>

					{/* Detail View Tab */}
					<TabsContent value='detail-view'>
						<DetailViewDemo />
					</TabsContent>

					{/* Add Pattern Tab */}
					<TabsContent value='add-pattern'>
						<AddPatternDemo />
					</TabsContent>

					{/* Edit Patterns Tab */}
					<TabsContent value='edit-patterns'>
						<EditPatternsDemo />
					</TabsContent>
				</Tabs>
			</section>

			<Separator className='mb-10' />

			{/* ===== Page Skeleton ===== */}
			<section>
				<h2 className='section-header mb-6'>Page Skeleton</h2>
				<p className='text-muted-foreground text-sm mb-6'>
					Full page flow: quick filters, advanced filters, data table, and detail view on row click.
				</p>
				<PageSkeletonDemo />
			</section>
		</div>
	);
}
