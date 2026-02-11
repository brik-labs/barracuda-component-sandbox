import { forwardRef, Fragment, HTMLAttributes, useEffect, useState } from 'react';
import { cn } from '@shared/lib/utils';
import { Separator } from '@shared/components/ui/separator';
import { SeparatorWithText } from '@/shared/components/ui/separator-with-text';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@shared/components/ui/select';
import { DatePicker, DateRangePicker } from '@/shared/components/ui/date-picker';
import { Input } from '@/shared/components/ui/input';
import { MultiSelect } from '@/shared/components/ui/multi-select';
import { CirclePlus, CircleX } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface RuleBuilderParamOperator {
	label: string;
	value: string;
}
interface RuleBuilderParamOperators {
	options: RuleBuilderParamOperator[];
	defaultOption?: string | null;
}

interface RuleBuilderParam {
	name: string;
	label: string;
	type: string;
	prefix?: string | HTMLElement | null;
	operators: RuleBuilderParamOperators;
	defaultOption?: string | null;
	options?: { value: string; label: string }[];
}

interface RuleBuilderAction {
	name: string;
	label: string;
}

interface RuleBuilderData {
	params: RuleBuilderParam[];
	actions: RuleBuilderAction[];
}

interface RuleBuilderProps extends HTMLAttributes<HTMLDivElement> {
	data: RuleBuilderData;
}

const RuleBuilder = forwardRef<HTMLDivElement, RuleBuilderProps>(({ className, data, ...props }, ref) => {
	const [rowsData, setRowsData] = useState([{ param: '', operator: '', value: '' }]);
	const paramOptions = data.params.map(({ name, label }: any) => ({ label, value: name }));

	const addNewRow = () => setRowsData([...rowsData, { param: '', operator: '', value: '' }]);
	const removeRow = (index: number) => setRowsData(rowsData.filter((_, i) => i !== index));
	const handleParamUpdate = (index: number, param: string) => {
		const updatedRows = [...rowsData];
		updatedRows[index] = { ...updatedRows[index], param };
		setRowsData(updatedRows);
	};

	const handleOperatorUpdate = (index: number, operator: string) => {
		const updatedRows = [...rowsData];
		updatedRows[index] = { ...updatedRows[index], operator };
		setRowsData(updatedRows);
	};

	const handleValueUpdate = (index: number, value: string) => {
		const updatedRows = [...rowsData];
		updatedRows[index] = { ...updatedRows[index], value };
		setRowsData(updatedRows);
	};

	const handleApplyRule = () => {
		console.log(rowsData);
	};

	return (
		<div ref={ref} className={cn('rounded-[8px] p-4 bg-gray-100', className)} {...props}>
			<RuleBuilderSection>
				<RuleBuilderLabel>When</RuleBuilderLabel>

				<RuleBuilderRows className='mb-4'>
					{rowsData.map((rowData, index) => (
						<Fragment key={index}>
							{index > 0 && (
								<SeparatorWithText
									className='text-teal-300 uppercase'
									separatorClassName='bg-gray-border'>
									and
								</SeparatorWithText>
							)}

							<RuleBuilderParamRow
								data={rowData}
								params={{ data: data.params, options: paramOptions }}
								onParamChange={(param: string) => handleParamUpdate(index, param)}
								onOperatorChange={(operator: string) => handleOperatorUpdate(index, operator)}
								value={rowData.value}
								onValueChange={(value: string) => handleValueUpdate(index, value)}
								onRemove={rowsData.length > 1 ? () => removeRow(index) : null}
							/>
						</Fragment>
					))}
				</RuleBuilderRows>

				<button
					className='inline-flex items-center gap-2 text-primary font-medium text-sm -tracking-[0.01em]'
					type='button'
					onClick={addNewRow}>
					<CirclePlus className='size-4' />

					<span>Add criteria</span>
				</button>
			</RuleBuilderSection>

			<Separator className='my-4' />

			<RuleBuilderSection>
				<RuleBuilderLabel>Then</RuleBuilderLabel>

				<RuleBuilderRows>
					<RuleBuilderRow>
						<RuleBuilderCols count={1}>
							<RuleBuilderCol>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder='Action' />
									</SelectTrigger>
									<SelectContent>
										{data.actions.map((action) => (
											<SelectItem key={action.name} value={action.name}>
												{action.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</RuleBuilderCol>
						</RuleBuilderCols>
					</RuleBuilderRow>
				</RuleBuilderRows>
			</RuleBuilderSection>

			<Separator className='my-4' />

			<div className='flex justify-end'>
				<button
					className='inline-block cursor-pointer border border-gray-border bg-white rounded-[10px] py-2 px-6'
					type='button'
					onClick={handleApplyRule}>
					Apply
				</button>
			</div>
		</div>
	);
});
RuleBuilder.displayName = 'RuleBuilder';

const NumberInput = ({ prefix, placeholder, value, onChange }: any) => {
	const [internalValue, setInternalValue] = useState<number | undefined>(value ?? undefined);

	const handleChange = (value: number | undefined) => {
		setInternalValue(value);
		onChange(value?.toString());
	};

	return (
		<div className='relative'>
			<Input
				className={cn('w-full', prefix && 'pl-7')}
				type='number'
				placeholder={placeholder}
				onInput={(e) => handleChange(Number(e.currentTarget.value))}
				value={internalValue}
			/>

			{prefix && (
				<span
					className={cn(
						'absolute top-1/2 left-3 -translate-y-1/2 font-light text-muted-foreground',
						internalValue === undefined && 'opacity-60',
					)}>
					{prefix}
				</span>
			)}
		</div>
	);
};

const DateInput = ({ value, onChange }: any) => {
	const [pickerDate, setPickerDate] = useState<any>(value ? new Date(value) : null);

	const handleSelect = (selectedValue: Date | undefined) => {
		setPickerDate(selectedValue);
		onChange(selectedValue?.toISOString());
	};

	return (
		<DatePicker className='w-full' date={pickerDate} onSelect={handleSelect} placeholder='Pick a date' clearable />
	);
};

const DateRangeInput = ({ value, onChange }: any) => {
	const [from, to] = value?.split('_') || [null, null];
	const [pickerDateRange, setPickerDateRange] = useState<DateRange | undefined>(
		from && to ? { from: new Date(from), to: new Date(to) } : undefined,
	);

	const handleSelect = (selectedValue: DateRange | undefined) => {
		setPickerDateRange(selectedValue);

		if (selectedValue?.from === selectedValue?.to) {
			return;
		}

		onChange(
			selectedValue?.from && selectedValue?.to
				? `${selectedValue.from.toISOString()}_${selectedValue.to.toISOString()}`
				: '',
		);
	};

	return (
		<DateRangePicker
			className='w-full'
			dateRange={pickerDateRange}
			onSelect={handleSelect}
			placeholder='Select date range'
			numberOfMonths={2}
		/>
	);
};

const MultiSelectInput = ({ id, name, placeholder, value, options, onChange }: any) => {
	const [multiSelectValue, setMultiSelectValue] = useState<any>(value?.split(',') || []);

	const handleChange = (value: any) => {
		setMultiSelectValue(value || []);
		onChange(value.join(',') || null);
	};

	return (
		<MultiSelect
			options={options}
			noWrap
			value={multiSelectValue}
			onChange={handleChange}
			config={{ key: id ?? name, label: placeholder }}
		/>
	);
};

const RuleBuilderParamRow = forwardRef<any, any>(
	(
		{ className, rowData, params, onRemove, onParamChange, onOperatorChange, value, onValueChange, ...props },
		ref,
	) => {
		const [selectedParam, setSelectedParam] = useState<any>(null);
		const [operators, setOperators] = useState<any>(null);
		const [selectedOperator, setSelectedOperator] = useState<any>(null);
		const [isDate, setIsDate] = useState(false);
		const [isBetween, setIsBetween] = useState(false);

		const handleOperatorSelectChange = (value: string) =>
			setSelectedParam(params.data.find((param: any) => param.name === value) ?? null);

		const handleOptionsSelectChange = (value: string) =>
			setSelectedOperator(operators?.options.find((option: any) => option.value === value) ?? null);

		useEffect(() => {
			if (selectedParam) {
				setOperators(selectedParam.operators);
				setIsDate(selectedParam.type === 'date');
			}
			onParamChange(selectedParam?.name);
			onValueChange(null);
		}, [selectedParam]);

		useEffect(() => {
			if (operators) {
				const option =
					operators.options.find((option: any) => option.value === operators.defaultOption) ?? null;

				setSelectedOperator(option);
			}
		}, [operators]);

		useEffect(() => {
			if (selectedOperator) {
				setIsBetween(selectedOperator.value === 'is_between');
			}
			onOperatorChange(selectedOperator?.value);
			onValueChange(null);
		}, [selectedOperator]);

		const getTypeBasedInput = ({ name, placeholder, options, value, onChange, prefix }: any) => {
			switch (selectedParam.type) {
				case 'number':
					return <NumberInput prefix={prefix} placeholder={placeholder} value={value} onChange={onChange} />;
				case 'date':
					return isBetween ? (
						<DateRangeInput onChange={onChange} value={value} />
					) : (
						<DateInput onChange={onChange} value={value} />
					);
				case 'select':
					return (
						<MultiSelectInput
							name={name}
							placeholder={placeholder}
							options={options}
							onChange={onChange}
							value={value}
						/>
					);
				default:
					return (
						<Input
							placeholder={placeholder}
							value={value ?? ''}
							onInput={(e) => onChange(e.currentTarget.value)}
						/>
					);
			}
		};

		const TypeBasedInput = ({ name, placeholder, options, value, onChange, prefix }: any) =>
			getTypeBasedInput({ name, placeholder, options, value, onChange, prefix });

		return (
			<RuleBuilderRow ref={ref} className={cn('', className)} {...props}>
				<RuleBuilderCols count={3}>
					<RuleBuilderCol>
						<Select onValueChange={handleOperatorSelectChange}>
							<SelectTrigger>
								<SelectValue placeholder='Parameter' />
							</SelectTrigger>
							<SelectContent>
								{params.options.map((option: any) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</RuleBuilderCol>

					{operators && (
						<RuleBuilderCol>
							<Select
								value={selectedOperator?.value ?? operators?.defaultOption ?? undefined}
								onValueChange={handleOptionsSelectChange}>
								<SelectTrigger>
									<SelectValue placeholder='Operator' />
								</SelectTrigger>
								<SelectContent>
									{operators?.options.map(({ value, label }: any, index: number) => (
										<SelectItem key={index} value={value}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</RuleBuilderCol>
					)}

					{selectedOperator && (
						<RuleBuilderCol>
							{isBetween && !isDate ? (
								<RuleBuilderCols count={2}>
									<RuleBuilderCol>
										<TypeBasedInput
											name={`${selectedParam.name}_from`}
											placeholder='From'
											prefix={selectedParam.prefix}
											options={selectedParam.options}
											value={value?.split('-')[0] || ''}
											onChange={(val: string) => {
												const to = value?.split('-')[1] ?? '';
												return onValueChange(`${val}-${to}`);
											}}
										/>
									</RuleBuilderCol>

									<RuleBuilderCol>
										<TypeBasedInput
											name={`${selectedParam.name}_to`}
											placeholder='To'
											prefix={selectedParam.prefix}
											options={selectedParam.options}
											value={value?.split('-')[1] || ''}
											onChange={(val: string) => {
												const from = value?.split('-')[0] ?? '';
												return onValueChange(`${from}-${val}`);
											}}
										/>
									</RuleBuilderCol>
								</RuleBuilderCols>
							) : (
								<RuleBuilderCol>
									<TypeBasedInput
										name={selectedParam.name}
										placeholder={selectedParam.label}
										prefix={selectedParam.prefix}
										options={selectedParam.options}
										value={value}
										onChange={onValueChange}
									/>
								</RuleBuilderCol>
							)}
						</RuleBuilderCol>
					)}
				</RuleBuilderCols>

				{onRemove && (
					<button className='shrink-0' type='button' onClick={onRemove}>
						<CircleX className='size-4' />
					</button>
				)}
			</RuleBuilderRow>
		);
	},
);
RuleBuilderParamRow.displayName = 'RuleBuilderParamRow';

const RuleBuilderSection = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(({ className, ...props }, ref) => (
	<section ref={ref} className={cn('', className)} {...props} />
));
RuleBuilderSection.displayName = 'RuleBuilderSection';

const RuleBuilderLabel = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => <p ref={ref} className={cn('mb-2 text-foreground', className)} {...props} />,
);
RuleBuilderLabel.displayName = 'RuleBuilderLabel';

const RuleBuilderRows = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex flex-col gap-1', className)} {...props} />
));
RuleBuilderRows.displayName = 'RuleBuilderRows';

const RuleBuilderRow = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
));
RuleBuilderRow.displayName = 'RuleBuilderRow';

interface RuleBuilderColsProps extends HTMLAttributes<HTMLDivElement> {
	count?: number;
}

const RuleBuilderCols = forwardRef<HTMLDivElement, RuleBuilderColsProps>(({ className, count, ...props }, ref) => (
	<div ref={ref} className={cn(' flex-1 gap-2', count ? `grid grid-cols-${count}` : 'flex', className)} {...props} />
));
RuleBuilderCols.displayName = 'RuleBuilderCols';

interface RuleBuilderColProps extends HTMLAttributes<HTMLDivElement> {
	colSpan?: string;
}

const RuleBuilderCol = forwardRef<HTMLDivElement, RuleBuilderColProps>(({ className, colSpan, ...props }, ref) => (
	<div ref={ref} className={cn('flex-1', className)} {...props} />
));
RuleBuilderCol.displayName = 'RuleBuilderCol';

export default RuleBuilder;
