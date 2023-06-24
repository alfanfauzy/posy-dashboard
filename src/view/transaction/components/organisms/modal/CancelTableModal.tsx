import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {CancelTransaction} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeSelectedTrxId} from '@/view/common/store/slices/transaction';
import {useCreateCancelTransactionViewModel} from '@/view/transaction/view-models/CreateCancelTransactionViewModel';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button, Select, Textarea} from 'posy-fnb-core';
import React, {useState} from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai';

import {CancelOptions} from '../cancel-order/CancelOrderBottomsheet';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type CancelTableModalProps = {
	close: () => void;
	isOpen: boolean;
	value: {transaction_uuid: string};
};

const CancelTableModal = ({isOpen, close, value}: CancelTableModalProps) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);

	const [reason, setReason] = useState({label: '', value: ''});
	const [reasonOther, setReasonOther] = useState('');

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
				restaurant_outlet_uuid: outletId,
				cancel_reason: reason.value,
				cancel_reason_other: reasonOther,
			});
		}
	};

	return (
		<Modal overflow={false} closeOverlay open={isOpen} handleClose={close}>
			<section className="flex w-[380px] flex-col items-center justify-center">
				<div className="px-16 flex flex-col items-center">
					<AiOutlineInfoCircle
						size={65}
						className="rotate-180 text-red-accent"
					/>
					<p className="mt-2 text-center text-l-semibold line-clamp-2">
						Are you sure you want to cancel this table?
					</p>
				</div>
				<div className="mt-3 w-full">
					<Select
						className="w-full"
						size="l"
						options={CancelOptions}
						onChange={setReason}
						placeholder="Select the reason"
					/>
				</div>
				{reason.value === 'OTHERS' && (
					<div className="mt-4 w-full">
						<label>Other Reason: </label>
						<Textarea
							className="w-full"
							placeholder="Input other reason"
							onChange={e => setReasonOther(e.target.value)}
						/>
					</div>
				)}
				<div className="mt-8 flex w-full gap-3">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						onClick={close}
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

export default CancelTableModal;
