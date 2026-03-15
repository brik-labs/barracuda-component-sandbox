import { forwardRef, Fragment, useEffect, useMemo, useState } from 'react';
import { cn } from '@shared/lib/utils';
import { Separator } from '@shared/components/ui/separator';
import { SeparatorWithText } from '@/shared/components/ui/separator-with-text';
import { CirclePlus } from 'lucide-react';

import type { RuleBuilderProps } from './rule-builder.types';
import { useRuleBuilderRows } from './use-rule-builder-rows';

import {
	RuleBuilderSection,
	RuleBuilderLabel,
	RuleBuilderRows,
	RuleBuilderRow,
	RuleBuilderCols,
	RuleBuilderCol,
} from './components/primitives/rule-builder-layout';
import { RuleBuilderParamRow } from './components/rule-builder-param-row/rule-builder-param-row';
import { ActionSelect } from './components/action-select/action-select';

const RuleBuilder = forwardRef<HTMLDivElement, RuleBuilderProps>(
	({ className, data, initialRows, initialAction = null, onDataChange, noWrap, ...props }, ref) => {
		const { rowsData, addNewRow, removeRow, updateParam, updateOperator, updateValue } =
			useRuleBuilderRows(initialRows);
		const [selectedAction, setSelectedAction] = useState<string | null>(initialAction);

		const paramOptions = useMemo(() => {
			return data.params.map(({ name, label }) => ({ label, value: name }));
		}, [data.params]);

		useEffect(() => {
			onDataChange?.(rowsData, selectedAction);
		}, [rowsData, selectedAction, onDataChange]);

		return (
			<div ref={ref} className={cn('rounded-[8px] p-4 bg-gray-100', className)} {...props}>
				<RuleBuilderSection>
					<RuleBuilderLabel>When</RuleBuilderLabel>

					<RuleBuilderRows className='mb-4'>
						{rowsData.map((rowData, index) => (
							<Fragment key={index}>
								{index > 0 && (
									<SeparatorWithText
										className='text-teal-300 uppercase'
										separatorClassName='bg-gray-border'>
										and
									</SeparatorWithText>
								)}

								<RuleBuilderParamRow
									rowData={rowData}
									noWrap={noWrap}
									params={{ data: data.params, options: paramOptions }}
									onParamChange={(param) => updateParam(index, param)}
									onOperatorChange={(operator) => updateOperator(index, operator)}
									onValueChange={(value) => updateValue(index, value)}
									onRemove={rowsData.length > 1 ? () => removeRow(index) : undefined}
								/>
							</Fragment>
						))}
					</RuleBuilderRows>

					<button
						className='inline-flex items-center gap-2 text-primary font-medium text-sm -tracking-[0.01em]'
						type='button'
						onClick={addNewRow}>
						<CirclePlus className='size-4' />
						<span>Add criteria</span>
					</button>
				</RuleBuilderSection>

				<Separator className='my-4' />

				<RuleBuilderSection>
					<RuleBuilderLabel>Then</RuleBuilderLabel>

					<RuleBuilderRows>
						<RuleBuilderRow>
							<RuleBuilderCols count={1}>
								<RuleBuilderCol>
									<ActionSelect
										actions={data.actions}
										value={selectedAction ?? undefined}
										onChange={setSelectedAction}
									/>
								</RuleBuilderCol>
							</RuleBuilderCols>
						</RuleBuilderRow>
					</RuleBuilderRows>
				</RuleBuilderSection>
			</div>
		);
	},
);
RuleBuilder.displayName = 'RuleBuilder';

export { RuleBuilder };
