"use client";

import { Button } from "react-aria-components";
import { useButton } from "react-aria";
import React, { useRef } from "react";
import { StepperNavigationProps, Step } from "./types";
import { SettingsMenu } from "../SettingsMenu";
import clsx from "clsx";
import { AddPageIcon } from "../Icons/AddPage";
import {
	CopyIcon,
	DuplicateIcon,
	FlagIcon,
	PencilIcon,
	TrashIcon,
} from "../Icons";

// Icon assets from Figma
const icons = {
	plus: "http://localhost:3845/assets/cfe8bf6eb0599195717ea9e8a80ed9c8bab42fb9.svg",
	addPage:
		"http://localhost:3845/assets/44efc52d3be18efd085adae93d5937d0f09f3ac8.svg",
};

const StepperNavigation = ({
	steps,
	onStepChange,
	onAddPage,
}: StepperNavigationProps) => {
	const StepButton = ({
		step,
		isActive,
	}: {
		step: Step;
		isActive: boolean;
	}) => {
		const ref = useRef<HTMLDivElement>(null);
		const { buttonProps } = useButton(
			{
				onPress: () => onStepChange(step.id),
			},
			ref,
		);

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
			<div
				{...buttonProps}
				ref={ref}
				className={`group flex items-center gap-1.5 px-2.5 py-1 h-8 rounded-lg border-[0.5px] transition-colors cursor-pointer hover:bg-gray-200/35 hover:text-slate-500 focus:bg-gray-100/100 
        ${
					isActive
						? "bg-white border-gray-200 text-gray-900 shadow-sm"
						: "bg-gray-200/15 border-transparent text-slate-500"
				}
      `}
			>
				<img src={step.icon} alt="" className="w-5 h-5" />
				<span className="text-sm font-medium tracking-tight leading-5">
					{step.label}
				</span>
				<div className={clsx(isActive ? "flex" : "hidden")}>
					<SettingsMenu actionGroups={dummyActions} />
				</div>
			</div>
		);
	};

	const AddButton = ({ afterStepId }: { afterStepId: string }) => (
		<Button 
			onPress={() => onAddPage(afterStepId)}
			className="w-4 h-4 bg-white rounded-lg border-[0.5px] border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
		>
			<img src={icons.plus} alt="Add" className="w-2 h-2" />
		</Button>
	);

	const AddPageButton = () => (
		<Button
			onPress={() => onAddPage()}
			className="flex items-center gap-1.5 px-2.5 py-1 h-8 bg-white rounded-lg border-[0.5px] border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
		>
			<AddPageIcon />
			<span className="text-sm font-medium text-gray-900 tracking-tight leading-5">
				Add page
			</span>
		</Button>
	);

	const Connector = () => (
		<div className="w-5 h-[1.5px] border-t border-dashed border-gray-300" />
	);

	return (
		<div className="p-5 min-h-screen">
			<div className="rounded-xl border-[0.5px] border-gray-200 shadow-sm p-5">
				<div className="flex items-center justify-between">
					{/* Left side - spacer */}
					<div className="w-[109px] h-[15px]" />

					{/* Right side - stepper navigation */}
					<div className="flex items-center">
						{steps.map((step, index) => (
							<React.Fragment key={step.id}>
								<StepButton step={step} isActive={step.status === "active"} />
								{step.status === "active" && (
									<>
										<Connector />
										<AddButton afterStepId={step.id} />
									</>
								)}
								{index < steps.length - 1 && step.status !== "active" && (
									<Connector />
								)}
							</React.Fragment>
						))}

						<Connector />
						<AddPageButton />
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepperNavigation;
