"use client";

import { CheckIcon, DocumentIcon, InfoIcon } from "@/components/Icons";
import { PageNavigation } from "@/components/PageNavigation";
import React, { useState } from "react";

/**
 * Fillout page navigaiotn bottom nav
 */
export default function Home() {
	const [activePageId, setActivePageId] = useState("info");
	const [basePages, setBasePages] = useState([
		{ id: "info", label: "Info", icon: <InfoIcon /> },
		{ id: "details", label: "Details", icon: <DocumentIcon /> },
		{ id: "other", label: "Other", icon: <DocumentIcon /> },
		{ id: "ending", label: "Ending", icon: <CheckIcon /> },
	]);

	const pages = basePages.map((page) => ({
		...page,
		status:
			page.id === activePageId ? ("active" as const) : ("inactive" as const),
	}));

	const handlePageChange = (pageId: string) => {
		setActivePageId(pageId);
	};

	const handleAddPage = (afterPageId?: string) => {
		const newPageId = `page-${Date.now()}`;
		const newPage = {
			id: newPageId,
			label: "Untitled",
			icon: <DocumentIcon />,
		};

		if (afterPageId) {
			setBasePages((prev) => {
				const index = prev.findIndex((page) => page.id === afterPageId);
				const newPages = [...prev];
				newPages.splice(index + 1, 0, newPage);
				return newPages;
			});
		} else {
			setBasePages((prev) => [...prev, newPage]);
		}

		setActivePageId(newPageId);
	};

	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				<PageNavigation
					pages={pages}
					onPageChange={handlePageChange}
					onAddPage={handleAddPage}
				/>
			</footer>
		</div>
	);
}
