import { MenuItem } from "react-aria-components";

type MenuActionVariant = "default" | "danger";

type MenuAction = {
	id: string;
	label: string;
	icon: React.ReactNode;
	variant?: MenuActionVariant;
	onClick: () => void;
};

export function SettingsMenuItem(props: MenuAction) {
	const { id, icon, label, variant = "default", onClick } = props;
	const baseClasses =
		"flex items-center gap-1.5 px-0 py-1.5 rounded cursor-pointer outline-none";
	const variantClasses = {
		default: "text-gray-900 hover:bg-gray-50 focus:bg-gray-50",
		danger: "text-red-500 hover:bg-red-50 focus:bg-red-50",
	};

	return (
		<MenuItem
			id={id}
			className={`${baseClasses} ${variantClasses[variant]}`}
			onAction={onClick}
		>
			{icon}
			<span className="text-sm font-medium tracking-tight">{label}</span>
		</MenuItem>
	);
}
