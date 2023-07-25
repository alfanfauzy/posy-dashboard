import NavDrawer from '@/view/common/components/molecules/nav-drawer';
import useProductActions from '@/view/common/store/zustand/Product/ProductAction';
import useProductState from '@/view/common/store/zustand/Product/ProductZustand';
import {useGetMasterProductsViewModel} from '@/view/product/view-models/GetMasterProductsViewModel';
import {useRouter} from 'next/router';
import React from 'react';

import OrganismsFormMasterProduct from '../../organisms/form/master';
import OrganismDeleteProductMasterConfirmationModal from '../../organisms/modal/DeleteConfirmationModal';
import OrganismsNavFilterMasterProduct from '../../organisms/nav-filter/master';
import OrganismsTableMasterProduct from '../../organisms/table/master';

const ViewMasterProductPage = () => {
	const {query} = useRouter();

	const {isOpenForm, isOpenConfirmation} = useProductState();
	const {closeForm} = useProductActions();

	const {
		data: dataProduct,
		pagination,
		isLoading: loadProduct,
	} = useGetMasterProductsViewModel({
		limit: Number(query.limit) || 10,
		page: query.search ? 0 : Number(query.page) || 1,
		search: [
			{
				field: 'keyword',
				value: (query.search as string) || '',
			},
			{
				field: 'category_uuid',
				value: (query.category as string) || '',
			},
		],
		sort: {field: 'created_at', value: 'desc'},
	});

	return (
		<main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-4">
			<article>
				<NavDrawer title="Product" />
				<OrganismsNavFilterMasterProduct pagination={pagination} />
			</article>
			<OrganismsTableMasterProduct
				dataProduct={dataProduct}
				pagination={pagination}
				loadProduct={loadProduct}
			/>
			{isOpenForm && (
				<OrganismsFormMasterProduct
					closeEditProduct={closeForm}
					isOpenEditProduct={isOpenForm}
				/>
			)}
			{isOpenConfirmation && <OrganismDeleteProductMasterConfirmationModal />}
		</main>
	);
};

export default ViewMasterProductPage;
