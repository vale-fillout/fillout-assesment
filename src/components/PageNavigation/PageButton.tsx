"use client";

import clsx from "clsx";
import React, { useRef } from "react";
import { useButton } from "react-aria";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
	CopyIcon,
	DuplicateIcon,
	FlagIcon,
	PencilIcon,
	TrashIcon,
} from "../Icons";
import { SettingsMenu } from "../SettingsMenu";
import { Page } from "./types";

/**
 * Button component for a page in the page navigation.
 */
export function PageButton({
	page,
	onPageChange,
	isActive,
	dragRef,
	dragStyle,
	dragAttributes,
	dragListeners,
}: {
	page: Page;
	onPageChange: (pageId: string) => void;
	isActive: boolean;
	dragRef?: (node: HTMLElement | null) => void;
	dragStyle?: React.CSSProperties;
	dragAttributes?: DraggableAttributes;
	dragListeners?: SyntheticListenerMap;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const { buttonProps } = useButton(
		{
			onPress: () => onPageChange(page.id),
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

	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		// Call button's pointer down first
		if (buttonProps.onPointerDown) {
			buttonProps.onPointerDown(e);
		}
		// Then call drag listener if it exists
		if (dragListeners?.onPointerDown) {
			dragListeners.onPointerDown(e);
		}
	};

	return (
		<div
			{...buttonProps}
			{...(dragAttributes || {})}
			ref={(node) => {
				if (ref.current) ref.current = node;
				if (dragRef) dragRef(node);
			}}
			className={`group flex items-center gap-1.5 px-2.5 py-1 h-8 rounded-lg border-[0.5px] transition-colors cursor-pointer hover:bg-gray-200/35 hover:text-slate-500 focus:bg-gray-100/100 
        ${
					isActive
						? "bg-white border-gray-200 text-gray-900 shadow-sm"
						: "bg-gray-200/15 border-transparent text-slate-500"
				}
      `}
			style={dragStyle}
			onPointerDown={handlePointerDown}
			{...(dragListeners?.onKeyDown
				? {
						onKeyDown:
							dragListeners.onKeyDown as React.KeyboardEventHandler<HTMLDivElement>,
					}
				: {})}
		>
			<div className="w-5 h-5 flex items-center justify-center">
				{page.icon}
			</div>
			<span className="text-sm font-medium tracking-tight leading-5">
				{page.label}
			</span>
			<div className={clsx(isActive ? "flex" : "hidden")}>
				<SettingsMenu actionGroups={dummyActions} />
			</div>
		</div>
	);
}
