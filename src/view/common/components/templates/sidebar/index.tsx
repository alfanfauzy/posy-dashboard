/* eslint-disable react-hooks/exhaustive-deps */
import {OutletSelection} from '@/domain/outlet/models';
import {useLogoutViewModel} from '@/view/auth/view-models/LogoutViewModel';
import PersonIcon from '@/view/common/assets/icons/person';
import Logo from '@/view/common/components/atoms/logo';
import Menu from '@/view/common/components/molecules/menu';
import SubscriptionReminder from '@/view/common/components/molecules/subscription-reminder';
import {PROTECT_ROUTES} from '@/view/common/config/link';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onLogout, setRestaurantOutletId} from '@/view/common/store/slices/auth';
import {onChangeSelectedTrxId} from '@/view/common/store/slices/transaction';
import {CheckPermission} from '@/view/common/utils/UtilsCheckPermission';
import {useGetSubscriptionReminderViewModel} from '@/view/subscription/view-models/GetSubscriptionReminderViewModel';
import {Select} from 'antd';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {Button} from 'posy-fnb-core';
import React, {useEffect, useState} from 'react';
import {BsList} from 'react-icons/bs';
import {FiLogOut} from 'react-icons/fi';
import {Sidebar, useProSidebar} from 'react-pro-sidebar';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type TemplatesSidebarProps = {
	dataOutletSelection: OutletSelection | undefined;
};

const TemplatesSidebar = ({dataOutletSelection}: TemplatesSidebarProps) => {
	const router = useRouter();
	const {width} = useViewportListener();
	const {collapseSidebar, collapsed} = useProSidebar();
	const [isOpenLogout, {open: openLogout, close: closeLogout}] = useDisclosure({
		initialState: false,
	});

	const dispatch = useAppDispatch();
	const {
		outletId,
		isSubscription,
		isLoggedIn,
		authData: {
			user_info: {full_name, uuid},
			token,
		},
	} = useAppSelector(state => state.auth);

	const [outletOpt, setOutletOpt] = useState<
		Array<{label: string; value: string}>
	>([]);

	const {data: dataSubscriptionReminder} = useGetSubscriptionReminderViewModel({
		enabled: isLoggedIn,
	});

	useEffect(() => {
		if (dataOutletSelection) {
			const opts = dataOutletSelection.map(item => ({
				value: item.uuid,
				label: item.outlet_name,
			}));
			setOutletOpt(opts);
			if (outletId?.length === 0) {
				dispatch(setRestaurantOutletId(dataOutletSelection[0].uuid));
			}
		}
	}, [dataOutletSelection, outletId?.length]);

	const onChangeOutlet = (e: string) => {
		dispatch(setRestaurantOutletId(e));
		dispatch(onChangeSelectedTrxId({id: ''}));
	};

	const {logout, isLoading: loadLogout} = useLogoutViewModel({
		onSuccess: () => {
			closeLogout();
			router.push('auth/login');
			setTimeout(() => {
				dispatch(onLogout());
			}, 500);
		},
	});

	const handleLogout = () => {
		logout({
			token,
			user_uuid: uuid,
		});
	};

	const onCollapseSidebar = () => {
		collapseSidebar();
		dispatch(onChangeSelectedTrxId({id: ''}));
	};

	return (
		<>
			<Sidebar
				defaultCollapsed={width <= 1280}
				className="relative z-0 h-full overflow-hidden rounded-r-2xl bg-neutral-10"
				width="200px"
			>
				<aside
					className={`flex h-[12%] w-full items-center transition-all duration-300 ease-in-out sm:justify-start ${
						collapsed ? 'pl-3.5 pt-2' : 'pl-5 pt-2'
					}`}
				>
					{!collapsed ? (
						<Logo onClick={onCollapseSidebar} titleProps="text-xl" />
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
					} overflow-y-auto pb-24`}
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
						} flex h-[140px] flex-col justify-start rounded-t-md rounded-b-none bg-[#F2F1F9] p-6`}
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
							options={outletOpt}
							value={outletId}
							onChange={onChangeOutlet}
							disabled={!isSubscription}
						/>

						<div
							role="button"
							onClick={openLogout}
							onKeyDown={openLogout}
							className="mt-2.5 flex cursor-pointer gap-4 hover:opacity-70"
						>
							<FiLogOut className="text-neutral-90" size={18} />
							{!collapsed && <p className="text-m-regular">Logout</p>}
						</div>
					</aside>
				</aside>
			</Sidebar>
			<Modal open={isOpenLogout} closeOverlay handleClose={closeLogout}>
				<section className="flex w-[380px] flex-col items-center justify-center p-4">
					<div className="px-16">
						<p className="text-center text-l-semibold line-clamp-2">
							Are you sure you want to logout?
						</p>
					</div>
					<div className="mt-8 flex w-full gap-3">
						<Button
							variant="secondary"
							size="l"
							fullWidth
							onClick={closeLogout}
							className="whitespace-nowrap"
						>
							Cancel
						</Button>
						<Button
							isLoading={loadLogout}
							variant="primary"
							size="l"
							fullWidth
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
				</section>
			</Modal>
		</>
	);
};

export default TemplatesSidebar;
