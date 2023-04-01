import {Transaction} from '@/domain/transaction/model';
import useDisclosure from '@/hooks/useDisclosure';
import moment from 'moment';
import React from 'react';
import {CgTrash} from 'react-icons/cg';

import CancelTransactionModal from '../modal/CancelTransactionModal';

const generateTransactionCode = (code: string) => {
	const codeArr = code.slice(code.length - 12);
	return codeArr;
};

type TransactionDetailsProps = {
	dataTransaction: Transaction;
};

const TransactionDetails = ({dataTransaction}: TransactionDetailsProps) => {
	const [
		isOpenCancelTransaction,
		{open: openCancelTransaction, close: closeCancelTransaction},
	] = useDisclosure({initialState: false});

	return (
		<section>
			<aside>
				<div className="flex items-center justify-between">
					<p className="text-xxl-bold">Transaction details</p>
					<CgTrash
						className="cursor-pointer text-neutral-70"
						size={20}
						onClick={openCancelTransaction}
					/>
				</div>

				<div className="mt-2 flex items-center justify-between">
					<p className="text-l-semibold">
						ID:{' '}
						{`${generateTransactionCode(dataTransaction?.transaction_code)}`}
					</p>
					<p className="text-l-semibold">
						Time:
						{dataTransaction &&
							moment.unix(dataTransaction?.created_at).format('HH:mm')}
					</p>
				</div>
				<div className="my-2 border-b border-neutral-30" />
			</aside>

			{isOpenCancelTransaction && (
				<CancelTransactionModal
					isOpen={isOpenCancelTransaction}
					close={closeCancelTransaction}
				/>
			)}
		</section>
	);
};

export default TransactionDetails;
