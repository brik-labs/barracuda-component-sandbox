import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@shared/lib/utils';

export const RuleBuilderSection = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
	({ className, ...props }, ref) => <section ref={ref} className={cn('', className)} {...props} />,
);
RuleBuilderSection.displayName = 'RuleBuilderSection';

export const RuleBuilderLabel = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => <p ref={ref} className={cn('mb-2 text-foreground', className)} {...props} />,
);
RuleBuilderLabel.displayName = 'RuleBuilderLabel';

export const RuleBuilderRows = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props} />,
);
RuleBuilderRows.displayName = 'RuleBuilderRows';

export const RuleBuilderRow = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />,
);
RuleBuilderRow.displayName = 'RuleBuilderRow';

export interface RuleBuilderColsProps extends HTMLAttributes<HTMLDivElement> {
	count?: number;
}

export const RuleBuilderCols = forwardRef<HTMLDivElement, RuleBuilderColsProps>(
	({ className, count, ...props }, ref) => {
		const gridColsClass =
			count === 1
				? 'grid grid-cols-1'
				: count === 2
					? 'grid grid-cols-2'
					: count === 3
						? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:[&>*:nth-child(3n)]:col-span-2 md:[&>*:nth-child(3n)]:col-span-1'
						: count === 4
							? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
							: '';

		return (
			<div
				ref={ref}
				className={cn('flex-1 gap-2', count ? (gridColsClass ?? 'flex') : 'flex', className)}
				{...props}
			/>
		);
	},
);
RuleBuilderCols.displayName = 'RuleBuilderCols';

export interface RuleBuilderColProps extends HTMLAttributes<HTMLDivElement> {
	colSpan?: string;
}

export const RuleBuilderCol = forwardRef<HTMLDivElement, RuleBuilderColProps>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex-1', className)} {...props} />
));
RuleBuilderCol.displayName = 'RuleBuilderCol';
