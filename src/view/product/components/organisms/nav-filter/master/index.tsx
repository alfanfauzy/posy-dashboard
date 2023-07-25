import {Pagination} from '@/domain/vo/BasePagination';
import {useAbility} from '@/view/auth/components/organisms/rbac';
import {useGetCategoriesViewModel} from '@/view/category/view-models/GetCategoriesViewModel';
import InputSearch from '@/view/common/components/atoms/input/search';
import Select from '@/view/common/components/atoms/input/select';
import useProductActions from '@/view/common/store/zustand/Product/ProductAction';
import {onChangeQueryParams} from '@/view/common/utils/UtilsChangeQueryParams';
import {useRouter} from 'next/router';
import {Button} from 'posy-fnb-core';
import React from 'react';

type OrganismsNavFilterMasterProductProps = {
	pagination: Pagination | undefined;
};

const OrganismsNavFilterMasterProduct = ({
	pagination,
}: OrganismsNavFilterMasterProductProps) => {
	const {query} = useRouter();
	const ability = useAbility();
	const {openForm} = useProductActions();

	const {data: dataCategory} = useGetCategoriesViewModel();

	return (
		<aside className="mt-4 flex justify-between">
			<div className="mt-1 flex justify-start items-center space-x-4">
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
				<div className="flex w-1/2 items-center">
					<InputSearch
						placeholder="Search product"
						isOpen
						search={(query.search as string) || ''}
						onSearch={e => onChangeQueryParams('search', e.target.value)}
						onClearSearch={() => onChangeQueryParams('search', '')}
					/>
				</div>
				<div className="w-[200px]">
					<p className="text-m-medium text-primary-main">
						Total products: {pagination?.total_objs}
					</p>
				</div>
			</div>
			{ability.can('create', 'product') && (
				<div>
					<Button size="m" onClick={() => openForm()}>
						Add New Product
					</Button>
				</div>
			)}
		</aside>
	);
};

export default OrganismsNavFilterMasterProduct;
