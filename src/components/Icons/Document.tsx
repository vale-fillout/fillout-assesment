interface DocumentIconProps {
	width?: string | number;
	height?: string | number;
	className?: string;
}

export function DocumentIcon({ width = 20, height = 20, className }: DocumentIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 20 20"
			fill="none"
			className={className}
		>
			<g id="file-text, document">
				<path
					id="vector"
					d="M10.2798 2.29167H4.79167C4.33143 2.29167 3.95833 2.66476 3.95833 3.125V16.875C3.95833 17.3352 4.33143 17.7083 4.79167 17.7083H15.2083C15.6686 17.7083 16.0417 17.3352 16.0417 16.875V8.05351C16.0417 7.8325 15.9539 7.62054 15.7976 7.46426L10.8691 2.53574C10.7128 2.37946 10.5008 2.29167 10.2798 2.29167Z"
					stroke="var(--stroke-0, #8C93A1)"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<path
					id="vector_2"
					d="M7.29167 11.0417H10.2083M7.29167 14.375H12.7083"
					stroke="var(--stroke-0, #8C93A1)"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<path
					id="vector_3"
					d="M10.625 2.70833V6.875C10.625 7.33524 10.9981 7.70833 11.4583 7.70833H15.625"
					stroke="var(--stroke-0, #8C93A1)"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</g>
		</svg>
	);
}