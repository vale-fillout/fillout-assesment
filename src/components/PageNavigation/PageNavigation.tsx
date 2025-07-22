"use client";

import { Button } from "react-aria-components";
import React, { useState } from "react";
import { PageNavigationProps } from "./types";
import { AddPageIcon } from "../Icons/AddPage";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortablePageButton } from "./SortablePageButton";
import { PlusIcon } from "../Icons";

export function PageNavigation({
	pages,
	onPageChange,
	onAddPage,
	onPagesReorder,
}: PageNavigationProps) {
	const [localPages, setLocalPages] = useState(pages);
	const [hoveredPageId, setHoveredPageId] = useState<string | null>(null);
	const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = (pageId: string) => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}
		setHoveredPageId(pageId);
	};

	const handleMouseLeave = () => {
		hoverTimeoutRef.current = setTimeout(() => {
			setHoveredPageId(null);
		}, 100);
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = localPages.findIndex((page) => page.id === active.id);
			const newIndex = localPages.findIndex((page) => page.id === over.id);

			const newPages = arrayMove(localPages, oldIndex, newIndex);
			setLocalPages(newPages);
			onPagesReorder?.(newPages);
		}
	};

	React.useEffect(() => {
		setLocalPages(pages);
	}, [pages]);

	const Connector = ({ isAnimated = false }: { isAnimated?: boolean }) => (
		<div
			className={`w-5 h-[1.5px] border-t border-dashed border-gray-300 transition-all duration-1500 ${isAnimated ? "animate-in fade-in-0 slide-in-from-left-4" : ""}`}
		/>
	);

	const addToLastPage = React.useCallback(() => {
		onAddPage(localPages[localPages.length - 1]?.id);
	}, [localPages, onAddPage]);

	return (
		<div className="p-5 min-h-screen">
			<div className="rounded-xl border-[0.5px] border-gray-200 shadow-sm p-5 max-w-[80vw] mx-auto">
				<div className="flex items-center justify-between">
					<div className="w-[109px] h-[15px]" />
					<div className="flex items-center flex-wrap gap-2 justify-center">
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
						>
							<SortableContext
								items={localPages.map((page) => page.id)}
								strategy={horizontalListSortingStrategy}
							>
								{localPages.map((page, index) => {
									const activePageId = localPages.find(
										(p) => p.status === "active",
									)?.id;
									const targetPageId = hoveredPageId || activePageId;
									const showAddButton = page.id === targetPageId;

									return (
										<React.Fragment key={page.id}>
											<div
												onMouseEnter={() => handleMouseEnter(page.id)}
												onMouseLeave={handleMouseLeave}
												className="flex items-center"
											>
												<SortablePageButton
													page={page}
													isActive={page.status === "active"}
													onPageChange={onPageChange}
												/>
												{showAddButton && (
													<div className="flex items-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out">
														<Connector isAnimated />
														<AddButton onPress={() => onAddPage(page.id)} />
														<Connector isAnimated />
													</div>
												)}
												{index < localPages.length - 1 && !showAddButton && (
													<Connector />
												)}
											</div>
										</React.Fragment>
									);
								})}
							</SortableContext>
						</DndContext>
						<Connector />
						<Button
							onPress={addToLastPage}
							className="flex items-center gap-1.5 px-2.5 py-1 h-8 bg-white rounded-lg border-[0.5px] border-gray-200 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
						>
							<AddPageIcon />
							<span className="text-sm font-medium text-gray-900 tracking-tight leading-5">
								Add page
							</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

/**
 * Button icon for adding a new page.
 */
function AddButton({ onPress }: { onPress: () => void }) {
	return (
		<Button
			onPress={onPress}
			className="w-4 h-4 bg-white rounded-lg border-[0.5px] border-gray-200 shadow-sm cursor-pointer flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all duration-500 ease-out animate-in fade-in-0 zoom-in-75 slide-in-from-bottom-4"
		>
			<PlusIcon />
		</Button>
	);
}

export default PageNavigation;
