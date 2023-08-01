import {useAppDispatch} from '@/view/common/store/hooks';
import {
	ViewType,
	onChangeViewType,
} from '@/view/common/store/slices/transaction';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import React from 'react';

const ViewTypeMenu = () => {
	const dispatch = useAppDispatch();

	const handleChangeViewType = (viewType: ViewType) => {
		dispatch(onChangeViewType(viewType));
		logEvent({
			category: 'transaction',
			action: 'transacrtion_more_click',
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<p
				onClick={() => handleChangeViewType('table')}
				className="hover:text-primary-main cursor-pointer"
			>
				Table View
			</p>
			<p
				onClick={() => handleChangeViewType('transaction')}
				className="hover:text-primary-main cursor-pointer"
			>
				Transaction View
			</p>
		</div>
	);
};

export default ViewTypeMenu;
