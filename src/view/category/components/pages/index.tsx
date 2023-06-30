import {useGetCategoriesUsecase} from '@/data/category/usecases/GetCategoriesUsecase';
import {Category} from '@/domain/category/model';
import {useAbility} from '@/view/auth/components/organisms/rbac';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useRouter} from 'next/router';
import React, {useState} from 'react';

import OrganismsFormCategory from '../organisms/form';
import OrganismDeleteConfirmationModal from '../organisms/modal/DeleteConfirmationModal';
import OrganismsNavFilterCategory from '../organisms/nav-filter';
import OrganismsTableCategory from '../organisms/table';

const ViewCategoryProductPage = () => {
	const {query} = useRouter();
	const ability = useAbility();

	const [isEdit, setIsEdit] = useState(false);
	const [selectedCategoryId, setselectedCategoryId] = useState('');
	const [selectedCategory, setselectedCategory] = useState<Category>({
		category_name: '',
		is_active: false,
		uuid: '',
		restaurant_uuid: '',
	});

	const [isOpenForm, {open: openForm, close: closeForm}] = useDisclosure({
		initialState: false,
	});

	const [
		isOpenConfirmation,
		{open: openConfirmation, close: closeConfirmation},
	] = useDisclosure({
		initialState: false,
	});

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
						<OrganismsNavFilterCategory
							pagination={pagination}
							openForm={openForm}
						/>
					</article>
					<OrganismsTableCategory
						openConfirmaiton={openConfirmation}
						setselectedCategoryId={setselectedCategoryId}
						dataCategory={newDataCategory}
						pagination={pagination}
						loadCategory={loadProduct}
						setIsEdit={setIsEdit}
						setSelectedCategory={setselectedCategory}
						openForm={openForm}
					/>
				</>
			)}
			{isOpenForm && (
				<OrganismsFormCategory
					closeForm={closeForm}
					isOpenForm={isOpenForm}
					setIsEdit={setIsEdit}
					isEdit={isEdit}
					selectedCategory={selectedCategory}
					setSelectedCategory={setselectedCategory}
				/>
			)}
			{isOpenConfirmation && (
				<OrganismDeleteConfirmationModal
					closeConfirmation={closeConfirmation}
					isOpenConfirmation={isOpenConfirmation}
					value={selectedCategoryId}
				/>
			)}
		</main>
	);
};

export default ViewCategoryProductPage;
