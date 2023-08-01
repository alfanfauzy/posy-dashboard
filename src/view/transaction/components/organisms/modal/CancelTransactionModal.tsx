import {GetTableLayoutByFloorQueryKey} from '@/data/table/sources/GetTableLayoutByFloorQuery';
import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {
	CancelTransaction,
	CreateCancelTransactionInput,
} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';
import {useAppDispatch} from '@/view/common/store/hooks';
import {onChangeIsOpenCancelOrder} from '@/view/common/store/slices/order';
import {
	onChangeCancelTransaction,
	onChangeSelectedTrxId,
} from '@/view/common/store/slices/transaction';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import {useCreateCancelTransactionViewModel} from '@/view/transaction/view-models/CreateCancelTransactionViewModel';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React from 'react';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type CancelTransactionModalProps = {
	isOpen: boolean;
	payload: CreateCancelTransactionInput | null;
};

const CancelTransactionModal = ({
	isOpen,
	payload,
}: CancelTransactionModalProps) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();

	const handleClose = () => {
		dispatch(onChangeIsOpenCancelOrder(false));
		dispatch(
			onChangeCancelTransaction({
				isOpen: false,
				payload: null,
			}),
		);
	};

	const {createCancelTransaction, isLoading} =
		useCreateCancelTransactionViewModel({
			onSuccess: _data => {
				const data = _data as CancelTransaction;
				if (data) {
					queryClient.invalidateQueries([GetTransactionsQueryKey]);
					queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
					queryClient.invalidateQueries([GetTableLayoutByFloorQueryKey]);
					dispatch(onChangeSelectedTrxId({id: ''}));
					handleClose();
				}
			},
		});

	const onCancelTransaction = () => {
		if (payload) {
			createCancelTransaction(payload);
			logEvent({
				category: 'cancel_transaction',
				action: 'canceltransaction_yescanceltransaction_click',
			});
		}
	};

	return (
		<Modal open={isOpen} handleClose={handleClose}>
			<section className="flex w-[380px] flex-col items-center justify-center p-4">
				<div className="px-16">
					<p className="text-center text-l-semibold line-clamp-2">
						Are you sure you want to cancel this transaction?
					</p>
				</div>
				<div className="mt-8 flex w-full gap-3">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						onClick={handleClose}
						className="whitespace-nowrap"
					>
						No
					</Button>
					<Button
						isLoading={isLoading}
						variant="primary"
						size="l"
						fullWidth
						onClick={onCancelTransaction}
					>
						Yes
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default CancelTransactionModal;
