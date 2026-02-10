import * as React from 'react';

import { cn } from '@shared/lib/utils';

const RuleBuilderModal = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('tailwind classes', className)} {...props} />,
);
RuleBuilderModal.displayName = 'RuleBuilderModal';

const RuleBuilderModalHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('relative mb-10 pr-10', className)} {...props} />,
);
RuleBuilderModalHeader.displayName = 'RuleBuilderModalHeader';

const RuleBuilderModalHead = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
	({ className, ...props }, ref) => <hgroup ref={ref} className={cn('relative mb-10 pr-10', className)} {...props} />,
);
RuleBuilderModalHead.displayName = 'RuleBuilderModalHead';

const RuleBuilderModalTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => (
		<h2 ref={ref} className={cn('mb-2 text-foreground text-3xl', className)} {...props} />
	),
);
RuleBuilderModalTitle.displayName = 'RuleBuilderModalTitle';

const RuleBuilderModalDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => <p ref={ref} className={cn('text-base text-gray-500', className)} {...props} />,
);
RuleBuilderModalDescription.displayName = 'RuleBuilderModalDescription';

const RuleBuilderModalClose = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
	({ className, children, ...props }, ref) => (
		<button ref={ref} className={cn('absolute top-2 right-0', className)} type='button' {...props}>
			{/* TODO: update */}
			<span className='block text-7xl font-thin origin-center rotate-45 -mt-3'>+</span>
		</button>
	),
);
RuleBuilderModalClose.displayName = 'RuleBuilderModalClose';

const RuleBuilderModalBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('relative mb-10 pr-10', className)} {...props} />,
);
RuleBuilderModalBody.displayName = 'RuleBuilderModalBody';

export {
	RuleBuilderModal,
	RuleBuilderModalHeader,
	RuleBuilderModalHead,
	RuleBuilderModalTitle,
	RuleBuilderModalDescription,
	RuleBuilderModalClose,
	RuleBuilderModalBody,
};
