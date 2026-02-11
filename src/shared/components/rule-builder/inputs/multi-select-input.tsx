import { useEffect, useState } from 'react';
import { MultiSelect } from '@/shared/components/ui/multi-select';

export interface MultiSelectInputProps {
	id?: string;
	name?: string;
	placeholder?: string;
	value: string | null;
	noWrap?: boolean;
	options?: { value: string; label: string }[];
	onChange: (value: string | null) => void;
}

export const MultiSelectInput = ({
	id,
	name,
	placeholder,
	value,
	options,
	onChange,
	noWrap = false,
}: MultiSelectInputProps) => {
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
			noWrap={noWrap}
			value={multiSelectValue}
			onChange={handleChange as any}
			config={{ key: id ?? name ?? 'multi-select', label: placeholder ?? 'Select' }}
		/>
	);
};
