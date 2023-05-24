import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {
	CancelTransaction,
	CreateCancelTransactionInput,
} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';
import {useAppDispatch} from '@/view/common/store/hooks';
import {onChangeSelectedTrxId} from '@/view/common/store/slices/transaction';
import {useCreateCancelTransactionViewModel} from '@/view/transaction/view-models/CreateCancelTransactionViewModel';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React from 'react';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type CancelTransactionModalProps = {
	close: () => void;
	isOpen: boolean;
	value: CreateCancelTransactionInput | undefined;
};

const CancelTransactionModal = ({
	isOpen,
	close,
	value,
}: CancelTransactionModalProps) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();

	const {createCancelTransaction, isLoading} =
		useCreateCancelTransactionViewModel({
			onSuccess: _data => {
				const data = _data as CancelTransaction;
				if (data) {
					queryClient.invalidateQueries([GetTransactionsQueryKey]);
					queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
					dispatch(onChangeSelectedTrxId({id: ''}));
					close();
				}
			},
		});

	const onCancelTransaction = () => {
		if (value) {
			createCancelTransaction({
				transaction_uuid: value.transaction_uuid,
				restaurant_outlet_uuid: value.restaurant_outlet_uuid,
			});
		}
	};

	return (
		<Modal open={isOpen} handleClose={close}>
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
						onClick={close}
						className="whitespace-nowrap"
					>
						No, Maybe Later
					</Button>
					<Button
						isLoading={isLoading}
						variant="primary"
						size="l"
						fullWidth
						onClick={onCancelTransaction}
					>
						Cancel
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default CancelTransactionModal;
