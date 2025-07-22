interface CheckIconProps {
	width?: string | number;
	height?: string | number;
	className?: string;
}

export function CheckIcon({ width = 20, height = 20, className }: CheckIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 20 20"
			fill="none"
			className={className}
		>
			<g id="circle-check, check radio, circle, checkbox, check, checkmark, confirm">
				<path
					id="vector"
					d="M12.5 7.91667L8.75 12.5L7.08333 10.8333M17.7083 10C17.7083 14.2572 14.2572 17.7083 10 17.7083C5.74281 17.7083 2.29167 14.2572 2.29167 10C2.29167 5.74281 5.74281 2.29167 10 2.29167C14.2572 2.29167 17.7083 5.74281 17.7083 10Z"
					stroke="var(--stroke-0, #8C93A1)"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
		</svg>
	);
}