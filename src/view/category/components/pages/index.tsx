import {useGetCategoriesUsecase} from '@/data/category/usecases/GetCategoriesUsecase';
import {useAbility} from '@/view/auth/components/organisms/rbac';
import useCategoryState from '@/view/common/store/zustand/Category/CategoryZustand';
import {useRouter} from 'next/router';
import React from 'react';

import OrganismsFormCategory from '../organisms/form';
import OrganismDeleteConfirmationModal from '../organisms/modal/DeleteConfirmationModal';
import OrganismsNavFilterCategory from '../organisms/nav-filter';
import OrganismsTableCategory from '../organisms/table';

const ViewCategoryProductPage = () => {
	const {query} = useRouter();
	const ability = useAbility();

	const {isOpenForm, isOpenConfirmation} = useCategoryState();

	const {
		data: dataCategory,
		pagination,
		isLoading: loadProduct,
	} = useGetCategoriesUsecase({
		limit: Number(query.limit) || 10,
		page: Number(query.page) || 1,
		search: [
			{
				field: 'keyword',
				value: (query.search as string) || '',
			},
		],
		sort: {field: 'created_at', value: 'desc'},
	});

	const newDataCategory = dataCategory?.filter(data => data.uuid !== '');

	return (
		<main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-6">
			{ability.can('read', 'product_category') && (
				<>
					<article>
						<aside className="flex items-start">
							<p className="text-xxl-semibold text-neutral-100 ">Category</p>
						</aside>
						<OrganismsNavFilterCategory pagination={pagination} />
					</article>
					<OrganismsTableCategory
						dataCategory={newDataCategory}
						pagination={pagination}
						loadCategory={loadProduct}
					/>
				</>
			)}
			{isOpenForm && <OrganismsFormCategory />}
			{isOpenConfirmation && <OrganismDeleteConfirmationModal />}
		</main>
	);
};

export default ViewCategoryProductPage;
