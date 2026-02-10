import * as React from 'react';

import { cn } from '@shared/lib/utils';
import { Separator } from '@shared/components/ui/separator';

interface SeparatorWithTextProps extends React.HTMLAttributes<HTMLDivElement> {
	separatorClassName?: string;
}

const SeparatorWithText = React.forwardRef<HTMLDivElement, SeparatorWithTextProps>(
	({ className, separatorClassName, children, ...props }, ref) => (
		<div ref={ref} className={cn('flex items-center gap-2 text-xs', !children && '!gap-0', className)} {...props}>
			<Separator className={cn('flex-1', separatorClassName)} />
			{children && <span className='shrink-0'>{children}</span>}
			<Separator className={cn('flex-1', separatorClassName)} />
		</div>
	),
);
SeparatorWithText.displayName = 'SeparatorWithText';

export { SeparatorWithText };
