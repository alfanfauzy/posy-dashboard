import {useLogoutViewModel} from '@/view/auth/view-models/LogoutViewModel';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onLogout} from '@/view/common/store/slices/auth';
import {useRouter} from 'next/router';
import {Button, Modal} from 'posy-fnb-core';
import React from 'react';

type LogoutModalProps = {
	isOpen: boolean;
	close: () => void;
};

const LogoutModal = ({close, isOpen}: LogoutModalProps) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const {
		authData: {
			token,
			user_info: {uuid},
		},
	} = useAppSelector(state => state.auth);

	const {logout, isLoading: loadLogout} = useLogoutViewModel({
		onSuccess: () => {
			dispatch(onLogout());
			close();
			router.push('/auth/login');
		},
	});

	const handleLogout = () => {
		logout({
			token,
			user_uuid: uuid,
		});
	};

	return (
		<Modal open={isOpen} closeOverlay handleClose={close}>
			<section className="flex w-[380px] flex-col items-center justify-center p-4">
				<div className="px-16">
					<p className="text-center text-l-semibold line-clamp-2">
						Are you sure you want to logout?
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
						isLoading={loadLogout}
						variant="primary"
						size="l"
						fullWidth
						onClick={handleLogout}
					>
						Logout
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default LogoutModal;
