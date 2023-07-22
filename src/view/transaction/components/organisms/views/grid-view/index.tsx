import {TransactionStatus, Transactions} from '@/domain/transaction/model';
import PlusCircleIcon from '@/view/common/assets/icons/plusCircle';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangePayment,
	onChangeSelectedTrxId,
	onChangeToggleNotifBar,
} from '@/view/common/store/slices/transaction';
import {generateBorderColor} from '@/view/transaction/utils/common';
import {Loading} from 'posy-fnb-core';
import React from 'react';

import EmptyArea from '../../../molecules/empty-state/empty-area';

type GridViewProps = {
	data: Transactions | undefined;
	isLoading: boolean;
	loadCreateTransaction: boolean;
	handleCreateTransaction: (outletId: string) => void;
};

const GridView = ({
	data,
	isLoading,
	handleCreateTransaction,
	loadCreateTransaction,
}: GridViewProps) => {
	const dispatch = useAppDispatch();
	const {
		transaction: {selectedTrxId, status, selectedArea},
		auth: {outletId},
	} = useAppSelector(state => state);

	const handleSelectTrx = (trxId: string) => {
		dispatch(onChangeSelectedTrxId({id: trxId}));
		dispatch(
			onChangePayment({
				payment: {
					discount_percentage: 0,
					subtotal: 0,
					total: 0,
				},
			}),
		);
		dispatch(onChangeToggleNotifBar(false));
	};

	if (!selectedArea) {
		return <EmptyArea redirect />;
	}

	return (
		<article className="h-[80%] w-full overflow-y-auto mb-8">
			{isLoading && (
				<article className="flex h-full items-center justify-center">
					<Loading size={90} />
				</article>
			)}

			{!selectedArea && <EmptyArea redirect />}

			{data && data.length === 0 && (
				<article className="flex h-full items-center justify-center rounded-md bg-neutral-20">
					<div
						onClick={
							!loadCreateTransaction
								? () => handleCreateTransaction(outletId)
								: () => undefined
						}
						className="flex flex-col items-center gap-3"
					>
						<PlusCircleIcon className="cursor-pointer transition-all duration-300 ease-in-out hover:opacity-60" />
						<p className="cursor-pointer text-l-medium text-neutral-60 transition-all duration-300 ease-in-out hover:opacity-60">
							Create new transaction
						</p>
					</div>
				</article>
			)}

			{data && (
				<article
					className={`${
						data.length === 0
							? 'flex items-center justify-center bg-neutral-20'
							: `grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`
					}`}
				>
					{data.length > 0 &&
						data.map(el => (
							<aside key={el.uuid} className="relative">
								{el.total_order > 0 && el.need_print_to_kitchen && (
									<div className="w-4 h-4 absolute right-0 top-0 rounded-full bg-error" />
								)}
								<div
									onClick={() => handleSelectTrx(el.uuid)}
									role="presentation"
									className={`h-[124px] cursor-pointer rounded-2xl border p-4 shadow-sm duration-300 ease-in-out hover:border-primary-main active:shadow-md ${generateBorderColor(
										status,
										el.uuid,
										selectedTrxId,
										el.first_order_at,
										el.status === TransactionStatus.WAITING_FOOD,
									)}`}
								>
									<div className="flex justify-center border-b pb-2">
										<p className="text-4xl font-normal text-neutral-70">
											{`${el.table_number}${el.session_suffix}` || '-'}
										</p>
									</div>
									<div className="mt-2">
										<p className="text-s-semibold text-neutral-90">Name</p>
										<p className="text-m-regular text-neutral-90 line-clamp-1">
											{el.customer_name || '-'}
										</p>
									</div>
								</div>
							</aside>
						))}
				</article>
			)}
		</article>
	);
};

export default GridView;
