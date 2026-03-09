import { CirclePlus, X } from 'lucide-react';
import { Dialog } from '@/shared/components/ui/dialog';
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from '@radix-ui/react-dialog';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import ruleBuilderData from '@/data/rule-builder-data.json';
import RuleBuilder from '@/shared/components/rule-builder/rule-builder';
import { cn } from '@/shared/lib/utils';
import { useState } from 'react';
import { RowData } from '@/shared/components/rule-builder/rule-builder.types';

interface RuleBuilderModalProps {
	title?: string;
	description?: string;
	size?: 'sm' | 'lg';
	buttonText?: string;
}

const RuleBuilderModal = ({
	title,
	description,
	size = 'sm',
	buttonText = 'Open Modal',
}: RuleBuilderModalProps): JSX.Element => {
	const [rule, setRule] = useState<any>(null);

	const handleRuleChange = (rows: RowData[], action: string | null) => setRule({ rows, action });

	const submitRule = () => {
		console.log(rule);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='action'>{buttonText}</Button>
			</DialogTrigger>
			<DialogPortal>
				<DialogOverlay className='fixed inset-0 bg-foreground opacity-80' />
				<div className={cn('fixed top-0 right-0 size-full p-3 md:p-4', size === 'sm' && 'max-w-2xl')}>
					<DialogContent className='flex flex-col size-full rounded-[1rem] md:rounded-[2rem] p-3 md:p-6 bg-background'>
						<div className='relative mb-6 pr-12'>
							{title && (
								<DialogTitle className='mb-0.5 text-foreground text-2xl font-medium'>
									{title}
								</DialogTitle>
							)}

							{description && (
								<DialogDescription className='text-sm text-muted-foreground -tracking-[0.01em]'>
									{description}
								</DialogDescription>
							)}

							<DialogClose className='absolute top-2 right-0' asChild>
								<button aria-label='Close'>
									<X className='size-6' />
								</button>
							</DialogClose>
						</div>

						<Card>
							<CardHeader>
								<CardTitle className='text-foreground font-semibold text-lg'>Rule Parameters</CardTitle>
							</CardHeader>
							<CardContent>
								<RuleBuilder
									data={ruleBuilderData}
									onDataChange={handleRuleChange}
									noWrap={size === 'sm'}
								/>
							</CardContent>
						</Card>

						<div className='flex items-center justify-end gap-2 mt-auto'>
							<DialogClose asChild>
								<Button variant='action-outline'>Cancel</Button>
							</DialogClose>

							<DialogClose asChild>
								<Button variant='action' onClick={submitRule}>
									<CirclePlus className='size-6' />

									<span>Add Rule</span>
								</Button>
							</DialogClose>
						</div>
					</DialogContent>
				</div>
			</DialogPortal>
		</Dialog>
	);
};

export default RuleBuilderModal;
