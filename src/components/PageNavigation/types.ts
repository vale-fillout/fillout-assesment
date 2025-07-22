export interface Page {
	id: string;
	label: string;
	icon: string;
	status: "active" | "inactive";
}

export interface PageNavigationProps {
	pages: Page[];
	onPageChange: (pageId: string) => void;
	onAddPage: (afterPageId?: string) => void;
	onPagesReorder?: (pages: Page[]) => void;
}
