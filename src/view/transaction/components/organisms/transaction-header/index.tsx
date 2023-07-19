import {TransactionStatus} from '@/domain/transaction/model';
import {Can} from '@/view/auth/components/organisms/rbac';
import FilterChip from '@/view/common/components/atoms/chips/filter-chip';
import InputSearch from '@/view/common/components/atoms/input/search';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {setOpenDrawer} from '@/view/common/store/slices/auth';
import {
	onChangeSearch,
	onClearSearch,
} from '@/view/common/store/slices/transaction';
import {requestFullScreen} from '@/view/common/utils/UtilsRequestFullScreen';
import {useGetNotificationCounterViewModel} from '@/view/notification/view-models/GetNotificationCounterViewModel';
import {useGetTransactionSummaryViewModel} from '@/view/transaction/view-models/GetTransactionSummaryViewModel';
import {Popover, Skeleton} from 'antd';
import {useRouter} from 'next/router';
import {Button} from 'posy-fnb-core';
import React from 'react';
import {AiOutlineFullscreen} from 'react-icons/ai';
import {BsList, BsThreeDotsVertical} from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io';

const Menu = (onChangeViewType: (val: string) => void) => {
	return (
		<div className="flex flex-col gap-4">
			<p
				onClick={() => onChangeViewType('table')}
				className="hover:text-primary-main cursor-pointer"
			>
				Table View
			</p>
			<p
				onClick={() => onChangeViewType('transaction')}
				className="hover:text-primary-main cursor-pointer"
			>
				Transaction View
			</p>
		</div>
	);
};

type TransactionHeaderProps = {
	status: string;
	onChangeStatus: (status: string) => void;
	openTableCapacity: () => void;
	openNotifBar: () => void;
	isOpenNotifBar: boolean;
	loadCreateTransaction: boolean;
	handleCreateTransaction: (outletId: string) => void;
	onChangeViewType: (viewType: string) => void;
	viewType: string;
};

const TransactionHeader = ({
	status,
	onChangeStatus,
	isOpenNotifBar,
	openNotifBar,
	openTableCapacity,
	loadCreateTransaction,
	handleCreateTransaction,
	onChangeViewType,
	viewType,
}: TransactionHeaderProps) => {
	const {
		auth: {outletId, isSubscription, isLoggedIn},
		transaction: {search},
	} = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const {width} = useViewportListener();
	const {query} = useRouter();

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
			onChangeStatus('');
		} else {
			onChangeStatus(statusParams);
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
				<div className="flex items-center gap-2">
					{width <= 1280 && (
						<BsList
							onClick={() => dispatch(setOpenDrawer(true))}
							size={24}
							className="cursor-pointer text-neutral-100 hover:opacity-70 duration-300 ease-in-out"
						/>
					)}
					<p className="text-xxl-semibold text-neutral-100">Transaction</p>
				</div>

				<div className="flex items-center gap-6">
					<div
						className={`${
							isOpenNotifBar ? 'bg-secondary-border ' : ''
						} relative hover:bg-secondary-border duration-300 ease-in-out cursor-pointer rounded-full p-1`}
					>
						<IoMdNotificationsOutline
							onClick={openNotifBar}
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

					<Popover content={() => Menu(onChangeViewType)} placement="bottom">
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
						{query.view_type === 'transaction' && (
							<FilterChip
								label={`Table Capacity: ${dataSummary.available_capacity}/${dataSummary.table_capacity}`}
								openSearch={openSearch}
								onClick={openTableCapacity}
							/>
						)}
						{query.view_type === 'transaction' && (
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

					{viewType === 'transaction' && (
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
