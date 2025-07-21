interface AddPageIconProps {
	width?: string | number;
	height?: string | number;
	className?: string;
}

export function AddPageIcon({ width = 16, height = 16, className }: AddPageIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 16 16"
			fill="none"
			className={className}
		>
			<g id="SVG">
				<path
					id="Vector"
					fillRule="evenodd"
					clipRule="evenodd"
					d="M8 2.4C8.21217 2.4 8.41566 2.48429 8.56569 2.63431C8.71571 2.78434 8.8 2.98783 8.8 3.2V7.2H12.8C13.0122 7.2 13.2157 7.28429 13.3657 7.43431C13.5157 7.58434 13.6 7.78783 13.6 8C13.6 8.21217 13.5157 8.41566 13.3657 8.56569C13.2157 8.71571 13.0122 8.8 12.8 8.8H8.8V12.8C8.8 13.0122 8.71571 13.2157 8.56569 13.3657C8.41566 13.5157 8.21217 13.6 8 13.6C7.78783 13.6 7.58434 13.5157 7.43431 13.3657C7.28429 13.2157 7.2 13.0122 7.2 12.8V8.8H3.2C2.98783 8.8 2.78434 8.71571 2.63431 8.56569C2.48429 8.41566 2.4 8.21217 2.4 8C2.4 7.78783 2.48429 7.58434 2.63431 7.43431C2.78434 7.28429 2.98783 7.2 3.2 7.2H7.2V3.2C7.2 2.98783 7.28429 2.78434 7.43431 2.63431C7.58434 2.48429 7.78783 2.4 8 2.4Z"
					fill="var(--fill-0, #1A1A1A)"
				/>
			</g>
		</svg>
	);
}
