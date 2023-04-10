import {Transaction} from '@/domain/transaction/model';
import {CreateCancelTransactionInput} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {generateTransactionCode} from '@/view/common/utils/UtilsGenerateTransactionCode';
import React from 'react';
import {CgTrash} from 'react-icons/cg';

import CancelTransactionModal from '../modal/CancelTransactionModal';

type TransactionDetailsProps = {
	dataTransaction: Transaction | undefined;
};

const TransactionDetails = ({dataTransaction}: TransactionDetailsProps) => {
	const {outletId} = useAppSelector(state => state.auth);
	const [
		isOpenCancelTransaction,
		{open: openCancelTransaction, close: closeCancelTransaction},
		{valueState, setValueState},
	] = useDisclosure<CreateCancelTransactionInput>({initialState: false});

	const onOpenCancelTransaction = (payload: CreateCancelTransactionInput) => {
		setValueState({
			transaction_uuid: payload.transaction_uuid,
			restaurant_outlet_uuid: payload.restaurant_outlet_uuid,
		});
		openCancelTransaction();
	};

	return (
		<section>
			<aside>
				<div className="flex items-center justify-between">
					<p className="text-xxl-bold">Transaction details</p>
					{dataTransaction && (
						<CgTrash
							className="cursor-pointer text-neutral-70"
							size={20}
							onClick={() =>
								onOpenCancelTransaction({
									restaurant_outlet_uuid: outletId,
									transaction_uuid: dataTransaction.uuid,
								})
							}
						/>
					)}
				</div>

				{dataTransaction && (
					<div className="mt-2 flex items-center justify-between">
						<p className="text-l-semibold">
							ID:{' '}
							{`${generateTransactionCode(dataTransaction?.transaction_code)}`}
						</p>
						<p className="text-l-semibold">
							Time:
							{dateFormatter(dataTransaction?.created_at, 'HH:mm')}
						</p>
					</div>
				)}
				<div className="my-2 border-b border-neutral-30" />
			</aside>

			{isOpenCancelTransaction && (
				<CancelTransactionModal
					isOpen={isOpenCancelTransaction}
					close={closeCancelTransaction}
					value={valueState}
				/>
			)}
		</section>
	);
};

export default TransactionDetails;
