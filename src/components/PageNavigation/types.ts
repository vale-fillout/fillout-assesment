/** Page in navigation */
export interface Page {
	id: string;
	label: string;
	icon: React.ReactNode;
	status: "active" | "inactive";
}

export interface PageNavigationProps {
	/** List of pages to display in the navigation */
	pages: Page[];
	/** Callback when a page is selected */
	onPageChange: (pageId: string) => void;
	/** Callback to add a new page, optionally after a specific page */
	onAddPage: (afterPageId?: string) => void;
	/** Callback when pages are reordered */
	onPagesReorder?: (pages: Page[]) => void;
}
