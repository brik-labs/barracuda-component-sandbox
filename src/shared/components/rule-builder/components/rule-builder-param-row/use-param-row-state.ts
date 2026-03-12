import { useEffect, useState } from 'react';
import type { RowData, RuleBuilderParam, RuleBuilderParamOperator, RuleBuilderParamOperators } from '../../rule-builder.types';

export interface UseParamRowStateArgs {
	rowData: RowData;
	params: RuleBuilderParam[];
	onParamChange: (param: string | null) => void;
	onOperatorChange: (operator: string | null) => void;
	onValueChange: (value: string | null) => void;
}

export const useParamRowState = ({ rowData, params, onParamChange, onOperatorChange, onValueChange }: UseParamRowStateArgs) => {
	const [selectedParam, setSelectedParam] = useState<RuleBuilderParam | null>(() => {
		return rowData.param ? (params.find((p) => p.name === rowData.param) ?? null) : null;
	});

	const [operators, setOperators] = useState<RuleBuilderParamOperators | null>(null);
	const [selectedOperator, setSelectedOperator] = useState<RuleBuilderParamOperator | null>(null);

	// keep selectedParam in sync with external rowData.param
	useEffect(() => {
		const nextParam = rowData.param ? (params.find((p) => p.name === rowData.param) ?? null) : null;
		setSelectedParam(nextParam);
	}, [rowData.param, params]);

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
			operators.options.find((option) => option.value === operators.defaultOption) ?? operators.options[0] ?? null;

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

	const isDate = selectedParam?.type === 'date';
	const isBetween = selectedOperator?.value === 'is_between';

	const selectParamByName = (paramName: string) => {
		const nextParam = params.find((param) => param.name === paramName) ?? null;
		setSelectedParam(nextParam);
	};

	const selectOperatorByValue = (operatorValue: string) => {
		const nextOperator = operators?.options.find((option) => option.value === operatorValue) ?? null;
		setSelectedOperator(nextOperator);
	};

	return {
		selectedParam,
		operators,
		selectedOperator,
		isDate,
		isBetween,
		selectParamByName,
		selectOperatorByValue,
	};
};
