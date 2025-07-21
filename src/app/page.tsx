"use client";

import {
	CopyIcon,
	DuplicateIcon,
	FlagIcon,
	PencilIcon,
	TrashIcon,
} from "@/components/Icons";
import { SettingsMenu } from "@/components/SettingsMenu";
import { StepperNavigation } from "@/components/StepperNavigation";
import React, { useState } from "react";

// Icon assets from Figma
const icons = {
	info: "http://localhost:3845/assets/77d977b7b61e09b31b0434b1f19a3f1c8664c11d.svg",
	document:
		"http://localhost:3845/assets/9b29dac00fa45008b27cc7e77db9cae5e7958b11.svg",
	plus: "http://localhost:3845/assets/cfe8bf6eb0599195717ea9e8a80ed9c8bab42fb9.svg",
	check:
		"http://localhost:3845/assets/f42a1588dc71265c1c22609c4bd3adf6b43ab6db.svg",
	addPage:
		"http://localhost:3845/assets/44efc52d3be18efd085adae93d5937d0f09f3ac8.svg",
};

export default function Home() {
	const [activeStepId, setActiveStepId] = useState("info");
	const [baseSteps, setBaseSteps] = useState([
		{ id: "info", label: "Info", icon: icons.info },
		{ id: "details", label: "Details", icon: icons.document },
		{ id: "other", label: "Other", icon: icons.document },
		{ id: "ending", label: "Ending", icon: icons.check },
	]);

	const steps = baseSteps.map((step) => ({
		...step,
		status:
			step.id === activeStepId ? ("active" as const) : ("inactive" as const),
	}));

	const handleStepChange = (stepId: string) => {
		setActiveStepId(stepId);
	};

	const handleAddPage = (afterStepId?: string) => {
		const newPageId = `page-${Date.now()}`;
		const newPage = {
			id: newPageId,
			label: "Untitled",
			icon: icons.document,
		};
		
		if (afterStepId) {
			setBaseSteps((prev) => {
				const index = prev.findIndex(step => step.id === afterStepId);
				const newSteps = [...prev];
				newSteps.splice(index + 1, 0, newPage);
				return newSteps;
			});
		} else {
			setBaseSteps((prev) => [...prev, newPage]);
		}
		
		setActiveStepId(newPageId);
	};

	const dummyActions: MenuAction[][] = [
		[
			{
				id: "set-first-page",
				label: "Set as first page",
				icon: <FlagIcon />,
				onClick: () => console.log("Set as first page"),
			},
			{
				id: "rename",
				label: "Rename",
				icon: <PencilIcon />,
				onClick: () => console.log("Rename"),
			},
			{
				id: "copy",
				label: "Copy",
				icon: <CopyIcon />,
				onClick: () => console.log("Copy"),
			},
			{
				id: "duplicate",
				label: "Duplicate",
				icon: <DuplicateIcon />,
				onClick: () => console.log("Duplicate"),
			},
		],
		[
			{
				id: "delete",
				label: "Delete",
				icon: <TrashIcon />,
				variant: "danger",
				onClick: () => console.log("Delete"),
			},
		],
	];

	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				<StepperNavigation
					steps={steps}
					onStepChange={handleStepChange}
					onAddPage={handleAddPage}
				/>
				<SettingsMenu actionGroups={dummyActions} />
			</footer>
		</div>
	);
}
