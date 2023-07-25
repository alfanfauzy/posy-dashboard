import {TransactionStatus} from '@/domain/transaction/model';
import {Can} from '@/view/auth/components/organisms/rbac';
import FilterChip from '@/view/common/components/atoms/chips/filter-chip';
import InputSearch from '@/view/common/components/atoms/input/search';
import NavDrawer from '@/view/common/components/molecules/nav-drawer';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeSearch,
	onChangeStatus,
	onChangeToggleNotifBar,
	onClearSearch,
} from '@/view/common/store/slices/transaction';
import {requestFullScreen} from '@/view/common/utils/UtilsRequestFullScreen';
import {useGetNotificationCounterViewModel} from '@/view/notification/view-models/GetNotificationCounterViewModel';
import {useGetTransactionSummaryViewModel} from '@/view/transaction/view-models/GetTransactionSummaryViewModel';
import {Popover, Skeleton} from 'antd';
import {Button} from 'posy-fnb-core';
import React from 'react';
import {AiOutlineFullscreen} from 'react-icons/ai';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io';

import ViewTypeMenu from '../../molecules/view-type-menu';

type TransactionHeaderProps = {
	loadCreateTransaction: boolean;
	handleCreateTransaction: (outletId: string) => void;
};

const TransactionHeader = ({
	loadCreateTransaction,
	handleCreateTransaction,
}: TransactionHeaderProps) => {
	const {
		auth: {outletId, isSubscription, isLoggedIn},
		transaction: {search, viewType, isOpenNotifBar, status, selectedArea},
	} = useAppSelector(state => state);
	const dispatch = useAppDispatch();

	const [openSearch, {open, close}] = useDisclosure({initialState: false});

	const {data: dataSummary, isLoading: loadSummary} =
		useGetTransactionSummaryViewModel(
			{
				restaurant_outlet_uuid: outletId,
			},
			{
				enabled: outletId?.length > 0 && isSubscription && isLoggedIn,
			},
		);

	const {data: dataCounter} = useGetNotificationCounterViewModel({
		parent_type: 'restaurant_outlet_uuid',
		parent_uuid: outletId,
	});

	const handleSetStatus = (
		e: React.MouseEvent<HTMLElement>,
		statusParams: string,
	) => {
		if (status === statusParams) {
			dispatch(onChangeStatus(''));
		} else {
			dispatch(onChangeStatus(statusParams));
		}
	};

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(onChangeSearch({search: e.target.value}));
	};

	const onClear = () => {
		dispatch(onClearSearch());
		close();
	};

	return (
		<article className="h-fit">
			<aside className="flex items-start justify-between">
				<NavDrawer title="Transaction" />

				<div className="flex items-center gap-6">
					<div
						className={`${
							isOpenNotifBar ? 'bg-secondary-border ' : ''
						} relative hover:bg-secondary-border duration-300 ease-in-out cursor-pointer rounded-full p-1`}
					>
						<IoMdNotificationsOutline
							onClick={() => dispatch(onChangeToggleNotifBar(true))}
							className="cursor-pointer hover:opacity-70"
							size={28}
						/>
						{dataCounter && dataCounter?.transaction > 0 && (
							<div className="absolute shadow-md top-2.5 right-1 px-[3.5px] py-[1px] rounded-full w-fit bg-secondary-main text-[7px] font-bold text-white">
								{dataCounter?.total}
							</div>
						)}
					</div>

					<AiOutlineFullscreen
						onClick={requestFullScreen}
						className="cursor-pointer hover:opacity-70"
						size={24}
					/>

					<Popover content={ViewTypeMenu} placement="bottom">
						<BsThreeDotsVertical
							size={20}
							className="cursor-pointer hover:opacity-70"
						/>
					</Popover>
				</div>
			</aside>

			{loadSummary && (
				<div className="mt-2">
					<Skeleton paragraph={{rows: 1, width: '100%'}} title={false} />
				</div>
			)}
			{dataSummary && (
				<aside className="mt-2 flex gap-2 w-full justify-between">
					<div className="flex gap-2 xl:mb-0 mb-2.5 overflow-auto w-full">
						<FilterChip
							label={`Waiting Food: ${dataSummary?.waiting_food}`}
							openSearch={openSearch}
							onClick={e => handleSetStatus(e, TransactionStatus.WAITING_FOOD)}
							color="bg-blue-success"
							className={`${
								status === TransactionStatus.WAITING_FOOD
									? 'border-2 border-blue-success'
									: 'border-neutral-50 '
							}`}
						/>
						<FilterChip
							color="bg-green-success"
							label={`Waiting Payment: ${dataSummary?.waiting_payment}`}
							openSearch={openSearch}
							onClick={e =>
								handleSetStatus(e, TransactionStatus.WAITING_PAYMENT)
							}
							className={`${
								status === TransactionStatus.WAITING_PAYMENT
									? 'border-2 border-green-success'
									: 'border-neutral-50 '
							}`}
						/>
						{/* {viewType === 'transaction' && (
							<FilterChip
								label={`Table Capacity: ${dataSummary.available_capacity}/${dataSummary.table_capacity}`}
								openSearch={openSearch}
								onClick={() => dispatch(onChangeToggleTableCapacity(true))}
							/>
						)} */}
						{viewType === 'transaction' && selectedArea && (
							<InputSearch
								isTransaction
								isOpen={openSearch}
								open={open}
								onSearch={onSearch}
								onClearSearch={onClear}
								search={search}
							/>
						)}
					</div>

					{viewType === 'transaction' && selectedArea && (
						<div className="w-36">
							<Can I="create" an="transaction">
								<Button
									onClick={() => handleCreateTransaction(outletId)}
									size="m"
									fullWidth
									variant="primary"
									isLoading={loadCreateTransaction}
									className="!px-0"
								>
									<p className="whitespace-nowrap text-s-semibold">
										+ New transaction
									</p>
								</Button>
							</Can>
						</div>
					)}
				</aside>
			)}
		</article>
	);
};

export default TransactionHeader;
