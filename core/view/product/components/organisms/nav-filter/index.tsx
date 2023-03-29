import InputSearch from '@/atoms/input/search';
import Select from '@/atoms/input/select';
import {GetOutletProductsQueryKey} from '@/data/product/sources/GetOutletProductsQuery';
import {useAppSelector} from '@/store/hooks';
import {onChangeQueryParams} from '@/utils/UtilsChangeQueryParams';
import {useUpdateOutletProductStatusViewModel} from '@/view/product/view-models/UpdateOutletProductStatusViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import React, {Key} from 'react';

const actionOptions = (length: number) => [
	{
		label: `Selected ${length} ${length === 1 ? 'item' : 'items'}`,
		value: '',
	},
	{label: 'Mark as shown', value: 'is_show'},
	{label: 'Mark as available', value: 'is_available'},
];

const categoryOptions = [
	{label: 'Select Category', value: '', hide: true},
	{label: 'Category: All', value: 'all'},
	{label: 'Category: Food', value: 'food'},
	{label: 'Category: Beverages', value: 'beverages'},
	{label: 'Category: Desserts', value: 'desserts'},
];

type OrganismsNavFilterProductProps = {
	selectedRowKeys: Array<Key>;
	setSelectedRowKeys: (key: Array<Key>) => void;
};

const OrganismsNavFilterProduct = ({
	selectedRowKeys,
	setSelectedRowKeys,
}: OrganismsNavFilterProductProps) => {
	const {query} = useRouter();
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);

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

	return (
		<aside className="mt-4">
			<div className="mt-1 flex items-center space-x-4">
				{selectedRowKeys.length > 0 && (
					<Select
						options={actionOptions(selectedRowKeys.length)}
						onChange={handleChangeRowAction}
					/>
				)}
				<Select
					options={categoryOptions}
					onChange={e => onChangeQueryParams('category', e.currentTarget.value)}
					defaultValue={query.category as string}
				/>
				<div className="flex w-1/2 items-center lg:w-1/4">
					<InputSearch
						placeholder="Search Product"
						isOpen
						search={(query.search as string) || ''}
						onSearch={e => onChangeQueryParams('search', e.target.value)}
						onClearSearch={() => onChangeQueryParams('search', '')}
					/>
				</div>
			</div>
		</aside>
	);
};

export default OrganismsNavFilterProduct;
