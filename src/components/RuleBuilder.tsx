import * as React from 'react';

import { cn } from '@shared/lib/utils';

const RuleBuilder = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('rounded-[8px] p-4 bg-gray-100', className)} {...props} />
	),
);
RuleBuilder.displayName = 'RuleBuilder';

const RuleBuilderSection = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
	({ className, ...props }, ref) => <section ref={ref} className={cn('', className)} {...props} />,
);
RuleBuilderSection.displayName = 'RuleBuilderSection';

const RuleBuilderLabel = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => <p ref={ref} className={cn('mb-2 text-foreground', className)} {...props} />,
);
RuleBuilderLabel.displayName = 'RuleBuilderLabel';

const RuleBuilderRows = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props} />,
);
RuleBuilderRows.displayName = 'RuleBuilderRows';

const RuleBuilderRow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />,
);
RuleBuilderRow.displayName = 'RuleBuilderRow';

const RuleBuilderRemove = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
	({ className, ...props }, ref) => (
		<button
			ref={ref}
			className={cn(
				'shrink-0 relative border border-current leading-none uppercase size-4 rounded-full',
				className,
			)}
			type='button'
			{...props}>
			{/* TODO: update */}
			<span className='abosule top-1/2 left-1/2 block rotate-45 leading-none ml-[1px] -mt-[2px] text-base origin-center'>
				+
			</span>
		</button>
	),
);
RuleBuilderRemove.displayName = 'RuleBuilderRemove';

const RuleBuilderCols = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn(' flex-1 flex gap-2', className)} {...props} />,
);
RuleBuilderCols.displayName = 'RuleBuilderCols';

interface RuleBuilderColProps extends React.HTMLAttributes<HTMLDivElement> {
	colSpan?: string;
}

const RuleBuilderCol = React.forwardRef<HTMLDivElement, RuleBuilderColProps>(
	({ className, colSpan, ...props }, ref) => <div ref={ref} className={cn('flex-1', className)} {...props} />,
);
RuleBuilderCol.displayName = 'RuleBuilderCol';

export {
	RuleBuilder,
	RuleBuilderSection,
	RuleBuilderLabel,
	RuleBuilderRows,
	RuleBuilderRow,
	RuleBuilderRemove,
	RuleBuilderCols,
	RuleBuilderCol,
};
