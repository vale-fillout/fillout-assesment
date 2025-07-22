interface PlusIconProps {
	width?: string | number;
	height?: string | number;
	className?: string;
}

export function PlusIcon({ width = 8, height = 8, className }: PlusIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 8 8"
			fill="none"
			className={className}
		>
			<g id="plus-large, add large" clipPath="url(#clip0_5004_9)">
				<path
					id="vector"
					d="M4 1.16667V4M4 4V6.83333M4 4H1.16667M4 4H6.83333"
					stroke="var(--stroke-0, black)"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_5004_9">
					<rect width="8" height="8" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
}