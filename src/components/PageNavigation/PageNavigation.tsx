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

// Icon assets from Figma
const icons = {
	plus: "http://localhost:3845/assets/cfe8bf6eb0599195717ea9e8a80ed9c8bab42fb9.svg",
	addPage:
		"http://localhost:3845/assets/44efc52d3be18efd085adae93d5937d0f09f3ac8.svg",
};

export function PageNavigation({
	pages,
	onPageChange,
	onAddPage,
	onPagesReorder,
}: PageNavigationProps) {
	const [localPages, setLocalPages] = useState(pages);

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

	// why?
	React.useEffect(() => {
		setLocalPages(pages);
	}, [pages]);

	const AddButton = ({ afterPageId }: { afterPageId: string }) => (
		<Button
			onPress={() => onAddPage(afterPageId)}
			className="w-4 h-4 bg-white rounded-lg border-[0.5px] border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
		>
			<img src={icons.plus} alt="Add" className="w-2 h-2" />
		</Button>
	);

	const Connector = () => (
		<div className="w-5 h-[1.5px] border-t border-dashed border-gray-300" />
	);

	const addToLastPage = React.useCallback(() => {
		onAddPage(localPages[localPages.length - 1]?.id);
	}, [localPages, onAddPage]);

	return (
		<div className="p-5 min-h-screen">
			<div className="rounded-xl border-[0.5px] border-gray-200 shadow-sm p-5">
				<div className="flex items-center justify-between">
					<div className="w-[109px] h-[15px]" />
					<div className="flex items-center">
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
						>
							<SortableContext
								items={localPages.map((page) => page.id)}
								strategy={horizontalListSortingStrategy}
							>
								{localPages.map((page, index) => (
									<React.Fragment key={page.id}>
										<SortablePageButton
											page={page}
											isActive={page.status === "active"}
											onPageChange={onPageChange}
										/>
										{page.status === "active" && (
											<>
												<Connector />
												<AddButton afterPageId={page.id} />
											</>
										)}
										{index < localPages.length - 1 &&
											page.status !== "active" && <Connector />}
									</React.Fragment>
								))}
							</SortableContext>
						</DndContext>
						<Connector />
						<AddPageButton onAddPage={addToLastPage} />
					</div>
				</div>
			</div>
		</div>
	);
}

export function AddPageButton(props: { onAddPage: () => void }) {
	const { onAddPage } = props;
	return (
		<Button
			onPress={onAddPage}
			className="flex items-center gap-1.5 px-2.5 py-1 h-8 bg-white rounded-lg border-[0.5px] border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
		>
			<AddPageIcon />
			<span className="text-sm font-medium text-gray-900 tracking-tight leading-5">
				Add page
			</span>
		</Button>
	);
}

export default PageNavigation;
