import type { HTMLAttributes } from 'react';

export interface RuleBuilderParamOperator {
	label: string;
	value: string;
}

export interface RuleBuilderParamOperators {
	options: RuleBuilderParamOperator[];
	defaultOption?: string | null;
}

export interface RuleBuilderParam {
	name: string;
	label: string;
	type: string;
	prefix?: string | HTMLElement | null;
	operators: RuleBuilderParamOperators;
	defaultOption?: string | null;
	options?: { value: string; label: string }[];
}

export interface RuleBuilderAction {
	name: string;
	label: string;
}

export interface RuleBuilderData {
	params: RuleBuilderParam[];
	actions: RuleBuilderAction[];
}

export interface RuleBuilderProps extends HTMLAttributes<HTMLDivElement> {
	data: RuleBuilderData;
	initialRows?: RowData[];
	initialAction?: string | null;
	onDataChange?: (rows: RowData[], action: string | null) => void;
	noWrap?: boolean;
}

export type RowData = {
	param: string | null;
	operator: string | null;
	value: string | null;
};

export type ParamOption = { label: string; value: string };
