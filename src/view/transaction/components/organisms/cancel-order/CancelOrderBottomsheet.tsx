import {mapToCreateCancelOrderPayload} from '@/data/order/mappers/OrderMapper';
import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {Orders} from '@/domain/order/model';
import {CancelOrder} from '@/domain/order/repositories/CreateCancelOrderRepository';
import {Transaction} from '@/domain/transaction/model';
import {useForm} from '@/view/common/hooks/useForm';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppSelector} from '@/view/common/store/hooks';
import {useCreateCancelOrderViewModel} from '@/view/order/view-models/CreateCancelOrderViewModel';
import {
	ValidationSchemaCancelOrderType,
	validationSchemaCancelOrder,
} from '@/view/transaction/schemas/cancel-order';
import {useQueryClient} from '@tanstack/react-query';
import {Checkbox, Select} from 'antd';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {Button, Textarea} from 'posy-fnb-core';
import React, {useState} from 'react';
import {Controller, FormProvider, useFieldArray} from 'react-hook-form';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {IoMdArrowBack} from 'react-icons/io';

import CancelDetailOrder from './CancelDetailOrder';

export const CancelOptions = [
	{
		label: 'Out of stock',
		value: 'OUT_OF_STOCK',
	},
	{
		label: 'Customer cancellation',
		value: 'CUSTOMER_CANCELLATION',
	},
	{
		label: 'Long waiting time',
		value: 'LONG_WAITING',
	},
	{
		label: 'Wrong order',
		value: 'WRONG_ORDER',
	},
	{
		label: 'Others',
		value: 'OTHERS',
	},
];

const BottomSheet = dynamic(
	() => import('posy-fnb-core').then(el => el.BottomSheet),
	{
		loading: () => <div />,
	},
);

type CancelOrderBottomsheetProps = {
	isOpenCancelOrder: boolean;
	closeCancelOrder: () => void;
	dataOrder: Orders | undefined;
	dataTransaction: Transaction | undefined;
};

const CancelOrderBottomsheet = ({
	closeCancelOrder,
	dataOrder,
	isOpenCancelOrder,
	dataTransaction,
}: CancelOrderBottomsheetProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const {width} = useViewportListener();
	const {outletId} = useAppSelector(state => state.auth);

	const [selectedOrder, setSelectedOrder] = useState('');

	const methods = useForm({
		schema: validationSchemaCancelOrder,
		defaultValues: {
			order: dataOrder?.map(() => ({
				uuid: '',
				cancel_reason_order: '',
			})),
		},
	});

	const {setValue, getValues, control, reset, watch, handleSubmit} = methods;

	const {update} = useFieldArray({
		control,
		name: 'order',
	});

	const handleCloseCancelOrder = async () => {
		closeCancelOrder();
		setSelectedOrder('');
		reset({});
		await router.push({
			pathname: '/transaction',
			hash: '',
		});
	};

	console.log(watch());

	const {createCancelOrder, isLoading} = useCreateCancelOrderViewModel({
		onSuccess: _data => {
			const data = _data as CancelOrder;
			if (data) {
				queryClient.invalidateQueries([GetOrdersQueryKey]);
				handleCloseCancelOrder();
			}
		},
	});

	const onSubmit = (form: ValidationSchemaCancelOrderType) => {
		console.log('ada');
		if (dataTransaction) {
			createCancelOrder(
				mapToCreateCancelOrderPayload(dataTransaction.uuid, outletId, form),
			);
		}
	};

	return (
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
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex h-full w-full gap-4"
				>
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
												<Controller
													control={control}
													name={`order.${idx}.uuid`}
													render={({field: {value}}) => (
														<Checkbox
															value={value}
															checked={
																getValues(`order.${idx}.order_detail`)?.length >
																	0 &&
																dataOrder[idx]?.order_detail?.every(
																	(element, index) =>
																		element.uuid ===
																		getValues(`order.${idx}.order_detail`)[
																			index
																		]?.uuid,
																)
															}
															onChange={() => {
																if (
																	getValues(`order.${idx}.uuid`) === order.uuid
																) {
																	setValue(`order.${idx}.uuid`, '');
																	setValue(
																		`order.${idx}.cancel_reason_order`,
																		'',
																	);
																	setValue(`order.${idx}.order_detail`, []);
																} else {
																	update(idx, {
																		uuid: order.uuid,
																		cancel_reason_order: CancelOptions[0].value,
																		order_detail: order.order_detail.map(
																			el => ({
																				uuid: el.uuid,
																				cancel_reason_status:
																					CancelOptions[0].value,
																				cancel_reason_other: '',
																			}),
																		),
																	});
																}
															}}
															className="w-full"
														>
															<p className="text-m-bold">Order {idx + 1} </p>
														</Checkbox>
													)}
												/>
											</div>
											<div className="w-60">
												<Select
													placeholder="Select reason"
													className="w-full"
													options={CancelOptions}
													onChange={e => {
														setValue(
															`order.${idx}`,
															{
																uuid: order.uuid,
																cancel_reason_order: e,
																order_detail: order.order_detail.map(el => ({
																	uuid: el.uuid,
																	cancel_reason_status: e,
																	cancel_reason_other: '',
																})),
															},
															{
																shouldValidate: true,
															},
														);
													}}
												/>
											</div>
										</div>
										{getValues(`order.${idx}.cancel_reason_order`) ===
											'OTHERS' && (
											<div className="px-4 pb-4 bg-neutral-20">
												<Textarea
													labelText="Reason"
													onChange={e => {
														getValues(`order.${idx}.order_detail`)?.map(
															(el, detailIdx) =>
																setValue(
																	`order.${idx}.order_detail.${detailIdx}.cancel_reason_other`,
																	e.target.value,
																	{
																		shouldValidate: true,
																	},
																),
														);
													}}
												/>
											</div>
										)}
										{order.order_detail.map((detail, detailIdx) => (
											<CancelDetailOrder
												key={detailIdx}
												detail={detail}
												detailIdx={detailIdx}
												idx={idx}
												dataLength={order.order_detail.length}
												order={order}
											/>
										))}
									</div>
								))}
						</aside>

						<aside className="absolute bottom-0 w-full flex gap-2 rounded-bl-2xl bg-neutral-10 p-4 shadow-basic">
							<Button
								variant="secondary"
								fullWidth
								size={width > 1024 ? 'l' : 'm'}
								onClick={handleCloseCancelOrder}
							>
								Back to transaction
							</Button>
							<Button
								variant="primary"
								fullWidth
								isLoading={isLoading}
								type="submit"
								size={width > 1024 ? 'l' : 'm'}
							>
								Confirm
							</Button>
						</aside>
					</div>
				</form>
			</FormProvider>
		</BottomSheet>
	);
};

export default CancelOrderBottomsheet;
