import {GetAreasQueryKey} from '@/data/area/sources/GetAreasQuery';
import {GetNotificationCounterQueryKey} from '@/data/notification/sources/GetNotificationCounterQuery';
import {GetNotificationsQueryKey} from '@/data/notification/sources/GetNotificationsQuery';
import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {GetTableLayoutByFloorQueryKey} from '@/data/table/sources/GetTableLayoutByFloorQuery';
import {GetTransactionQueryKey} from '@/data/transaction/sources/GetTransactionQuery';
import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import CancelIcon from '@/view/common/assets/icons/cancel';
import firebaseApp from '@/view/common/config/firebase';
import {useAppDispatch} from '@/view/common/store/hooks';
import {onChangeSelectedTrxId} from '@/view/common/store/slices/transaction';
import {playAudio} from '@/view/common/utils/UtilsPlayAudio';
import {useQueryClient} from '@tanstack/react-query';
import {getMessaging, onMessage} from 'firebase/messaging';
import {closeSnackbar, useSnackbar} from 'notistack';
import React, {ReactNode, useCallback, useEffect, useRef} from 'react';

type NotificationProviderProps = {
	children: ReactNode;
};

const NotificationProvider = ({children}: NotificationProviderProps) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();

	const audioRef =
		useRef<HTMLAudioElement>() as React.MutableRefObject<HTMLAudioElement>;

	const play = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	}, [audioRef]);

	useEffect(() => {
		const messaging = getMessaging(firebaseApp);

		onMessage(messaging, message => {
			if (message.data) {
				playAudio(play);

				queryClient.invalidateQueries([GetTransactionsQueryKey]);
				queryClient.invalidateQueries([GetTransactionQueryKey]);
				queryClient.invalidateQueries([
					GetOrdersQueryKey,
					{transaction_uuid: message?.data.transaction_uuid},
				]);
				queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
				queryClient.invalidateQueries([GetNotificationCounterQueryKey]);
				queryClient.invalidateQueries([GetNotificationsQueryKey]);
				queryClient.invalidateQueries([GetAreasQueryKey]);
				queryClient.invalidateQueries([GetTableLayoutByFloorQueryKey]);

				if (message.data?.category === 'PAYMENT') {
					dispatch(
						onChangeSelectedTrxId({
							id: '',
						}),
					);
				}

				enqueueSnackbar({
					className: 'border-t-8 border-blue-success',
					style: {
						borderRadius: '8px',
						background: '#ffffff',
						color: '#0A0A0A',
					},
					action: snackbarId => (
						<div className="mr-2">
							<CancelIcon
								onClick={() => {
									closeSnackbar(snackbarId);
								}}
							/>
						</div>
					),
					autoHideDuration: 1000 * 10,
					message: message.data.content as string,
					variant: 'info',
					anchorOrigin: {
						horizontal: 'right',
						vertical: 'top',
					},
				});
			}
		});
	}, [dispatch, enqueueSnackbar, play, queryClient]);

	return (
		<main>
			{children}
			<audio ref={audioRef} src="/sounds/notif.mp3" />
		</main>
	);
};

export default NotificationProvider;
