import { useEffect, useState } from 'react';
import { cn } from '@shared/lib/utils';
import { Input } from '@/shared/components/ui/input';

export interface NumberInputProps {
	prefix?: string | HTMLElement | null;
	placeholder?: string;
	value: string | null;
	onChange: (value: string | null) => void;
}

export const NumberInput = ({ prefix, placeholder, value, onChange }: NumberInputProps) => {
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
