import {Transaction} from '@/domain/transaction/model';
import {CreateCancelTransactionInput} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';
import CountUpTimer from '@/view/common/components/atoms/countup';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {generateTransactionCode} from '@/view/common/utils/UtilsGenerateTransactionCode';
import React, {useState} from 'react';
import {CgTrash} from 'react-icons/cg';
import {FiEdit} from 'react-icons/fi';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';

import CancelTransactionModal from '../modal/CancelTransactionModal';
import CreateTransactionModal from '../modal/CreateTransactionModal';

type TransactionDetailsProps = {
	dataTransaction: Transaction | undefined;
};

const TransactionDetails = ({dataTransaction}: TransactionDetailsProps) => {
	const [openModalTransaction, setOpenModalTransaction] = useState(false);
	const {outletId} = useAppSelector(state => state.auth);
	const [
		isOpenCancelTransaction,
		{open: openCancelTransaction, close: closeCancelTransaction},
		{valueState, setValueState},
	] = useDisclosure<CreateCancelTransactionInput>({initialState: false});

	const [isOpenTransactionDetail, {toggle: toggleTransactionDetail}] =
		useDisclosure({
			initialState: false,
		});

	const onOpenCancelTransaction = (payload: CreateCancelTransactionInput) => {
		setValueState({
			transaction_uuid: payload.transaction_uuid,
			restaurant_outlet_uuid: payload.restaurant_outlet_uuid,
		});
		openCancelTransaction();
	};

	const handleCloseModalCreateTransaction = (value: boolean) => {
		setOpenModalTransaction(value);
	};

	return (
		<section>
			<aside className="p-4 bg-gradient-to-r from-primary-main to-secondary-main rounded-b-2xl">
				<div className="flex items-center justify-between">
					<p className="text-l-bold text-neutral-10">
						Table {dataTransaction?.table_number}
						{dataTransaction?.session_suffix}
					</p>
					{dataTransaction && (
						<div className="flex gap-6">
							<FiEdit
								size={20}
								className="cursor-pointer text-neutral-10"
								onClick={() => setOpenModalTransaction(true)}
							/>
							<CgTrash
								className="cursor-pointer text-neutral-10"
								size={20}
								onClick={() =>
									onOpenCancelTransaction({
										restaurant_outlet_uuid: outletId,
										transaction_uuid: dataTransaction.uuid,
									})
								}
							/>
						</div>
					)}
				</div>
				<div className="my-4 border-b border-secondary-main" />

				{dataTransaction && (
					<div>
						<div className="mt-2 flex gap-4 items-center justify-between">
							<div className="w-[45%]">
								<p className="text-m-semibold text-neutral-10">
									ID:{' '}
									{`${generateTransactionCode(
										dataTransaction?.transaction_code,
									)}`}
								</p>
							</div>

							<div className="flex justify-between w-1/2 border-l pl-3">
								<p className="text-m-semibold text-neutral-10">
									{dataTransaction && dataTransaction?.first_order_at > 0 ? (
										<CountUpTimer startTime={dataTransaction?.first_order_at} />
									) : (
										<div className="mx-0.5">-</div>
									)}
								</p>
								{isOpenTransactionDetail ? (
									<IoIosArrowUp
										size={22}
										className="cursor-pointer text-neutral-10"
										onClick={toggleTransactionDetail}
									/>
								) : (
									<IoIosArrowDown
										size={22}
										className="cursor-pointer text-neutral-10"
										onClick={toggleTransactionDetail}
									/>
								)}
							</div>
						</div>
						{isOpenTransactionDetail && (
							<div className="mt-3 flex gap-4 items-center justify-between">
								<div className="w-1/2">
									<p className="text-s-regular line-clamp-1 text-neutral-10">
										Name: {dataTransaction.customer_name || '-'}
									</p>
									<p className="mt-1 text-s-regular line-clamp-1 lowercase text-neutral-10">
										Type:{' '}
										{dataTransaction.transaction_category
											.split('_')
											.join(' ') || '-'}
									</p>
								</div>
								<div className="w-1/2 pl-1">
									<p className="text-s-regular line-clamp-1 text-neutral-10">
										Pax: {dataTransaction.total_pax || '-'}
									</p>
									<p className="mt-1 text-s-regular line-clamp-1 text-neutral-10">
										Time Order:{' '}
										{dateFormatter(dataTransaction?.created_at, 'HH:mm')}
									</p>
								</div>
							</div>
						)}
					</div>
				)}
			</aside>

			{isOpenCancelTransaction && (
				<CancelTransactionModal
					isOpen={isOpenCancelTransaction}
					close={closeCancelTransaction}
					value={valueState}
				/>
			)}

			{openModalTransaction && (
				<CreateTransactionModal
					open={openModalTransaction}
					handleClose={handleCloseModalCreateTransaction}
					isEdit
					dataTransaction={dataTransaction}
				/>
			)}
		</section>
	);
};

export default TransactionDetails;
