import {TransactionStatus, Transactions} from '@/domain/transaction/model';
import CancelIcon from '@/view/common/assets/icons/cancel';
import {playAudio} from '@/view/common/utils/UtilsPlayAudio';
import {closeSnackbar, useSnackbar} from 'notistack';
import React, {useCallback, useEffect} from 'react';

type UseTransactionSectionNotificationProps = {
	data: Transactions | undefined;
	audioRef: React.MutableRefObject<HTMLAudioElement>;
};

const useTransactionSectionNotification = ({
	data,
	audioRef,
}: UseTransactionSectionNotificationProps) => {
	const {enqueueSnackbar} = useSnackbar();

	const play = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	}, [audioRef]);

	useEffect(() => {
		const interval = setInterval(() => {
			data?.map(trx => {
				const now = Date.now();
				const diffTime = Math.abs(now - trx.first_order_at * 1000);
				const diffMinutes = Math.floor(diffTime / 60000);
				const checktime = diffMinutes > 0 && diffMinutes % 2 === 0;
				if (trx.status === TransactionStatus.WAITING_FOOD && checktime) {
					playAudio(play);

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
						message: `Need: print to kitchen on table ${trx.table_number}`,
						variant: 'info',
						anchorOrigin: {
							horizontal: 'right',
							vertical: 'top',
						},
					});
					return trx;
				}
			});
		}, 1000 * 60);

		return () => clearInterval(interval);
	}, [data, enqueueSnackbar, play]);

	useEffect(() => {
		const interval = setInterval(() => {
			data?.map(el => {
				const now = Date.now();
				const diffTime = Math.abs(now - el.first_order_at * 1000);
				const diffMinutes = Math.floor(diffTime / 60000);
				const checktime = diffMinutes === 1;

				if (el.status === TransactionStatus.WAITING_FOOD && checktime) {
					playAudio(play);
					enqueueSnackbar({
						className: 'border-t-8 border-error',
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
						message: `Please check order time on table ${el.table_number}`,
						variant: 'info',
						anchorOrigin: {
							horizontal: 'right',
							vertical: 'top',
						},
					});
					return el;
				}
			});
		}, 1000 * 60);

		return () => clearInterval(interval);
	}, [data, enqueueSnackbar, play]);

	return;
};

export default useTransactionSectionNotification;
