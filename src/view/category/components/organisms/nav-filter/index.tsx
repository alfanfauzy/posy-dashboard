import {Pagination} from '@/domain/vo/BasePagination';
import {useAbility} from '@/view/auth/components/organisms/rbac';
import InputSearch from '@/view/common/components/atoms/input/search';
import useCategoryActions from '@/view/common/store/zustand/Category/CategoryAction';
import {onChangeQueryParams} from '@/view/common/utils/UtilsChangeQueryParams';
import {useRouter} from 'next/router';
import {Button} from 'posy-fnb-core';
import React from 'react';

type OrganismsNavFilterCategoryProps = {
	pagination: Pagination | undefined;
};

const OrganismsNavFilterCategory = ({
	pagination,
}: OrganismsNavFilterCategoryProps) => {
	const {query} = useRouter();
	const ability = useAbility();

	const {openForm} = useCategoryActions();

	return (
		<aside className="mt-4 flex justify-between">
			<div className="mt-1 flex items-center space-x-4">
				<div className="flex items-center w-[500px]">
					<InputSearch
						placeholder="Search product"
						isOpen
						search={(query.search as string) || ''}
						onSearch={e => onChangeQueryParams('search', e.target.value)}
						onClearSearch={() => onChangeQueryParams('search', '')}
					/>
				</div>
				<div className="w-full">
					<p className="text-m-medium text-primary-main">
						Total product: {pagination?.total_objs}
					</p>
				</div>
			</div>
			{ability.can('create', 'product_category') && (
				<div>
					<Button size="m" onClick={() => openForm()}>
						Add New Category
					</Button>
				</div>
			)}
		</aside>
	);
};

export default OrganismsNavFilterCategory;
