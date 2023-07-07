import {GetOutletProductsQueryKey} from '@/data/product/sources/GetOutletProductsQuery';
import {Pagination} from '@/domain/vo/BasePagination';
import {useGetCategoriesViewModel} from '@/view/category/view-models/GetCategoriesViewModel';
import InputSearch from '@/view/common/components/atoms/input/search';
import Select from '@/view/common/components/atoms/input/select';
import {useAppSelector} from '@/view/common/store/hooks';
import {onChangeQueryParams} from '@/view/common/utils/UtilsChangeQueryParams';
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

type OrganismsNavFilterProductProps = {
	selectedRowKeys: Array<Key>;
	setSelectedRowKeys: (key: Array<Key>) => void;
	pagination: Pagination | undefined;
};

const OrganismsNavFilterProduct = ({
	selectedRowKeys,
	setSelectedRowKeys,
	pagination,
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

	const {data: dataCategory} = useGetCategoriesViewModel();

	return (
		<aside className="mt-4">
			<div className="mt-1 flex items-center space-x-4">
				{selectedRowKeys.length > 0 && (
					<Select
						options={actionOptions(selectedRowKeys.length)}
						onChange={handleChangeRowAction}
					/>
				)}
				{dataCategory && (
					<Select
						options={dataCategory.map(category => ({
							label: category.category_name,
							value: category.uuid,
						}))}
						onChange={e =>
							onChangeQueryParams('category', e.currentTarget.value)
						}
						defaultValue={query.category as string}
					/>
				)}
				<div className="flex w-1/2 items-center lg:w-1/4">
					<InputSearch
						placeholder="Search product"
						isOpen
						search={(query.search as string) || ''}
						onSearch={e => onChangeQueryParams('search', e.target.value)}
						onClearSearch={() => onChangeQueryParams('search', '')}
					/>
				</div>
				<div>
					<p className="text-m-medium text-primary-main">
						Total product: {pagination?.total_objs}
					</p>
				</div>
			</div>
		</aside>
	);
};

export default OrganismsNavFilterProduct;
