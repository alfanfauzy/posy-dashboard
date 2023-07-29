import {GetNotificationCounterQueryKey} from '@/data/notification/sources/GetNotificationCounterQuery';
import {GetNotificationsQueryKey} from '@/data/notification/sources/GetNotificationsQuery';
import PersonIcon from '@/view/common/assets/icons/person';
import Logo from '@/view/common/components/atoms/logo';
import Menu from '@/view/common/components/molecules/menu';
import SubscriptionReminder from '@/view/common/components/molecules/subscription-reminder';
import {PROTECT_ROUTES} from '@/view/common/config/link';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onResetArea} from '@/view/common/store/slices/area';
import {
	setOpenDrawer,
	setRestaurantOutletId,
} from '@/view/common/store/slices/auth';
import {onChangeSelectedTable} from '@/view/common/store/slices/table';
import {
	onChangeSelectedArea,
	onChangeSelectedTrxId,
} from '@/view/common/store/slices/transaction';
import {CheckPermission} from '@/view/common/utils/UtilsCheckPermission';
import {useGetSubscriptionReminderViewModel} from '@/view/subscription/view-models/GetSubscriptionReminderViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Select} from 'antd';
import dynamic from 'next/dynamic';
import React, {useEffect} from 'react';
import {BsList} from 'react-icons/bs';
import {FiLogOut} from 'react-icons/fi';
import {Sidebar, useProSidebar} from 'react-pro-sidebar';

const LogoutModal = dynamic(() => import('../../organisms/modal/LogoutModal'));

export type OutletOptionsType = Array<{label: string; value: string}>;

type TemplatesSidebarProps = {
	outletOptions: OutletOptionsType;
	isDrawer?: boolean;
};

const TemplatesSidebar = ({outletOptions, isDrawer}: TemplatesSidebarProps) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const {width} = useViewportListener();
	const {collapseSidebar, collapsed} = useProSidebar();
	const [isOpenLogout, {open: openLogout, close: closeLogout}] = useDisclosure({
		initialState: false,
	});

	const {
		outletId,
		isSubscription,
		isLoggedIn,
		authData: {
			user_info: {full_name},
		},
	} = useAppSelector(state => state.auth);

	const {data: dataSubscriptionReminder} = useGetSubscriptionReminderViewModel({
		enabled: isLoggedIn,
	});

	useEffect(() => {
		if (isDrawer) collapseSidebar(false);
	}, [collapseSidebar, isDrawer]);

	const onChangeOutlet = (e: string) => {
		dispatch(setRestaurantOutletId(e));
		dispatch(onChangeSelectedTrxId({id: ''}));
		dispatch(onResetArea());
		dispatch(onChangeSelectedTable(null));
		dispatch(onChangeSelectedArea(null));
		dispatch(setOpenDrawer(false));
		queryClient.invalidateQueries([GetNotificationCounterQueryKey]);
		queryClient.invalidateQueries([GetNotificationsQueryKey]);
	};

	const onCollapseSidebar = () => {
		collapseSidebar();
		dispatch(onChangeSelectedTrxId({id: ''}));
	};

	const onOpenLogout = () => {
		dispatch(setOpenDrawer(false));
		openLogout();
	};

	return (
		<>
			<LogoutModal closeLogout={closeLogout} isOpen={isOpenLogout} />
			<Sidebar
				defaultCollapsed={width <= 1280}
				className="relative z-0 h-full overflow-hidden rounded-r-lg bg-neutral-10"
				width="200px"
			>
				<aside
					className={`flex h-[10%] w-full items-center transition-all duration-300 ease-in-out sm:justify-start ${
						collapsed ? 'pl-3.5' : 'pl-4'
					}`}
				>
					{!collapsed ? (
						<Logo
							onClick={isDrawer ? () => undefined : onCollapseSidebar}
							titleProps="text-xl"
						/>
					) : (
						<BsList
							size={24}
							onClick={() => onCollapseSidebar()}
							className="fill-primary cursor-pointer"
						/>
					)}
				</aside>

				<aside
					className={`${
						dataSubscriptionReminder?.is_show ? 'h-[60%]' : 'h-[70%]'
					} overflow-y-auto pb-4`}
				>
					{PROTECT_ROUTES.map(
						route =>
							CheckPermission(route.permission) && (
								<Menu key={route.title} item={route} collapse={collapsed} />
							),
					)}
				</aside>

				<aside className="absolute bottom-0 w-full items-center">
					{dataSubscriptionReminder?.is_show && (
						<SubscriptionReminder
							end_date={dataSubscriptionReminder?.end_date}
						/>
					)}
					<aside
						className={`w-full ${
							collapsed ? 'items-center' : 'items-start'
						} flex h-[130px] flex-col justify-start rounded-t-md rounded-b-none bg-[#F2F1F9] p-4`}
					>
						<div
							className={`flex items-center gap-2 ${
								collapsed ? '-ml-1.5 justify-center' : 'justify-start'
							}`}
						>
							<div>
								<PersonIcon height={20} width={20} />
							</div>
							{!collapsed && (
								<div className="text-m-semibold line-clamp-1">{full_name}</div>
							)}
						</div>

						<Select
							className={`mt-2.5 ${collapsed ? 'w-10' : '!w-[164px]'}`}
							options={outletOptions}
							value={outletId}
							onChange={onChangeOutlet}
							disabled={!isSubscription}
						/>

						<div
							role="button"
							onClick={onOpenLogout}
							className="mt-2.5 flex cursor-pointer gap-4 hover:opacity-70"
						>
							<FiLogOut className="text-neutral-90" size={18} />
							{!collapsed && <p className="text-m-regular">Logout</p>}
						</div>
					</aside>
				</aside>
			</Sidebar>
		</>
	);
};

export default TemplatesSidebar;
