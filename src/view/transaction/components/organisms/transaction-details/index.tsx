import {Orders} from '@/domain/order/model';
import {Transaction} from '@/domain/transaction/model';
import {CreateCancelTransactionInput} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';
import CountUpTimer from '@/view/common/components/atoms/countup';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {generateStatusOrderDetail} from '@/view/common/utils/UtilsGenerateOrderStatus';
import {generateTransactionCode} from '@/view/common/utils/UtilsGenerateTransactionCode';
import {Checkbox, Divider, Select} from 'antd';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {Button} from 'posy-fnb-core';
import React, {useState} from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {CgTrash} from 'react-icons/cg';
import {FiEdit} from 'react-icons/fi';
import {IoIosArrowDown, IoIosArrowUp, IoMdArrowBack} from 'react-icons/io';

import CancelTransactionModal from '../modal/CancelTransactionModal';
import CreateTransactionModal from '../modal/CreateTransactionModal';

const BottomSheet = dynamic(
	() => import('posy-fnb-core').then(el => el.BottomSheet),
	{
		loading: () => <div />,
	},
);

type TransactionDetailsProps = {
	dataTransaction: Transaction | undefined;
	dataOrder: Orders | undefined;
};

const TransactionDetails = ({
	dataTransaction,
	dataOrder,
}: TransactionDetailsProps) => {
	const router = useRouter();
	const [openModalTransaction, setOpenModalTransaction] = useState(false);
	const {outletId} = useAppSelector(state => state.auth);
	const [
		isOpenCancelTransaction,
		{open: openCancelTransaction, close: closeCancelTransaction},
		{valueState, setValueState},
	] = useDisclosure<CreateCancelTransactionInput>({initialState: false});

	const [isOpenCancelOrder, {open: openCancelOrder, close: closeCancelOrder}] =
		useDisclosure({initialState: false});

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

	const [selectedOrder, setSelectedOrder] = useState('');

	const handleCloseCancelOrder = async () => {
		closeCancelOrder();
		setSelectedOrder('');
		await router.push({
			pathname: '/transaction',
			hash: '',
		});
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
								onClick={
									dataTransaction.total_order > 0
										? () => openCancelOrder()
										: () =>
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

			<BottomSheet
				style={{
					background: '#F7F7F7',
					padding: '24px 0',
					height: '100%',
					borderRadius: 0,
					zIndex: 10,
				}}
				open={isOpenCancelOrder}
				onClose={handleCloseCancelOrder}
			>
				<section className="flex h-full w-full gap-4">
					<div className="relative w-1/3 rounded-r-2xl bg-neutral-10 p-5 shadow">
						<section id="filter" className="flex items-center justify-between">
							<div
								className="flex items-center gap-[10px]"
								onClick={handleCloseCancelOrder}
							>
								<IoMdArrowBack
									size={22}
									className="cursor-pointer hover:opacity-70"
								/>
								<p className="cursor-default text-l-bold">Cancel Transaction</p>
							</div>
						</section>

						<section className="mt-4 h-2/3 xl:h-4/5 pb-10 overflow-y-auto w-full">
							<div className="text-m-regular">Choose group order</div>
							{dataOrder && (
								<aside className="mt-4 flex flex-col gap-3">
									{dataOrder.map((order, idx) => (
										<div
											key={order.uuid}
											className={`h-14 w-full cursor-pointer rounded-2xl p-4 shadow-sm duration-300 ease-in-out hover:border-secondary-hover hover:border active:shadow-md flex items-center justify-center justify-self-center bg-white  ${
												selectedOrder === order.uuid
													? `border-secondary-hover border !bg-secondary-border`
													: `border-neutral-30 border`
											}
									`}
											onClick={() => {
												router.push({
													hash: order.uuid,
												});
												setSelectedOrder(order.uuid);
											}}
										>
											<div className="flex items-center justify-center">
												<p>Order {idx + 1}</p>
											</div>
										</div>
									))}
								</aside>
							)}
						</section>
						<aside className="absolute bottom-0 pr-5 pt-5 mb-5">
							<div
								className={`h-14 w-full cursor-pointer rounded-2xl p-4 shadow-sm duration-300 ease-in-out hover:border-secondary-hover hover:border active:shadow-md flex items-center justify-center justify-self-center bg-white border-neutral-30 border`}
							>
								<div className="flex items-center justify-center">
									<p>Cancel Table</p>
								</div>
							</div>
							<div className="mt-2 flex gap-1">
								<AiOutlineInfoCircle
									className="text-error rotate-180"
									size={18}
								/>
								<p className="text-error text-s-regular">
									Cancel transaction means all order at this table will be
									deleted permanently.
								</p>
							</div>
						</aside>
					</div>

					<div className="relative flex flex-1 flex-col rounded-l-2xl bg-neutral-10 shadow">
						<aside className="w-full px-5 pt-5">
							<p className="text-l-bold">Choose order below</p>
						</aside>

						<aside className="h-4/5 overflow-y-auto mt-4 pb-10 px-5 flex flex-col gap-4">
							{dataOrder &&
								dataOrder.map((order, idx) => (
									<div
										id={order.uuid}
										key={order.uuid}
										className="border border-neutral-30 rounded-md shadow-sm"
									>
										<div className="flex justify-between items-center bg-neutral-20 px-4 py-3 rounded-t-md">
											<div className="flex-1">
												<Checkbox onChange={() => undefined} className="w-full">
													<p className="text-m-bold">Order {idx + 1} </p>
												</Checkbox>
											</div>
											<div className="w-60">
												<Select
													className="w-full"
													options={[{label: 'Cancel', value: 'cancel'}]}
												/>
											</div>
										</div>
										{order.order_detail.map((detail, detailIdx) => (
											<div key={detail.uuid}>
												<div className="flex justify-between items-center bg-neutral-10 px-4 py-4 rounded-b-md">
													<div className="flex-1">
														<Checkbox
															onChange={() => undefined}
															className="w-full"
														>
															<p className="text-m-regular">
																{detail.product_name} x{detail.qty}
															</p>
															<div className="mt-1 text-m-medium flex gap-2">
																Current status
																{generateStatusOrderDetail(detail.status)}
															</div>
														</Checkbox>
													</div>
													<div className="w-60">
														<Select
															className="w-full"
															options={[{label: 'Cancel', value: 'cancel'}]}
														/>
													</div>
												</div>
												{detailIdx !== order.order_detail.length - 1 && (
													<div className="px-4">
														<Divider className="my-0" />
													</div>
												)}
											</div>
										))}
									</div>
								))}
						</aside>

						<aside className="absolute bottom-0 w-full flex gap-2 rounded-bl-2xl bg-neutral-10 p-4 shadow-basic">
							<Button
								variant="secondary"
								fullWidth
								size="m"
								onClick={handleCloseCancelOrder}
							>
								Back to transaction
							</Button>
							<Button variant="primary" fullWidth size="m">
								Confirm
							</Button>
						</aside>
					</div>
				</section>
			</BottomSheet>
		</section>
	);
};

export default TransactionDetails;
