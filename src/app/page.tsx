"use client";

import { PageNavigation } from "@/components/PageNavigation";
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
	const [activePageId, setActivePageId] = useState("info");
	const [basePages, setBasePages] = useState([
		{ id: "info", label: "Info", icon: icons.info },
		{ id: "details", label: "Details", icon: icons.document },
		{ id: "other", label: "Other", icon: icons.document },
		{ id: "ending", label: "Ending", icon: icons.check },
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
			icon: icons.document,
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
