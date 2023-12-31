import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {closeModal} from '@/view/common/store/slices/modal';
import dynamic from 'next/dynamic';
import React from 'react';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

const ModalWrapper = () => {
	const dispatch = useAppDispatch();
	const {
		isModalOpen,
		className,
		onClosed,
		component,
		style,
		confirmBtn,
		overflow,
		showCloseButton,
		closeOverlay,
	} = useAppSelector(state => state.modal);

	if (component && isModalOpen) {
		return (
			<Modal
				closeOverlay={closeOverlay}
				className={className}
				style={style}
				overflow={overflow}
				confirmButton={confirmBtn}
				showCloseButton={showCloseButton}
				open={isModalOpen}
				handleClose={async () => {
					await onClosed?.();
					await dispatch(closeModal({})).unwrap();
				}}
			>
				{component}
			</Modal>
		);
	}

	return null;
};

export default ModalWrapper;
