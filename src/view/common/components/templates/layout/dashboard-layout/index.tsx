import Transition from '@/view/common/components/atoms/animations/transition';
import Sidebar from '@/view/common/components/templates/sidebar';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {setOpenDrawer} from '@/view/common/store/slices/auth';
import {useGetOutletSelectionViewModel} from '@/view/outlet/view-models/GetOutletSelectionViewModel';
import {Drawer} from 'antd';
import {useRouter} from 'next/router';
import React, {ReactNode, useMemo} from 'react';
import {ProSidebarProvider} from 'react-pro-sidebar';

import GuardProvider from './GuardProvider';
import NotificationProvider from './NotificationProvider';

type DashboardLayoutProps = {
	children: ReactNode;
};

const DashboardLayout = ({children}: DashboardLayoutProps) => {
	const dispatch = useAppDispatch();
	const {width} = useViewportListener();
	const {pathname} = useRouter();
	const {isLoggedIn, isSubscription, openDrawer} = useAppSelector(
		state => state.auth,
	);

	const {data: dataOutletSelection} = useGetOutletSelectionViewModel({
		enabled: isLoggedIn && isSubscription,
	});

	const outletOptions = useMemo(
		() =>
			dataOutletSelection?.map(entry => ({
				label: entry.outlet_name,
				value: entry.uuid,
			})) ?? [],
		[dataOutletSelection],
	);

	return (
		<ProSidebarProvider>
			<GuardProvider outletOptions={outletOptions}>
				<NotificationProvider>
					<main className="h-screen max-h-screen overflow-x-auto overflow-y-hidden bg-neutral-30">
						<section className="flex h-full w-full gap-2">
							{width > 1280 ? (
								<Sidebar outletOptions={outletOptions} />
							) : (
								<Drawer
									placement="left"
									width={200}
									onClose={() => dispatch(setOpenDrawer(false))}
									open={openDrawer}
									closeIcon={null}
									headerStyle={{display: 'none'}}
								>
									<Sidebar isDrawer outletOptions={outletOptions} />
								</Drawer>
							)}

							<div className="h-full flex-1 overflow-y-scroll">
								<Transition asPath={pathname}>{children}</Transition>
							</div>
						</section>
					</main>
				</NotificationProvider>
			</GuardProvider>
		</ProSidebarProvider>
	);
};

export default DashboardLayout;
