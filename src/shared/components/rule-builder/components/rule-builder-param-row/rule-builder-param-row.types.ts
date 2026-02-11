import type { HTMLAttributes } from 'react';
import type { ParamOption, RowData, RuleBuilderParam } from '../../rule-builder.types';

export type RuleBuilderParamRowProps = {
	className?: string;
	rowData: RowData;
	params: {
		data: RuleBuilderParam[];
		options: ParamOption[];
	};
	noWrap?: boolean;
	onRemove?: () => void;
	onParamChange: (param: string | null) => void;
	onOperatorChange: (operator: string | null) => void;
	onValueChange: (value: string | null) => void;
} & HTMLAttributes<HTMLDivElement>;
