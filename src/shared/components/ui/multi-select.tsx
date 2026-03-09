import { useState, useEffect, useRef, useMemo, useCallback, memo, MouseEvent, ReactNode } from 'react';
import { ChevronsUpDown, CircleCheckBig, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/components/ui/popover';
import { Z_INDEX_CLASSES } from '@shared/lib/z-index';

import { Button } from '@shared/components/ui/button';
import { Label } from '@shared/components/ui/label';
import { cn } from '@shared/lib/utils';

export interface MultiSelectConfigOption {
	value: string;
	label: string;
	icon?: ReactNode;
	description?: string;
	color?: string;
	category?: string;
}

interface MultiSelectConfig {
	key: string;
	label: string;
	placeholder?: string;
	searchPlaceholder?: string;
	options?: readonly MultiSelectConfigOption[];
	icon?: React.ReactNode;
	min?: number;
	max?: number;
	defaultValue?: unknown;
	description?: string;
	isVisible?: boolean;
	searchable?: boolean;
	clearable?: boolean;
	currency?: string;
}

interface MultiSelectOption {
	value: string;
	label: string;
}

interface MultiSelectProps<T extends MultiSelectOption> {
	options: readonly T[];
	value?: string[];
	onChange?: (value: string[] | null) => void;
	config: MultiSelectConfig;
	maxHeight?: string;
	className?: string;
	noWrap?: boolean;
}

export function MultiSelect<T extends MultiSelectOption>({
	options = [],
	value = [],
	onChange,
	config,
	maxHeight,
	noWrap = false,
	className,
}: MultiSelectProps<T>) {
	const { isOpen, selectedOptions, setIsOpen, handleOptionToggle, handleApply, handleClear, isActive, displayValue } =
		useMultiSelect({
			options,
			value,
			onChange,
			label: config.label,
		});

	return (
		<div className={cn('relative select-none', className)}>
			<MultiSelectButton
				text={config.label}
				isActive={isActive}
				isOpen={isOpen}
				displayValue={displayValue}
				noWrap={noWrap}
				onToggle={setIsOpen}
				onClear={handleClear}>
				<div className='select-none'>
					<div className={cn('overflow-y-auto', maxHeight || 'max-h-40')}>
						{options.length > 0 ? (
							options.map((option) => (
								<Label
									key={option.value}
									className={cn(
										'flex items-center space-x-2 p-3 cursor-pointer transition-colors',
										selectedOptions.includes(option.value) && 'bg-accent',
									)}
									onClick={() => handleOptionToggle(option.value)}>
									<span className='text-base font-normal flex-1 text-foreground leading-none'>
										{option.label}
									</span>

									{selectedOptions.includes(option.value) && (
										<CircleCheckBig className={cn('size-4 text-primary')} />
									)}
								</Label>
							))
						) : (
							<div className='text-sm py-4 text-center text-muted-foreground'>No results found</div>
						)}
					</div>

					<div className='border-t border-border p-2'>
						<Button
							onClick={handleApply}
							size='sm'
							className='w-full h-8'
							disabled={selectedOptions.length === 0}
							aria-label='Apply selection'>
							Apply Selection
						</Button>
					</div>
				</div>
			</MultiSelectButton>
		</div>
	);
}

interface MultiSelectButtonProps {
	text: string;
	isActive: boolean;
	isOpen: boolean;
	noWrap?: boolean;
	displayValue: {
		label: string;
		full: string;
		short: string;
	};
	onToggle: (open: boolean) => void;
	onClear: (index: number) => void;
	children: React.ReactNode;
}

function MultiSelectButtonImpl({
	text,
	isActive,
	isOpen,
	noWrap = false,
	displayValue,
	onToggle,
	onClear,
	children,
}: MultiSelectButtonProps) {
	const values = (noWrap ? displayValue.short : displayValue.full).split(',');

	const handleClear = useCallback(
		(e: MouseEvent, index: number) => {
			e.stopPropagation();
			onClear(index);
		},
		[onClear],
	);

	const handlePopoverOpenChange = (open: boolean) => onToggle(open);

	return (
		<Popover open={isOpen} onOpenChange={handlePopoverOpenChange}>
			<PopoverTrigger asChild>
				<Button
					variant={isActive ? 'secondary' : 'outline'}
					className={cn(
						'flex items-center justify-between w-full min-h-10 h-auto rounded-[10px] border border-input bg-card px-3 py-2 text-base md:text-sm focus:outline-none focus:border-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-60',
					)}>
					<div
						className={cn(
							'flex items-center gap-2',
							noWrap
								? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
								: 'flex-wrap',
						)}>
						{isActive ? (
							values.map((value, index) => {
								const trimmed = value.trim();
								const isPlainText = trimmed.startsWith('+') && trimmed.endsWith('more');

								return (
									<div
										key={`${index}-${value}`}
										className={cn(
											!isPlainText &&
												'flex items-center gap-0.5 py-px pl-[5px] pr-px bg-primary-light rounded-full border border-blue-100',
										)}>
										<span className='font-medium text-xs'>{value}</span>
										{!isPlainText && (
											<X
												className='h-2 w-2 group-hover:text-destructive transition-colors'
												onClick={(e) => handleClear(e, index)}
											/>
										)}
									</div>
								);
							})
						) : (
							<span className='pointer-events-none text-muted-foreground opacity-60 line-clamp-1 font-light leading-tight'>
								{text}
							</span>
						)}
					</div>

					<ChevronsUpDown />
				</Button>
			</PopoverTrigger>

			<PopoverContent
				className={cn(
					'p-0 shadow-lg border bg-popover rounded-md w-[var(--radix-popover-trigger-width)] select-none',
					Z_INDEX_CLASSES.MODAL_POPOVER,
				)}
				align='start'
				sideOffset={4}>
				{children}
			</PopoverContent>
		</Popover>
	);
}

export const MultiSelectButton = memo(MultiSelectButtonImpl);

interface UseMultiSelectProps<T extends MultiSelectOption> {
	options: readonly T[];
	value?: string[];
	onChange?: (value: string[] | null) => void;
	label?: string;
}

interface UseMultiSelectReturn {
	isOpen: boolean;
	selectedOptions: string[];
	setIsOpen: (open: boolean) => void;
	handleOptionToggle: (optionValue: string) => void;
	handleApply: () => void;
	handleClear: (index: number) => void;
	isActive: boolean;
	displayValue: {
		label: string;
		full: string;
		short: string;
	};
}

export function useMultiSelect<T extends MultiSelectOption>({
	options,
	value = [],
	onChange,
	label = 'Select options',
}: UseMultiSelectProps<T>): UseMultiSelectReturn {
	const [selectedOptions, setSelectedOptions] = useState<string[]>(value);
	const [isOpen, setIsOpen] = useState(false);
	const prevValueRef = useRef<string[]>(value);

	useEffect(() => {
		if (JSON.stringify(value) !== JSON.stringify(prevValueRef.current)) {
			setSelectedOptions(value);
			prevValueRef.current = value;
		}
	}, [value]);

	const handleOptionToggle = useCallback((optionValue: string) => {
		setSelectedOptions((prev) =>
			prev.includes(optionValue) ? prev.filter((item) => item !== optionValue) : [...prev, optionValue],
		);
	}, []);

	const handleApply = useCallback(() => {
		onChange?.(selectedOptions.length ? selectedOptions : null);
		setIsOpen(false);
	}, [selectedOptions, onChange]);

	const handleClear = useCallback(
		(index: number) => {
			const filteredOptions = [...selectedOptions].filter((_, i) => i !== index);

			setSelectedOptions(() => filteredOptions);
			onChange?.(filteredOptions.length ? filteredOptions : null);
		},
		[onChange],
	);

	const isActive = useMemo(() => !!selectedOptions.length, [selectedOptions.length]);

	const displayValue = useMemo(() => {
		if (!isActive) {
			return { label, full: '', short: '' };
		}

		const optionMap = new Map(options.map((opt) => [opt.value, opt.label]));
		const selectedLabels = selectedOptions.map((value) => optionMap.get(value) || value);

		const full = selectedLabels.join(', ');
		const short = selectedLabels.length < 3 ? full : `${selectedLabels[0]}, + ${selectedLabels.length - 1} more`;

		return {
			label,
			full,
			short,
		};
	}, [isActive, selectedOptions, options, label]);

	return {
		isOpen,
		selectedOptions,
		setIsOpen,
		handleOptionToggle,
		handleApply,
		handleClear,
		isActive,
		displayValue,
	};
}
