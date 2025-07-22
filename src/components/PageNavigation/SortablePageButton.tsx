"use client";

import React, {} from "react";
import { Page } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PageButton } from "./PageButton";

/**
 * A sortable button wrapper that allows pages in the page navigation to be ordered
 */
export function SortablePageButton({
	page,
	isActive,
	onPageChange,
}: {
	page: Page;
	isActive: boolean;
	onPageChange: (pageId: string) => void;
}) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: page.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<PageButton
			page={page}
			onPageChange={onPageChange}
			isActive={isActive}
			dragRef={setNodeRef}
			dragStyle={style}
			dragAttributes={attributes}
			dragListeners={listeners}
		/>
	);
}
