import { useEffect, useState } from 'react';
import { DatePicker } from '@/shared/components/ui/date-picker';

export interface DateInputProps {
	value: string | null;
	onChange: (value: string | null) => void;
}

export const DateInput = ({ value, onChange }: DateInputProps) => {
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
