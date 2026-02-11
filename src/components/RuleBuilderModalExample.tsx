import * as React from 'react';

import { cn } from '@shared/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import {
	RuleBuilderModal,
	RuleBuilderModalBody,
	RuleBuilderModalClose,
	RuleBuilderModalDescription,
	RuleBuilderModalHead,
	RuleBuilderModalHeader,
	RuleBuilderModalTitle,
} from '@/components/RuleBuilderModal';

import ruleBuilderData from '@/data/rule-builder-data.json';
import RuleBuilder from '@/components/RuleBuilder';

const RuleBuilderModalExample = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('', className)} {...props}>
			<RuleBuilderModal>
				<RuleBuilderModalHeader>
					<RuleBuilderModalHead>
						<RuleBuilderModalTitle>Add a rule for authentication</RuleBuilderModalTitle>

						<RuleBuilderModalDescription>
							Phasellus lacus massa cras ante integer tortor eu consequat.
						</RuleBuilderModalDescription>
					</RuleBuilderModalHead>

					<RuleBuilderModalClose />
				</RuleBuilderModalHeader>

				<RuleBuilderModalBody>
					<Card>
						<CardHeader>
							<CardTitle className='text-foreground font-semibold text-lg'>Rule Parameters</CardTitle>
						</CardHeader>
						<CardContent>
							<RuleBuilder data={ruleBuilderData} />
						</CardContent>
					</Card>
				</RuleBuilderModalBody>
			</RuleBuilderModal>
		</div>
	),
);
RuleBuilderModalExample.displayName = 'RuleBuilderModalExample';

export { RuleBuilderModalExample };
