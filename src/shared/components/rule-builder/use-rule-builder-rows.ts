import { useCallback, useState } from 'react';
import type { RowData } from './rule-builder.types';

export const useRuleBuilderRows = (initialRows: RowData[] = [{ param: null, operator: null, value: null }]) => {
	const [rowsData, setRowsData] = useState<RowData[]>(initialRows);

	const addNewRow = useCallback(() => {
		setRowsData((prev) => [...prev, { param: null, operator: null, value: null }]);
	}, []);

	const removeRow = useCallback((index: number) => {
		setRowsData((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const updateParam = useCallback((index: number, param: string | null) => {
		setRowsData((prev) => {
			const next = [...prev];
			next[index] = { ...next[index], param, operator: null, value: null };
			return next;
		});
	}, []);

	const updateOperator = useCallback((index: number, operator: string | null) => {
		setRowsData((prev) => {
			const next = [...prev];
			next[index] = { ...next[index], operator, value: null };
			return next;
		});
	}, []);

	const updateValue = useCallback((index: number, value: string | null) => {
		setRowsData((prev) => {
			const next = [...prev];
			next[index] = { ...next[index], value };
			return next;
		});
	}, []);

	return {
		rowsData,
		setRowsData,
		addNewRow,
		removeRow,
		updateParam,
		updateOperator,
		updateValue,
	};
};
