import {useGetCategoriesUsecase} from '@/data/category/usecases/GetCategoriesUsecase';
import {useAbility} from '@/view/auth/components/organisms/rbac';
import AtomModalDiscard from '@/view/common/components/atoms/modal/modal-discard';
import NavDrawer from '@/view/common/components/molecules/nav-drawer';
import useCategoryActions from '@/view/common/store/zustand/Category/CategoryAction';
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

	const {isOpenForm, isOpenConfirmation, isOpenDiscardModal} =
		useCategoryState();

	const {closeDiscard, closeForm, setSelectedCategory, setIsEdit} =
		useCategoryActions();

	const handleCloseDiscard = () => {
		closeDiscard();
		setIsEdit(false);
		closeForm();
		setSelectedCategory({
			category_name: '',
			is_active: false,
			uuid: '',
			restaurant_uuid: '',
		});
	};

	const {
		data: dataCategory,
		pagination,
		isLoading: loadProduct,
	} = useGetCategoriesUsecase({
		limit: Number(query.limit) || 10,
		page: query.search ? 0 : Number(query.page) || 1,
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
		<main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-4">
			{ability.can('read', 'product_category') && (
				<>
					<article>
						<NavDrawer title="Category" />
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
			{isOpenDiscardModal && (
				<AtomModalDiscard
					open={isOpenDiscardModal}
					handleActionOk={handleCloseDiscard}
					handleActionClose={closeDiscard}
				/>
			)}
			{isOpenConfirmation && <OrganismDeleteConfirmationModal />}
		</main>
	);
};

export default ViewCategoryProductPage;
