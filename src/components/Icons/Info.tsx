interface InfoIconProps {
	width?: string | number;
	height?: string | number;
	className?: string;
}

export function InfoIcon({ width = 20, height = 20, className }: InfoIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 20 20"
			fill="none"
			className={className}
		>
			<g id="circle-info, info circle, tooltip, information">
				<path
					id="vector"
					d="M8.95833 9.16667H9.99999L10 13.5417M17.7083 10C17.7083 14.2572 14.2572 17.7083 10 17.7083C5.74281 17.7083 2.29167 14.2572 2.29167 10C2.29167 5.74281 5.74281 2.29167 10 2.29167C14.2572 2.29167 17.7083 5.74281 17.7083 10Z"
					stroke="var(--stroke-0, #F59D0E)"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					id="vector_2"
					d="M10.0003 6.125C10.2993 6.12518 10.5413 6.36795 10.5413 6.66699C10.5412 6.96589 10.2992 7.20783 10.0003 7.20801C9.70128 7.20801 9.45851 6.966 9.45833 6.66699C9.45833 6.36784 9.70117 6.125 10.0003 6.125Z"
					fill="var(--fill-0, #F59D0E)"
					stroke="var(--stroke-0, #F59D0E)"
					strokeWidth="0.25"
				/>
			</g>
		</svg>
	);
}