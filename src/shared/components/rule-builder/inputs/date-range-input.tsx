import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/shared/components/ui/date-picker';

export interface DateRangeInputProps {
	value: string | null;
	onChange: (value: string | null) => void;
}

export const DateRangeInput = ({ value, onChange }: DateRangeInputProps) => {
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
