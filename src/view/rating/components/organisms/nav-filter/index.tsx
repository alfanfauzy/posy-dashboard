import {GetOutletProductsQueryKey} from '@/data/product/sources/GetOutletProductsQuery';
import {Pagination} from '@/domain/vo/BasePagination';
import Datepicker from '@/view/common/components/atoms/input/datepicker';
import Select from '@/view/common/components/atoms/input/select';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {Dates} from '@/view/common/types/date';
import {onChangeQueryParams} from '@/view/common/utils/UtilsChangeQueryParams';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {useUpdateOutletProductStatusViewModel} from '@/view/product/view-models/UpdateOutletProductStatusViewModel';
import {useQueryClient} from '@tanstack/react-query';
import React, {Key} from 'react';

const actionOptions = (length: number) => [
	{
		label: `Selected ${length} ${length === 1 ? 'item' : 'items'}`,
		value: '',
	},
	{label: 'Mark as shown', value: 'is_show'},
	{label: 'Mark as available', value: 'is_available'},
];

type OrganismsNavFilterProductProps = {
	selectedRowKeys: Array<Key>;
	setSelectedRowKeys: (key: Array<Key>) => void;
	pagination: Pagination | undefined;
	dates: Array<Dates>;
};

const OrganismsNavFilterProduct = ({
	selectedRowKeys,
	setSelectedRowKeys,
	pagination,
	dates,
}: OrganismsNavFilterProductProps) => {
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);

	const [isOpenFilterDate, {open: openFilterDate, close: closeFilterDate}] =
		useDisclosure({initialState: false});

	const {updateOutletProductStatus} = useUpdateOutletProductStatusViewModel({
		onSuccess: () => queryClient.invalidateQueries([GetOutletProductsQueryKey]),
	});

	const handleChangeRowAction = (e: React.ChangeEvent<HTMLSelectElement>) => {
		updateOutletProductStatus({
			flag: true,
			restaurant_outlet_uuid: outletId,
			status: e.currentTarget.value as 'is_show' | 'is_available',
			product_uuids: selectedRowKeys as Array<string>,
		});
		setSelectedRowKeys([]);
	};

	const onChangeDate = async (dt: Array<Dates>) => {
		await onChangeQueryParams(
			'start_date',
			dateFormatter(dt[0].startDate, 'yyyy-MM-dd') as string,
		);
		await onChangeQueryParams(
			'end_date',
			dateFormatter(dt[0].endDate, 'yyyy-MM-dd') as string,
		);
	};

	return (
		<aside className="mt-4">
			<div className="mt-1 flex items-center space-x-4">
				{selectedRowKeys.length > 0 && (
					<Select
						options={actionOptions(selectedRowKeys.length)}
						onChange={handleChangeRowAction}
					/>
				)}
				<Datepicker
					dateProps={dates}
					close={closeFilterDate}
					open={openFilterDate}
					isOpen={isOpenFilterDate}
					handleChange={(item: Dates) => onChangeDate([item])}
				/>
				{/* 
				<div className="flex w-1/2 items-center lg:w-1/4">
					<InputSearch
						placeholder="Search transaction"
						isOpen
						search={(query.search as string) || ''}
						onSearch={e => onChangeQueryParams('search', e.target.value)}
						onClearSearch={() => onChangeQueryParams('search', '')}
					/>
				</div> */}
				<div>
					<p className="text-m-medium text-primary-main">
						Total ratings: {pagination?.total_objs}
					</p>
				</div>
			</div>
		</aside>
	);
};

export default OrganismsNavFilterProduct;
