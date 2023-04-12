import React from 'react';

type AtomsFilterChipProps = {
	label: string;
	onClick?: (e: any) => void;
	openSearch?: boolean;
	className?: string;
};

const AtomsFilterChip = ({
	label,
	onClick,
	openSearch,
	className,
}: AtomsFilterChipProps) => (
	<div
		tabIndex={0}
		role="button"
		onClick={onClick}
		onKeyDown={onClick}
		className={`${className} rounded-full border px-4 py-[6px] text-m-semibold bg-neutral-10 text-neutral-80 transition-all duration-100 ease-in-out ${
			openSearch ? '-ml-40 opacity-0 ' : 'w-fit'
		}`}
	>
		<p className="whitespace-nowrap">{label}</p>
	</div>
);

export default AtomsFilterChip;
