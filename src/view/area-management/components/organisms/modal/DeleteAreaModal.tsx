import {Button, Modal} from 'posy-fnb-core';
import React from 'react';

type DeleteAreaModalProps = {
	isOpen: boolean;
	close: () => void;
};

const DeleteAreaModal = ({close, isOpen}: DeleteAreaModalProps) => {
	return (
		<Modal open={isOpen} closeOverlay handleClose={close}>
			<section className="flex w-[380px] flex-col items-center justify-center p-4">
				<div className="px-16">
					<p className="text-center text-l-semibold line-clamp-2">
						Are you sure you want to delete this area?
					</p>
				</div>
				<div className="mt-8 flex w-full gap-3">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						onClick={close}
						className="whitespace-nowrap"
					>
						Cancel
					</Button>
					<Button
						// isLoading={loadLogout}
						variant="primary"
						size="l"
						fullWidth
						// onClick={handleLogout}
					>
						Delete
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default DeleteAreaModal;
