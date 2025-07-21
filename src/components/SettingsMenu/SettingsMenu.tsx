import React from "react";
import {
	Button,
	Header,
	Menu,
	MenuSection,
	MenuTrigger,
	Popover,
	Separator,
} from "react-aria-components";
import { SettingsMenuIcon } from "../Icons";
import { SettingsMenuItem } from "./SettingsMenuItem";

type SettingsMenuProps = {
	actionGroups: MenuAction[][];
	title?: string;
};

/**
 * SettingsMenu component renders a customizable settings menu with action groups.
 */
export default function SettingsMenu(props: SettingsMenuProps) {
	const { actionGroups, title = "Settings" } = props;

	return (
		<MenuTrigger>
			<Button className="hover:bg-gray-200 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent border-none">
				<SettingsMenuIcon />
			</Button>

			<Popover className="bg-white font-sans shadow-lg border border-gray-200 rounded-xl min-w-[200px] p-0 outline-none">
				<Menu className="outline-none">
					<MenuSection className="bg-gray-50 p-3 rounded-t-xl">
						<Header>{title}</Header>
					</MenuSection>
					<MenuSection className="px-3 py-2">
						{actionGroups.map((actions, idx) => {
							return (
								<React.Fragment key={idx}>
									{actions.map((action) => (
										<SettingsMenuItem
											key={action.id}
											id={action.id}
											icon={action.icon}
											label={action.label}
											variant={action.variant}
											onClick={action.onClick}
										/>
									))}
									{idx < actionGroups.length - 1 ? (
										<Separator className="h-px bg-gray-200 my-2.5" />
									) : null}
								</React.Fragment>
							);
						})}
					</MenuSection>
				</Menu>
			</Popover>
		</MenuTrigger>
	);
}
