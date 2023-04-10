import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {GetTransactionQueryKey} from '@/data/transaction/sources/GetTransactionQuery';
import {AddonVariant} from '@/domain/addon/model';
import {Product} from '@/domain/product/model';
import {Transaction} from '@/domain/transaction/model';
import {useGetCategoriesViewModel} from '@/view/category/view-models/GetCategoriesViewModel';
import NoOrderIcon from '@/view/common/assets/icons/noOrder';
import InputSearch from '@/view/common/components/atoms/input/search';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {closeModal, openModal} from '@/view/common/store/slices/modal';
import {
	onAddOrder,
	onChangeAddOn,
	onChangeNotes,
	onChangeProduct,
	onChangeQuantity,
	onClearOrder,
	onCloseOrderModal,
	onDropOrder,
} from '@/view/common/store/slices/order';
import {
	calculateOrder,
	calculateOrderBeforeDiscount,
	toRupiah,
} from '@/view/common/utils/common';
import {generateTransactionCode} from '@/view/common/utils/UtilsGenerateTransactionCode';
import {useCreateOrderManualViewModel} from '@/view/order/view-models/CreateOrderManualViewModel';
import {useGetMenuProductsViewModel} from '@/view/product/view-models/GetMenuProductsViewModel';
import {useGetMenuProductViewModel} from '@/view/product/view-models/GetMenuProductViewModel';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button, Loading, Modal, Tabs, Textarea} from 'posy-fnb-core';
import React, {useCallback, useMemo, useState} from 'react';
import {CgTrash} from 'react-icons/cg';
import {IoMdArrowBack} from 'react-icons/io';

const BottomSheet = dynamic(
	() => import('posy-fnb-core').then(el => el.BottomSheet),
	{
		loading: () => <div />,
	},
);

type ManualSubmitOrderProps = {
	isOpenCreateOrder: boolean;
	closeCreateOrder: () => void;
	dataTransaction: Transaction;
};

const ManualSubmitOrder = ({
	closeCreateOrder,
	isOpenCreateOrder,
	dataTransaction,
}: ManualSubmitOrderProps) => {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const [tabValueMenu, setTabValueMenu] = useState(0);

	const {quantity, product, notes, addOnVariant} = useAppSelector(
		state => state.order.orderForm,
	);
	const {outletId} = useAppSelector(state => state.auth);
	const {order, orderForm} = useAppSelector(state => state.order);

	const [
		isOpenAddVariantOrder,
		{open: openAddVariantOrder, close: closeAddVariantOrder},
	] = useDisclosure({initialState: false});

	const {data: dataProductDetail, isLoading: loadProductDetail} =
		useGetMenuProductViewModel(
			{
				product_uuid: product?.uuid || '',
				restaurant_outlet_uuid: outletId,
			},
			{enabled: !!(isOpenAddVariantOrder && product?.uuid)},
		);

	const {data: dataCategory} = useGetCategoriesViewModel(
		{
			limit: 100,
			page: 1,
			sort: {
				field: 'category_name',
				value: 'desc',
			},
			search: [],
		},
		{enabled: !!isOpenCreateOrder},
	);

	const onCloseAddManualOrder = () => {
		closeCreateOrder();
		dispatch(onClearOrder());
	};

	const {createOrderManual, isLoading: loadCreateOrderManual} =
		useCreateOrderManualViewModel({
			onSuccess: () => {
				onCloseAddManualOrder();
				queryClient.invalidateQueries([
					GetOrdersQueryKey,
					{transaction_uuid: dataTransaction?.uuid},
				]);
				queryClient.invalidateQueries(
					GetTransactionQueryKey({
						transaction_uuid: dataTransaction?.uuid || '',
					}),
				);
			},
		});

	const {data: dataProduct, isLoading: loadProduct} =
		useGetMenuProductsViewModel(
			{
				limit: 100,
				page: 1,
				sort: {
					field: 'created_at',
					value: 'desc',
				},
				search: [],
				restaurant_outlet_uuid: outletId,
			},
			{enabled: !!isOpenCreateOrder},
		);

	const handleIncreamentQuantity = useCallback(
		() => dispatch(onChangeQuantity({operator: 'plus', value: 1})),
		[dispatch],
	);

	const handleDecreamentQuantity = useCallback(
		() => dispatch(onChangeQuantity({operator: 'minus', value: 1})),
		[dispatch],
	);

	const handleChangeAddon = (
		type: 'radio' | 'checkbox',
		variant: AddonVariant,
		addOn: {addOnName: string; addOnUuid: string},
	) =>
		dispatch(
			onChangeAddOn({
				type,
				addOnVariant: {
					addOnName: addOn.addOnName,
					addOnUuid: addOn.addOnUuid,
					...variant,
				},
			}),
		);

	const generateBgColor = (variant_uuid: string) => {
		const selected = addOnVariant?.some(el => el.variant_uuid === variant_uuid);

		if (selected) return 'bg-[#F2F1F9] border-secondary-main';
		return 'bg-neutral-10 border-neutral-100';
	};

	const onCloseAddVariantOrder = () => {
		closeAddVariantOrder();
		dispatch(onCloseOrderModal());
	};

	const handleAddOrder = () => {
		if (product) {
			dispatch(
				onAddOrder({
					quantity,
					product,
					addOnVariant,
					notes,
					order_uuid: Math.floor(Math.random() * Date.now()),
				}),
			);
		}
		onCloseAddVariantOrder();
	};

	const onSubmitOrder = () => {
		const payload = order.map(el => {
			const tempAddOn: Array<any> = [];
			const addOn = el.addOnVariant;

			addOn.map(addon => {
				const filteredAddOn = tempAddOn.find(v => v.uuid === addon.addOnUuid);
				if (filteredAddOn) {
					return filteredAddOn.variant_uuids.push(addon.variant_uuid);
				}

				const obj: any = {
					uuid: addon.addOnUuid,
					variant_uuids: [],
				};
				obj.variant_uuids.push(addon.variant_uuid);
				return tempAddOn.push(obj);
			});

			return {
				product_uuid: el.product?.uuid,
				qty: el.quantity,
				order_note: el.notes,
				addon: tempAddOn,
			};
		});

		if (dataTransaction && payload) {
			createOrderManual({
				restaurant_outlet_uuid: outletId,
				transaction_uuid: dataTransaction?.uuid,
				order: payload,
			});
		}
	};

	const onClear = () => {
		// dispatch(onClearSearch())
		// setDataTransaction(data)
		// closeSearch()
	};

	const onOpenAddVariantOrder = (new_product: Product) => {
		openAddVariantOrder();
		dispatch(onChangeProduct({product: new_product}));
		dispatch(onChangeQuantity({operator: 'plus', value: 1}));
	};

	const openDeleteNewOrder = (order_uuid: number) => {
		dispatch(
			openModal({
				component: (
					<section className="flex w-[380px] flex-col items-center justify-center p-4">
						<div className="px-16">
							<p className="text-center text-l-semibold line-clamp-2">
								Are you sure you want to delete this order?
							</p>
						</div>
						<div className="mt-8 flex w-full gap-3">
							<Button
								variant="secondary"
								size="l"
								fullWidth
								onClick={() => dispatch(closeModal({}))}
								className="whitespace-nowrap"
							>
								Cancel
							</Button>
							<Button
								variant="primary"
								size="l"
								fullWidth
								onClick={async () => {
									dispatch(onDropOrder({order_uuid}));
									await dispatch(closeModal({}));
								}}
							>
								Yes, confirm
							</Button>
						</div>
					</section>
				),
			}),
		);
	};

	const AddonRequired = useMemo(
		() =>
			dataProductDetail?.addons?.flatMap(el =>
				el.is_optional
					? []
					: {
							addOnUuid: el.uuid,
							required: !el.is_optional,
					  },
			),
		[dataProductDetail?.addons],
	);

	const isValidAddon = useMemo(
		() =>
			AddonRequired?.map(el =>
				orderForm.addOnVariant.some(v => v.addOnUuid === el.addOnUuid),
			),
		[AddonRequired, orderForm.addOnVariant],
	);

	return (
		<BottomSheet
			open={isOpenCreateOrder}
			onClose={onCloseAddManualOrder}
			style={{
				background: '#F7F7F7',
				padding: '24px 0',
				height: '100%',
				borderRadius: 0,
				zIndex: 10,
			}}
		>
			<section className="flex h-full w-full gap-6">
				<div className="w-1/2 rounded-r-2xl bg-neutral-10 p-6 lg:w-3/5 xl:w-2/3">
					<section id="filter" className="flex items-center justify-between">
						<div className="flex items-center gap-[10px]">
							<IoMdArrowBack
								size={24}
								onClick={onCloseAddManualOrder}
								className="cursor-pointer hover:opacity-70"
							/>
							<p className="cursor-default text-xxl-bold">Choose Orders</p>
						</div>
						<div className="w-1/3">
							<InputSearch
								placeholder="Search product"
								isOpen
								// onSearch={onSearch}
								onClearSearch={onClear}
								search=""
							/>
						</div>
					</section>

					<section id="menus" className="mt-6 h-full w-full">
						{dataCategory && (
							<Tabs
								scrollable
								items={dataCategory?.map((el, idx) => ({
									label: el.category_name,
									value: idx,
								}))}
								value={tabValueMenu}
								onChange={e => setTabValueMenu(e)}
								fullWidth
							/>
						)}
						<article className="my-6 h-4/5 overflow-y-auto">
							{loadProduct && (
								<div className="flex h-full w-full items-center justify-center">
									<Loading size={75} />
								</div>
							)}
							{!loadProduct && dataProduct && (
								<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
									{dataProduct.flatMap(
										item =>
											item.is_available && (
												<div
													role="presentation"
													onClick={() => onOpenAddVariantOrder(item)}
													key={item.product_name}
													className="min-h-[116px] cursor-pointer rounded-2xl border border-neutral-90 p-4 duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-50 active:shadow-md"
												>
													<p className="min-h-[48px] text-center text-l-semibold text-neutral-70 line-clamp-2">
														{item.product_name}
													</p>
													<div className="my-2 border-b border-neutral-40" />
													<div className="flex flex-col items-center justify-center gap-1">
														<p className="text-m-regular text-neutral-90">
															{toRupiah(item.price_final)}
														</p>
														{item.price_discount > 0 && (
															<p className="text-xs line-through">
																{toRupiah(item.price)}
															</p>
														)}
													</div>
												</div>
											),
									)}
								</div>
							)}
						</article>
					</section>
				</div>

				<div className="relative flex w-[500px] flex-1 flex-col rounded-l-2xl bg-neutral-10">
					<div className="w-full px-6 pt-6">
						<p className="text-xxl-bold">Your Order</p>
						<p className="mt-1 text-l-semibold">
							ID: {generateTransactionCode(dataTransaction?.transaction_code)}
						</p>
						<div className="my-2 border-b border-neutral-30" />
					</div>

					<section className="h-4/5 overflow-y-auto pb-20">
						<aside className="px-6">
							<div className="grid grid-cols-5 gap-4">
								<div className="col-span-3">
									<div>
										<p className="text-s-regular">Customer name</p>
										<p className="text-l-semibold line-clamp-1">
											{dataTransaction?.customer_name || '-'}
										</p>
									</div>
									<div className="mt-4">
										<p className="text-s-regular">Type of transaction</p>
										<p className="text-l-semibold">
											{dataTransaction.transaction_category || '-'}
										</p>
									</div>
								</div>
								<div className="col-span-2">
									<div>
										<p className="text-s-regular">Total pax</p>
										<p className="text-l-semibold">
											{dataTransaction.total_pax || '-'}
										</p>
									</div>
									<div className="mt-4">
										<p className="text-s-regular">Table number</p>
										<p className="text-l-semibold">
											{dataTransaction.table_number || '-'}
										</p>
									</div>
								</div>
							</div>
							<div className="my-2 border-b border-neutral-30" />
						</aside>
						{order.length === 0 && (
							<div className="flex h-full w-full flex-col items-center justify-center gap-4">
								<div className="-mt-24">
									<NoOrderIcon />
									<p className="text-l-medium">There’s no order yet</p>
								</div>
							</div>
						)}

						{order.length > 0 && (
							<div className="px-6">
								{order.map(item => (
									<aside key={item.order_uuid} className="pb-4">
										<div id="product-info" className="grid grid-cols-10 gap-1">
											<div className="cols-span-2">
												<p className="text-l-medium">x{item.quantity}</p>
											</div>
											<div className="col-span-5 flex items-start">
												<div>
													<div className="line-clamp-1">
														<p className=" text-l-medium">
															{item.product.product_name}
														</p>
													</div>
													<p className="text-m-regular">
														{item.addOnVariant
															.map(variant => variant.variant_name)
															.join(', ')}
													</p>
												</div>
											</div>

											<div className="col-span-4 ml-2 flex flex-wrap items-start justify-between">
												<div className="flex flex-col items-center">
													<div>
														<p className="text-l-medium">
															{toRupiah(calculateOrder(item))}
														</p>
														{item.product.price_discount > 0 && (
															<p className="text-m-regular text-neutral-60 line-through">
																{toRupiah(calculateOrderBeforeDiscount(item))}
															</p>
														)}
													</div>
												</div>
												<div className="mt-0.5 flex justify-end">
													<CgTrash
														className="cursor-pointer text-neutral-70 hover:opacity-80"
														size={20}
														onClick={() => openDeleteNewOrder(item.order_uuid)}
													/>
												</div>
											</div>
										</div>

										<div id="notes" className="ml-10 mt-0.5">
											<p className="text-s-regular text-neutral-70">
												<span className="text-s-semibold">Notes:</span>{' '}
												{item.notes || '-'}
											</p>
										</div>

										<div className="mt-4 border-t border-neutral-30" />
									</aside>
								))}
							</div>
						)}
					</section>

					<section className="absolute bottom-0 w-full rounded-bl-2xl bg-neutral-10 p-6 shadow-basic">
						<Button
							variant="primary"
							isLoading={loadCreateOrderManual}
							disabled={order.length === 0}
							onClick={onSubmitOrder}
							fullWidth
						>
							Submit Order
						</Button>
					</section>
				</div>
			</section>

			{isOpenAddVariantOrder && (
				<Modal
					open={isOpenAddVariantOrder}
					handleClose={() => undefined}
					style={{
						maxWidth: '80%',
						width: '80%',
						padding: 0,
					}}
					confirmButton={
						<div className="flex w-full max-w-[80%] items-center justify-center gap-4">
							<Button
								variant="secondary"
								onClick={onCloseAddVariantOrder}
								fullWidth
							>
								Cancel
							</Button>
							<Button
								variant="primary"
								onClick={handleAddOrder}
								disabled={!isValidAddon?.every(item => item)}
								fullWidth
							>
								Add to Basket
							</Button>
						</div>
					}
				>
					<section className="px-12 pt-8 pb-32 md:px-20 lg:px-28">
						{loadProductDetail && (
							<div className="mt-48 flex w-full items-center justify-center">
								<Loading size={90} />
							</div>
						)}
						{product && dataProductDetail && (
							<div>
								<aside>
									<p className="text-heading-s-semibold">
										{product.product_name}
									</p>
									<div className="flex items-center gap-2">
										<p className="text-xxl-medium">
											{toRupiah(product.price_final)}
										</p>
										{product.price_discount > 0 && (
											<div>
												<p className="text-xxl-medium text-neutral-80 line-through">
													{toRupiah(product.price)}
												</p>
											</div>
										)}
									</div>
								</aside>

								<aside className="mt-4 flex items-center gap-10">
									<div className="flex-1 border-b border-neutral-40">
										<p className="text-xxl-semibold">Item Quantity</p>
									</div>
									<div className="flex items-center justify-center gap-6">
										<div
											role="presentation"
											onClick={
												quantity === 0
													? () => undefined
													: handleDecreamentQuantity
											}
											className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 px-9 text-heading-s-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80"
										>
											-
										</div>
										<div className="text-heading-s-semibold">{quantity}</div>
										<div
											role="presentation"
											onClick={handleIncreamentQuantity}
											className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 px-9 text-heading-s-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80"
										>
											+
										</div>
									</div>
								</aside>

								{dataProductDetail.addons &&
									dataProductDetail.addons.map(addon => (
										<aside key={addon.uuid} className="mt-6">
											<div className="flex items-center gap-4">
												<p className="text-xxl-semibold">{addon.addon_name}</p>
												<div className="text-m-regular">
													{`${
														addon.is_optional
															? 'Optional'
															: 'Required | select 1'
													}`}
												</div>
											</div>

											<div className="mt-4 flex items-center justify-start gap-6 overflow-x-auto whitespace-nowrap">
												{addon.variants.map(variant => (
													<div
														key={variant.variant_uuid}
														className="flex flex-col items-center"
													>
														<div
															role="presentation"
															onClick={() =>
																handleChangeAddon(
																	addon.can_choose_multiple
																		? 'checkbox'
																		: 'radio',
																	variant,
																	{
																		addOnName: addon.addon_name,
																		addOnUuid: addon.uuid,
																	},
																)
															}
															className={`flex cursor-pointer items-center justify-center rounded-3xl border  py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-[#F2F1F9] hover:bg-opacity-80 ${generateBgColor(
																variant.variant_uuid,
															)}`}
														>
															{variant.variant_name}
														</div>
														<div className="mt-1 text-m-regular">
															+ {toRupiah(variant.variant_price || 0)}
														</div>
													</div>
												))}
											</div>
										</aside>
									))}

								<aside className="mt-6">
									<p className="text-xxl-semibold">Notes</p>
									<Textarea
										className="mt-2 h-32"
										placeholder="Example: no onion, please"
										value={notes}
										onChange={e => dispatch(onChangeNotes(e.target.value))}
									/>
								</aside>
							</div>
						)}
					</section>
				</Modal>
			)}
		</BottomSheet>
	);
};

export default ManualSubmitOrder;
