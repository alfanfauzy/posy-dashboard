import Logo from '@/view/common/assets/icons/logo';
import React from 'react';

type AtomsLogoProps = {
	onClick?: () => void;
	titleProps?: string;
};

const AtomsLogo = ({onClick, titleProps}: AtomsLogoProps) => (
	<div
		role="presentation"
		onClick={onClick}
		className="flex cursor-default items-center justify-center gap-[10px]"
	>
		<Logo />
		<p
			className={`${titleProps} whitespace-nowrap text-xl font-bold text-primary-main`}
		>
			Posy Resto
		</p>
	</div>
);

export default AtomsLogo;
