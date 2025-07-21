type MenuActionVariant = "default" | "danger";

type MenuAction = {
	id: string;
	label: string;
	icon: React.ReactNode;
	variant?: MenuActionVariant;
	onClick: () => void;
};
