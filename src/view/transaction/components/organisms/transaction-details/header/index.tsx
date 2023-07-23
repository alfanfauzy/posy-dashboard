import {Orders} from '@/domain/order/model';
import {Transaction} from '@/domain/transaction/model';
import CountUpTimer from '@/view/common/components/atoms/countup';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeIsOpenCancelOrder} from '@/view/common/store/slices/order';
import {
	onChangeCancelTransaction,
	onChangeIsOpenCreateTransaction,
	onChangeIsOpenCreateTransactionFromTableView,
} from '@/view/common/store/slices/transaction';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {generateTransactionCode} from '@/view/common/utils/UtilsGenerateTransactionCode';
import dynamic from 'next/dynamic';
import React from 'react';
import {CgTrash} from 'react-icons/cg';
import {FiEdit} from 'react-icons/fi';
import {IoIosArrowUp} from 'react-icons/io';

const CreateTransactionModal = dynamic(
	() => import('../../modal/CreateTransactionModal'),
	{
		loading: () => <div />,
	},
);

const CancelTransactionModal = dynamic(
	() => import('../../modal/CancelTransactionModal'),
	{
		loading: () => <div />,
	},
);

const CancelOrderBottomsheet = dynamic(
	() => import('../../cancel-order/CancelOrderBottomsheet'),
	{
		loading: () => <div />,
	},
);

type TransactionDetailsHeaderProps = {
	dataTransaction: Transaction | undefined;
	dataOrder: Orders | undefined;
};

const TransactionDetailsHeader = ({
	dataTransaction,
	dataOrder,
}: TransactionDetailsHeaderProps) => {
	const dispatch = useAppDispatch();
	const {viewType, cancelTransaction} = useAppSelector(
		state => state.transaction,
	);

	const [isOpenTransactionDetail, {toggle: toggleTransactionDetail}] =
		useDisclosure({
			initialState: false,
		});

	const handleEditTransaction = () => {
		const isTableView = viewType === 'table';
		isTableView
			? dispatch(
					onChangeIsOpenCreateTransactionFromTableView({
						isOpen: true,
						isEdit: true,
						table_uuid: '',
					}),
			  )
			: dispatch(onChangeIsOpenCreateTransaction(true));
	};

	const handleCancelTransaction = (transaction: Transaction) => {
		transaction.total_order > 0
			? dispatch(onChangeIsOpenCancelOrder(true))
			: dispatch(
					onChangeCancelTransaction({
						isOpen: true,
						payload: {
							restaurant_outlet_uuid: transaction.restaurant_outlet_uuid,
							transaction_uuid: transaction.uuid,
						},
					}),
			  );
	};

	return (
		<section>
			<aside className="p-4 bg-gradient-to-r from-primary-main to-secondary-main rounded-l-lg">
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
								onClick={handleEditTransaction}
							/>
							<CgTrash
								className="cursor-pointer text-neutral-10"
								size={20}
								onClick={() => handleCancelTransaction(dataTransaction)}
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
								<IoIosArrowUp
									size={22}
									className={`cursor-pointer text-neutral-10 ${
										!isOpenTransactionDetail ? 'rotate-180' : ''
									}`}
									onClick={toggleTransactionDetail}
								/>
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

			<CancelTransactionModal {...cancelTransaction} />

			<CreateTransactionModal isEdit dataTransaction={dataTransaction} />

			<CancelOrderBottomsheet
				dataOrder={dataOrder}
				dataTransaction={dataTransaction}
			/>
		</section>
	);
};

export default TransactionDetailsHeader;
