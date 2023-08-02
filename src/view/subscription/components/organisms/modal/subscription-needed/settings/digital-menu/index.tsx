import {GeneralSettings} from '@/domain/outlet/models/GeneralSettings';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeShowDigitalMenu} from '@/view/common/store/slices/general-settings';
import {useUpdateGeneralSettingsViewModel} from '@/view/outlet/view-models/UpdateGeneralSettingsViewModel';
import {Skeleton} from 'antd';
import {Toggle} from 'posy-fnb-core';
import React, {useEffect} from 'react';

type DigitalMenuSettingsProps = {
	data: GeneralSettings | undefined;
	isLoading: boolean;
};

const DigitalMenuSettings = ({data, isLoading}: DigitalMenuSettingsProps) => {
	const dispatch = useAppDispatch();
	const {showDigitalMenu} = useAppSelector(state => state.generalSettings);
	const {outletId} = useAppSelector(state => state.auth);

	const {UpdateGeneralSettings, isLoading: loadUpdateGeneralSettings} =
		useUpdateGeneralSettingsViewModel({});

	const handleUpdateGeneralSettings = (isShow: boolean) => {
		UpdateGeneralSettings({
			restaurant_outlet_uuid: outletId,
			use_digital_menu: isShow,
		});
	};

	useEffect(() => {
		if (data) {
			dispatch(onChangeShowDigitalMenu(data.use_digital_menu));
		}
	}, [data, dispatch]);

	return (
		<section>
			<aside>
				<h1 className="text-xl-semibold text-neutral-100">Digital Menu</h1>
				{isLoading ? (
					<Skeleton
						title={false}
						className="mt-4"
						paragraph={{rows: 1, width: '100%'}}
					/>
				) : null}
				{data ? (
					<div className="mt-4 p-5 rounded-2xl bg-neutral-10 border border-neutral-40 w-full flex justify-between shadow-box-2">
						<span className="text-l-semibold">
							Activate auto generate QR Digital Menu
						</span>
						<Toggle
							disabled={loadUpdateGeneralSettings}
							value={showDigitalMenu}
							onChange={() => handleUpdateGeneralSettings(!showDigitalMenu)}
						/>
					</div>
				) : null}
			</aside>
		</section>
	);
};

export default DigitalMenuSettings;
