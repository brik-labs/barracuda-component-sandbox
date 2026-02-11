import { forwardRef } from 'react';
import { cn } from '@shared/lib/utils';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@shared/components/ui/select';
import { CircleX } from 'lucide-react';

import type { RuleBuilderParamRowProps } from './rule-builder-param-row.types';
import { useParamRowState } from './use-param-row-state';
import { renderTypeBasedInput } from './input-factory';

import { RuleBuilderRow, RuleBuilderCols, RuleBuilderCol } from '../primitives/rule-builder-layout';

export const RuleBuilderParamRow = forwardRef<HTMLDivElement, RuleBuilderParamRowProps>(
	(
		{
			className,
			rowData,
			params,
			onRemove,
			onParamChange,
			onOperatorChange,
			onValueChange,
			noWrap = false,
			...props
		},
		ref,
	) => {
		const {
			selectedParam,
			operators,
			selectedOperator,
			isDate,
			isBetween,
			selectParamByName,
			selectOperatorByValue,
		} = useParamRowState({
			rowData,
			params: params.data,
			onParamChange,
			onOperatorChange,
			onValueChange,
		});

		if (!selectedParam) {
			return (
				<RuleBuilderRow ref={ref} className={cn('', className)} {...props}>
					<RuleBuilderCols count={3}>
						<RuleBuilderCol>
							<Select value={rowData.param ?? undefined} onValueChange={selectParamByName}>
								<SelectTrigger>
									<SelectValue placeholder='Parameter' />
								</SelectTrigger>
								<SelectContent>
									{params.options.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</RuleBuilderCol>
					</RuleBuilderCols>

					{onRemove && (
						<button className='shrink-0' type='button' onClick={onRemove}>
							<CircleX className='size-4' />
						</button>
					)}
				</RuleBuilderRow>
			);
		}

		return (
			<RuleBuilderRow ref={ref} className={cn('', className)} {...props}>
				<RuleBuilderCols count={3}>
					<RuleBuilderCol>
						<Select value={selectedParam.name} onValueChange={selectParamByName}>
							<SelectTrigger>
								<SelectValue placeholder='Parameter' />
							</SelectTrigger>
							<SelectContent>
								{params.options.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</RuleBuilderCol>

					{operators && (
						<RuleBuilderCol>
							<Select
								value={selectedOperator?.value ?? operators.defaultOption ?? undefined}
								onValueChange={selectOperatorByValue}>
								<SelectTrigger>
									<SelectValue placeholder='Operator' />
								</SelectTrigger>
								<SelectContent>
									{operators.options.map(({ value, label }, index) => (
										<SelectItem key={index} value={value}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</RuleBuilderCol>
					)}

					{selectedOperator && (
						<RuleBuilderCol>
							{isBetween && !isDate ? (
								<RuleBuilderCols count={2}>
									<RuleBuilderCol>
										{renderTypeBasedInput({
											selectedParam,
											isBetween,
											name: `${selectedParam.name}_from`,
											placeholder: 'From',
											prefix: selectedParam.prefix,
											options: selectedParam.options,
											noWrap,
											value: rowData.value?.split('-')[0] ?? null,
											onChange: (val) => {
												const to = rowData.value?.split('-')[1] ?? '';
												onValueChange(`${val ?? ''}-${to}`);
											},
										})}
									</RuleBuilderCol>

									<RuleBuilderCol>
										{renderTypeBasedInput({
											selectedParam,
											isBetween,
											name: `${selectedParam.name}_to`,
											placeholder: 'To',
											prefix: selectedParam.prefix,
											options: selectedParam.options,
											noWrap,
											value: rowData.value?.split('-')[1] ?? null,
											onChange: (val) => {
												const from = rowData.value?.split('-')[0] ?? '';
												onValueChange(`${from}-${val ?? ''}`);
											},
										})}
									</RuleBuilderCol>
								</RuleBuilderCols>
							) : (
								renderTypeBasedInput({
									selectedParam,
									isBetween,
									name: selectedParam.name,
									placeholder: selectedParam.label,
									prefix: selectedParam.prefix,
									options: selectedParam.options,
									noWrap,
									value: rowData.value,
									onChange: onValueChange,
								})
							)}
						</RuleBuilderCol>
					)}
				</RuleBuilderCols>

				{onRemove && (
					<button className='shrink-0' type='button' onClick={onRemove}>
						<CircleX className='size-4' />
					</button>
				)}
			</RuleBuilderRow>
		);
	},
);
RuleBuilderParamRow.displayName = 'RuleBuilderParamRow';
