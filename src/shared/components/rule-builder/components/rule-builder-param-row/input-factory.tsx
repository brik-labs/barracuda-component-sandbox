import { Input } from '@/shared/components/ui/input';
import type { RuleBuilderParam } from '../../rule-builder.types';
import { NumberInput } from '../../inputs/number-input';
import { DateInput } from '../../inputs/date-input';
import { DateRangeInput } from '../../inputs/date-range-input';
import { MultiSelectInput } from '../../inputs/multi-select-input';

export interface InputFactoryArgs {
	selectedParam: RuleBuilderParam;
	isBetween: boolean;
	name: string;
	placeholder?: string;
	options?: { value: string; label: string }[];
	value: string | null;
	onChange: (value: string | null) => void;
	prefix?: string | HTMLElement | null;
	noWrap?: boolean;
}

export const renderTypeBasedInput = ({
	selectedParam,
	isBetween,
	name,
	placeholder,
	options,
	value,
	onChange,
	prefix,
	noWrap = false,
}: InputFactoryArgs) => {
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
					noWrap={noWrap}
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
