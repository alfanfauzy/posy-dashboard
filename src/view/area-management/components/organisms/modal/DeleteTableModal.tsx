import {Button, Modal} from 'posy-fnb-core';
import React from 'react';

type DeleteAreaModalProps = {
	isOpen: boolean;
	close: () => void;
	onDelete: () => void;
};

const DeleteTableModal = ({close, isOpen, onDelete}: DeleteAreaModalProps) => {
	return (
		<Modal open={isOpen} closeOverlay handleClose={close}>
			<section className="flex w-[380px] flex-col items-center justify-center p-4">
				<div className="px-16">
					<p className="text-center text-l-semibold line-clamp-2">
						Are you sure you want to delete this table?
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
					<Button variant="primary" size="l" fullWidth onClick={onDelete}>
						Delete
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default DeleteTableModal;
