import { forwardRef, Fragment, HTMLAttributes, useEffect, useMemo, useState } from 'react';
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

type RowData = {
	param: string | null;
	operator: string | null;
	value: string | null;
};

const RuleBuilder = forwardRef<HTMLDivElement, RuleBuilderProps>(({ className, data, ...props }, ref) => {
	const [rowsData, setRowsData] = useState<RowData[]>([{ param: null, operator: null, value: null }]);

	const paramOptions = useMemo(() => {
		return data.params.map(({ name, label }) => ({ label, value: name }));
	}, [data.params]);

	const addNewRow = () => setRowsData((prev) => [...prev, { param: null, operator: null, value: null }]);
	const removeRow = (index: number) => setRowsData((prev) => prev.filter((_, i) => i !== index));

	const handleParamUpdate = (index: number, param: string | null) => {
		setRowsData((prev) => {
			const next = [...prev];
			next[index] = { ...next[index], param, operator: null, value: null };
			return next;
		});
	};

	const handleOperatorUpdate = (index: number, operator: string | null) => {
		setRowsData((prev) => {
			const next = [...prev];
			next[index] = { ...next[index], operator, value: null };
			return next;
		});
	};

	const handleValueUpdate = (index: number, value: string | null) => {
		setRowsData((prev) => {
			const next = [...prev];
			next[index] = { ...next[index], value };
			return next;
		});
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
								rowData={rowData}
								params={{ data: data.params, options: paramOptions }}
								onParamChange={(param: string | null) => handleParamUpdate(index, param)}
								onOperatorChange={(operator: string | null) => handleOperatorUpdate(index, operator)}
								onValueChange={(value: string | null) => handleValueUpdate(index, value)}
								onRemove={rowsData.length > 1 ? () => removeRow(index) : undefined}
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

const NumberInput = ({
	prefix,
	placeholder,
	value,
	onChange,
}: {
	prefix?: string | HTMLElement | null;
	placeholder?: string;
	value: string | null;
	onChange: (value: string | null) => void;
}) => {
	const [internalValue, setInternalValue] = useState<number | undefined>(() => {
		if (value === null || value === undefined || value === '') return undefined;
		const n = Number(value);
		return Number.isFinite(n) ? n : undefined;
	});

	useEffect(() => {
		if (value === null || value === undefined || value === '') {
			setInternalValue(undefined);
			return;
		}
		const n = Number(value);
		setInternalValue(Number.isFinite(n) ? n : undefined);
	}, [value]);

	const handleChange = (raw: string) => {
		if (raw === '') {
			setInternalValue(undefined);
			onChange(null);
			return;
		}

		const n = Number(raw);
		if (!Number.isFinite(n)) {
			setInternalValue(undefined);
			onChange(null);
			return;
		}

		setInternalValue(n);
		onChange(String(n));
	};

	return (
		<div className='relative'>
			<Input
				className={cn('w-full', prefix && 'pl-7')}
				type='number'
				placeholder={placeholder}
				onInput={(e) => handleChange(e.currentTarget.value)}
				value={internalValue ?? ''}
			/>

			{prefix && (
				<span
					className={cn(
						'absolute top-1/2 left-3 -translate-y-1/2 font-light text-muted-foreground',
						internalValue === undefined && 'opacity-60',
					)}>
					{prefix as any}
				</span>
			)}
		</div>
	);
};

const DateInput = ({ value, onChange }: { value: string | null; onChange: (value: string | null) => void }) => {
	const [pickerDate, setPickerDate] = useState<Date | undefined>(() => (value ? new Date(value) : undefined));

	useEffect(() => {
		setPickerDate(value ? new Date(value) : undefined);
	}, [value]);

	const handleSelect = (selectedValue: Date | undefined) => {
		setPickerDate(selectedValue ?? undefined);
		onChange(selectedValue ? selectedValue.toISOString() : null);
	};

	return (
		<DatePicker className='w-full' date={pickerDate} onSelect={handleSelect} placeholder='Pick a date' clearable />
	);
};

const DateRangeInput = ({ value, onChange }: { value: string | null; onChange: (value: string | null) => void }) => {
	const [from, to] = value?.split('_') || [null, null];
	const [pickerDateRange, setPickerDateRange] = useState<DateRange | undefined>(() => {
		return from && to ? { from: new Date(from), to: new Date(to) } : undefined;
	});

	useEffect(() => {
		if (!value) {
			setPickerDateRange(undefined);
			return;
		}
		const [f, t] = value.split('_');
		setPickerDateRange(f && t ? { from: new Date(f), to: new Date(t) } : undefined);
	}, [value]);

	const handleSelect = (selectedValue: DateRange | undefined) => {
		setPickerDateRange(selectedValue);

		if (!selectedValue?.from || !selectedValue?.to) {
			onChange(null);
			return;
		}

		if (selectedValue.from.getTime() === selectedValue.to.getTime()) {
			return;
		}

		onChange(`${selectedValue.from.toISOString()}_${selectedValue.to.toISOString()}`);
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

const MultiSelectInput = ({
	id,
	name,
	placeholder,
	value,
	options,
	onChange,
}: {
	id?: string;
	name?: string;
	placeholder?: string;
	value: string | null;
	options?: { value: string; label: string }[];
	onChange: (value: string | null) => void;
}) => {
	const [multiSelectValue, setMultiSelectValue] = useState<string[]>(() => (value ? value.split(',') : []));

	useEffect(() => {
		setMultiSelectValue(value ? value.split(',') : []);
	}, [value]);

	const handleChange = (next: string[]) => {
		const safe = Array.isArray(next) ? next : [];
		setMultiSelectValue(safe);
		onChange(safe.length ? safe.join(',') : null);
	};

	return (
		<MultiSelect
			options={options ?? []}
			noWrap
			value={multiSelectValue}
			onChange={handleChange as any}
			config={{ key: id ?? name ?? 'multi-select', label: placeholder ?? 'Select' }}
		/>
	);
};

type RuleBuilderParamRowProps = {
	className?: string;
	rowData: RowData;
	params: {
		data: RuleBuilderParam[];
		options: { label: string; value: string }[];
	};
	onRemove?: () => void;
	onParamChange: (param: string | null) => void;
	onOperatorChange: (operator: string | null) => void;
	onValueChange: (value: string | null) => void;
} & HTMLAttributes<HTMLDivElement>;

const RuleBuilderParamRow = forwardRef<HTMLDivElement, RuleBuilderParamRowProps>(
	({ className, rowData, params, onRemove, onParamChange, onOperatorChange, onValueChange, ...props }, ref) => {
		const [selectedParam, setSelectedParam] = useState<RuleBuilderParam | null>(() => {
			return rowData.param ? (params.data.find((p) => p.name === rowData.param) ?? null) : null;
		});

		const [operators, setOperators] = useState<RuleBuilderParamOperators | null>(null);
		const [selectedOperator, setSelectedOperator] = useState<RuleBuilderParamOperator | null>(null);

		const isDate = selectedParam?.type === 'date';
		const isBetween = selectedOperator?.value === 'is_between';

		const handleParamSelectChange = (paramName: string) => {
			const nextParam = params.data.find((param) => param.name === paramName) ?? null;
			setSelectedParam(nextParam);
		};

		const handleOperatorSelectChange = (operatorValue: string) => {
			const nextOperator = operators?.options.find((option) => option.value === operatorValue) ?? null;
			setSelectedOperator(nextOperator);
		};

		// keep selectedParam in sync with external rowData.param
		useEffect(() => {
			const nextParam = rowData.param ? (params.data.find((p) => p.name === rowData.param) ?? null) : null;
			setSelectedParam(nextParam);
		}, [rowData.param, params.data]);

		// update operators when param changes
		useEffect(() => {
			if (!selectedParam) {
				setOperators(null);
				setSelectedOperator(null);
				onParamChange(null);
				onOperatorChange(null);
				onValueChange(null);
				return;
			}

			setOperators(selectedParam.operators);
			onParamChange(selectedParam.name);

			// reset dependent fields
			onOperatorChange(null);
			onValueChange(null);
			setSelectedOperator(null);
		}, [selectedParam]);

		// set default operator when operators set
		useEffect(() => {
			if (!operators) return;

			const defaultOp =
				operators.options.find((option) => option.value === operators.defaultOption) ??
				operators.options[0] ??
				null;

			setSelectedOperator(defaultOp);
			onOperatorChange(defaultOp?.value ?? null);
			onValueChange(null);
		}, [operators]);

		// if operator changes via UI
		useEffect(() => {
			if (!selectedOperator) return;
			onOperatorChange(selectedOperator.value);
			onValueChange(null);
		}, [selectedOperator?.value]);

		const getTypeBasedInput = ({
			name,
			placeholder,
			options,
			value,
			onChange,
			prefix,
		}: {
			name: string;
			placeholder?: string;
			options?: { value: string; label: string }[];
			value: string | null;
			onChange: (value: string | null) => void;
			prefix?: string | HTMLElement | null;
		}) => {
			if (!selectedParam) return null;

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
							onInput={(e) => onChange(e.currentTarget.value || null)}
						/>
					);
			}
		};

		if (!selectedParam) {
			return (
				<RuleBuilderRow ref={ref} className={cn('', className)} {...props}>
					<RuleBuilderCols count={3}>
						<RuleBuilderCol>
							<Select value={rowData.param ?? undefined} onValueChange={handleParamSelectChange}>
								<SelectTrigger>
									<SelectValue placeholder='Parameter' />
								</SelectTrigger>
								<SelectContent>
									{params.options.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</RuleBuilderCol>
					</RuleBuilderCols>

					{onRemove && (
						<button className='shrink-0' type='button' onClick={onRemove}>
							<CircleX className='size-4' />
						</button>
					)}
				</RuleBuilderRow>
			);
		}

		return (
			<RuleBuilderRow ref={ref} className={cn('', className)} {...props}>
				<RuleBuilderCols count={3}>
					<RuleBuilderCol>
						<Select value={selectedParam.name} onValueChange={handleParamSelectChange}>
							<SelectTrigger>
								<SelectValue placeholder='Parameter' />
							</SelectTrigger>
							<SelectContent>
								{params.options.map((option) => (
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
								value={selectedOperator?.value ?? operators.defaultOption ?? undefined}
								onValueChange={handleOperatorSelectChange}>
								<SelectTrigger>
									<SelectValue placeholder='Operator' />
								</SelectTrigger>
								<SelectContent>
									{operators.options.map(({ value, label }, index) => (
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
										{getTypeBasedInput({
											name: `${selectedParam.name}_from`,
											placeholder: 'From',
											prefix: selectedParam.prefix,
											options: selectedParam.options,
											value: rowData.value?.split('-')[0] ?? null,
											onChange: (val) => {
												const to = rowData.value?.split('-')[1] ?? '';
												onValueChange(`${val ?? ''}-${to}`);
											},
										})}
									</RuleBuilderCol>

									<RuleBuilderCol>
										{getTypeBasedInput({
											name: `${selectedParam.name}_to`,
											placeholder: 'To',
											prefix: selectedParam.prefix,
											options: selectedParam.options,
											value: rowData.value?.split('-')[1] ?? null,
											onChange: (val) => {
												const from = rowData.value?.split('-')[0] ?? '';
												onValueChange(`${from}-${val ?? ''}`);
											},
										})}
									</RuleBuilderCol>
								</RuleBuilderCols>
							) : (
								getTypeBasedInput({
									name: selectedParam.name,
									placeholder: selectedParam.label,
									prefix: selectedParam.prefix,
									options: selectedParam.options,
									value: rowData.value,
									onChange: onValueChange,
								})
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

const RuleBuilderCols = forwardRef<HTMLDivElement, RuleBuilderColsProps>(({ className, count, ...props }, ref) => {
	const gridColsClass =
		count === 1
			? 'grid grid-cols-1'
			: count === 2
				? 'grid grid-cols-2'
				: count === 3
					? 'grid grid-cols-3'
					: count === 4
						? 'grid grid-cols-4'
						: '';

	return <div ref={ref} className={cn('flex-1 gap-2', count ? gridColsClass : 'flex', className)} {...props} />;
});
RuleBuilderCols.displayName = 'RuleBuilderCols';

interface RuleBuilderColProps extends HTMLAttributes<HTMLDivElement> {
	colSpan?: string;
}

const RuleBuilderCol = forwardRef<HTMLDivElement, RuleBuilderColProps>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex-1', className)} {...props} />
));
RuleBuilderCol.displayName = 'RuleBuilderCol';

export default RuleBuilder;
