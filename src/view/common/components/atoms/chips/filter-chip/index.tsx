import React from 'react';

type AtomsFilterChipProps = {
	label: string;
	color?: string;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	openSearch?: boolean;
	className?: string;
};

const AtomsFilterChip = ({
	label,
	onClick,
	openSearch,
	className,
	color,
}: AtomsFilterChipProps) => (
	<div
		tabIndex={0}
		role="button"
		onClick={onClick}
		className={`${className} flex items-center gap-2 rounded-full border px-2 py text-s-semibold bg-neutral-10 text-neutral-80 transition-all duration-100 ease-in-out ${
			openSearch ? '-ml-40 opacity-0 ' : 'w-fit'
		}`}
	>
		{color && <div className={`w-2 h-2 rounded-full ${color}`} />}
		<p className="whitespace-nowrap">{label}</p>
	</div>
);

export default AtomsFilterChip;
