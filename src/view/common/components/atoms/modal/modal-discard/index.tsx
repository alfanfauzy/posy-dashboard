import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React from 'react';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type AtomModalDiscardProps = {
	open: boolean;
	handleActionOk: () => void;
	handleActionClose: () => void;
};

const AtomModalDiscard = ({
	open,
	handleActionOk,
	handleActionClose,
}: AtomModalDiscardProps) => {
	return (
		<Modal
			overflow={false}
			closeOverlay
			open={open}
			handleClose={handleActionClose}
		>
			<section className="flex w-[380px] flex-col items-center justify-center">
				<div className="px-16 flex flex-col items-center">
					<p className="mt-2 text-center text-l-semibold line-clamp-2">
						Discard any change?
					</p>
				</div>

				<div className="mt-8 flex w-full gap-3">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						onClick={handleActionClose}
						className="whitespace-nowrap"
					>
						No
					</Button>
					<Button variant="primary" size="l" fullWidth onClick={handleActionOk}>
						Yes
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default AtomModalDiscard;
