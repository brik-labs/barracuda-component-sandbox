import * as React from 'react';

import { cn } from '@shared/lib/utils';
import {
	RuleBuilder,
	RuleBuilderCol,
	RuleBuilderCols,
	RuleBuilderLabel,
	RuleBuilderRemove,
	RuleBuilderRow,
	RuleBuilderRows,
	RuleBuilderSection,
} from '@/components/RuleBuilder';
import { Separator } from '@shared/components/ui/separator';
import { SeparatorWithText } from '@/shared/components/ui/separator-with-text';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@shared/components/ui/select';

const RuleBuilderExample = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('tailwind classes', className)} {...props}>
			<RuleBuilder>
				<RuleBuilderSection>
					<RuleBuilderLabel>When</RuleBuilderLabel>

					<RuleBuilderRows>
						<RuleBuilderRow>
							<RuleBuilderCols>
								<RuleBuilderCol>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder='Choose option...' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='opt1'>Option 1</SelectItem>
											<SelectItem value='opt2'>Option 2</SelectItem>
											<SelectItem value='opt3'>Option 3</SelectItem>
										</SelectContent>
									</Select>
								</RuleBuilderCol>

								<RuleBuilderCol>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder='Choose option...' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='opt1'>Option 1</SelectItem>
											<SelectItem value='opt2'>Option 2</SelectItem>
											<SelectItem value='opt3'>Option 3</SelectItem>
										</SelectContent>
									</Select>
								</RuleBuilderCol>

								<RuleBuilderCol>
									<p className='bg-white p-2 rounded-lg border border-gray-300'>Rule Field</p>
								</RuleBuilderCol>
							</RuleBuilderCols>

							<RuleBuilderRemove />
						</RuleBuilderRow>

						<SeparatorWithText className='text-teal-300 uppercase' separatorClassName='bg-gray-border'>
							and
						</SeparatorWithText>

						<RuleBuilderRow>
							<RuleBuilderCols>
								<RuleBuilderCol>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder='Choose option...' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='opt1'>Option 1</SelectItem>
											<SelectItem value='opt2'>Option 2</SelectItem>
											<SelectItem value='opt3'>Option 3</SelectItem>
										</SelectContent>
									</Select>
								</RuleBuilderCol>

								<RuleBuilderCol>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder='Choose option...' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='opt1'>Option 1</SelectItem>
											<SelectItem value='opt2'>Option 2</SelectItem>
											<SelectItem value='opt3'>Option 3</SelectItem>
										</SelectContent>
									</Select>
								</RuleBuilderCol>

								<RuleBuilderCol>
									<p className='bg-white p-2 rounded-lg border border-gray-300'>Rule Field</p>
								</RuleBuilderCol>

								<RuleBuilderCol>
									<p className='bg-white p-2 rounded-lg border border-gray-300'>Rule Field</p>
								</RuleBuilderCol>
							</RuleBuilderCols>

							<RuleBuilderRemove />
						</RuleBuilderRow>

						<SeparatorWithText className='text-teal-300 uppercase' separatorClassName='bg-gray-border'>
							and
						</SeparatorWithText>

						<RuleBuilderRow>
							<RuleBuilderCols>
								<RuleBuilderCol>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder='Choose option...' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='opt1'>Option 1</SelectItem>
											<SelectItem value='opt2'>Option 2</SelectItem>
											<SelectItem value='opt3'>Option 3</SelectItem>
										</SelectContent>
									</Select>
								</RuleBuilderCol>

								<RuleBuilderCol>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder='Choose option...' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='opt1'>Option 1</SelectItem>
											<SelectItem value='opt2'>Option 2</SelectItem>
											<SelectItem value='opt3'>Option 3</SelectItem>
										</SelectContent>
									</Select>
								</RuleBuilderCol>

								<RuleBuilderCol>
									<p className='bg-white p-2 rounded-lg border border-gray-300'>Rule Field</p>
								</RuleBuilderCol>
							</RuleBuilderCols>

							<RuleBuilderRemove />
						</RuleBuilderRow>
					</RuleBuilderRows>
				</RuleBuilderSection>

				<Separator className='my-4' />

				<RuleBuilderSection>
					<RuleBuilderLabel>Then</RuleBuilderLabel>

					<RuleBuilderRows>
						<RuleBuilderRow>
							<div className='rule__cols'>
								<div className='rule__col'>
									<p className='flex-1 bg-white p-2 rounded-lg border border-gray-300'>Rule Field</p>
								</div>
							</div>
						</RuleBuilderRow>
					</RuleBuilderRows>
				</RuleBuilderSection>
			</RuleBuilder>
		</div>
	),
);
RuleBuilderExample.displayName = 'RuleBuilderExample';

export { RuleBuilderExample };
