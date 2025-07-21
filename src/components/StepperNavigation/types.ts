export interface Step {
	id: string;
	label: string;
	icon: string;
	status: "active" | "inactive";
}

export interface StepperNavigationProps {
	steps: Step[];
	onStepChange: (stepId: string) => void;
	onAddPage: (afterStepId?: string) => void;
}
