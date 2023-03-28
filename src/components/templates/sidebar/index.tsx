/* eslint-disable react-hooks/exhaustive-deps */

import Logo from '@/atoms/logo';
import {PROTECT_ROUTES} from '@/config/link';
import {OutletSelection} from '@/domain/outlet/models';
import useViewportListener from '@/hooks/useViewportListener';
import PersonIcon from '@/icons/person';
import Menu from '@/molecules/menu';
import SubscriptionReminder from '@/molecules/subscription-reminder';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {
	onLogout,
	setRestaurantOutletId,
	setShowSidebar,
} from '@/store/slices/auth';
import {useGetSubscriptionReminderViewModel} from '@/view/subscription/view-models/GetSubscriptionReminderViewModel';
import {Select} from 'antd';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {BsList} from 'react-icons/bs';
import {FiLogOut} from 'react-icons/fi';
import {Sidebar, useProSidebar} from 'react-pro-sidebar';

type TemplatesSidebarProps = {
	dataOutletSelection: OutletSelection | undefined;
};

const TemplatesSidebar = ({dataOutletSelection}: TemplatesSidebarProps) => {
	const router = useRouter();
	const {width} = useViewportListener();
	const {collapseSidebar, collapsed} = useProSidebar();
	const dispatch = useAppDispatch();
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);

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
			if (outletId.length === 0) {
				dispatch(setRestaurantOutletId(dataOutletSelection[0].uuid));
			}
		}
	}, [dataOutletSelection, outletId.length]);

	const onCollapse = () => {
		dispatch(setShowSidebar(collapsed));
		collapseSidebar();
	};

	const onChangeOutlet = (e: string) => {
		dispatch(setRestaurantOutletId(e));
	};

	const handleLogout = () => {
		router.push('auth/login');
		dispatch(onLogout());
	};

	return (
		<Sidebar
			defaultCollapsed={width < 1200}
			className="relative z-0 h-full overflow-hidden rounded-r-2xl bg-neutral-10"
			width="250px"
		>
			<aside
				className={`flex h-[12%] w-full items-center transition-all duration-300 ease-in-out sm:justify-start ${
					collapsed ? 'px-6' : 'pl-12 pt-2'
				}`}
			>
				{!collapsed ? (
					<Logo onClick={onCollapse} titleProps="text-xl" />
				) : (
					<BsList
						size={28}
						onClick={onCollapse}
						className="fill-primary cursor-pointer"
					/>
				)}
			</aside>

			<aside
				className={`${
					dataSubscriptionReminder?.is_show ? 'h-[60%]' : 'h-[70%]'
				} overflow-y-auto pb-6`}
			>
				{PROTECT_ROUTES.map(route => (
					<Menu key={route.title} item={route} collapse={collapsed} />
				))}
			</aside>

			<aside className="absolute bottom-0 w-full items-center">
				{dataSubscriptionReminder?.is_show && (
					<SubscriptionReminder end_date={dataSubscriptionReminder?.end_date} />
				)}
				<aside
					className={`w-full ${
						collapsed ? 'items-center' : 'items-start'
					} flex h-[140px] flex-col justify-start rounded-t-2xl bg-[#F2F1F9] p-6`}
				>
					<div
						className={`flex items-center gap-2 ${
							collapsed ? '-ml-1.5 justify-center' : 'justify-start'
						}`}
					>
						<div>
							<PersonIcon height={24} width={24} />
						</div>
						{!collapsed && (
							<div className="text-m-semibold line-clamp-1">Cyntia Simmons</div>
						)}
					</div>
					{dataOutletSelection && (
						<Select
							className={`mt-2.5 ${collapsed ? 'w-16' : '!w-[164px]'}`}
							options={outletOpt}
							value={outletId}
							onChange={onChangeOutlet}
							disabled={!isSubscription}
						/>
					)}
					<div
						role="button"
						onClick={handleLogout}
						onKeyDown={handleLogout}
						tabIndex={0}
						className="mt-2.5 flex cursor-pointer gap-4 hover:opacity-70"
					>
						<FiLogOut className="text-neutral-90" size={20} />
						{!collapsed && <p className="text-m-regular">Logout</p>}
					</div>
				</aside>
			</aside>
		</Sidebar>
	);
};

export default TemplatesSidebar;
