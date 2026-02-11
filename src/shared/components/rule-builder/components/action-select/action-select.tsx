import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@shared/components/ui/select';
import type { RuleBuilderAction } from '../../rule-builder.types';

export interface ActionSelectProps {
	actions: RuleBuilderAction[];
	value?: string;
	onChange?: (value: string) => void;
}

export const ActionSelect = ({ actions, value, onChange }: ActionSelectProps) => {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger>
				<SelectValue placeholder='Action' />
			</SelectTrigger>

			<SelectContent>
				{actions.map((action) => (
					<SelectItem key={action.name} value={action.name}>
						{action.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
