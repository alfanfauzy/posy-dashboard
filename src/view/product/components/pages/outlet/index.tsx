import NavDrawer from '@/view/common/components/molecules/nav-drawer';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import {useRouter} from 'next/router';
import React, {Key, useEffect, useState} from 'react';

import {useGetOutletProductsViewModel} from '../../../view-models/GetOutletProductsViewModel';
import FormEditProduct from '../../organisms/form/edit-product';
import NavFilterProduct from '../../organisms/nav-filter';
import TableProduct from '../../organisms/table';

const ViewProductPage = () => {
	const {query} = useRouter();
	const {outletId} = useAppSelector(state => state.auth);
	const [selectedRowKeys, setSelectedRowKeys] = useState<Array<Key>>([]);

	const [isOpenEditProduct, {open: openEditProduct, close: closeEditProduct}] =
		useDisclosure({initialState: false});

	const {
		data: dataProduct,
		pagination,
		isLoading: loadProduct,
	} = useGetOutletProductsViewModel({
		limit: Number(query.limit) || 10,
		page: Number(query.page) || 1,
		search: [
			{
				field: 'keyword',
				value: (query.search as string) || '',
			},
			{
				field: 'restaurant_outlet_uuid',
				value: outletId,
			},
			{
				field: 'category_uuid',
				value: (query.category as string) || '',
			},
		],
		sort: {field: 'created_at', value: 'desc'},
	});

	useEffect(() => {
		logEvent({
			category: 'product_outlet',
			action: 'productOutlet_view',
		});
	}, []);

	return (
		<main className="h-full flex-1 overflow-hidden rounded-l-lg bg-neutral-10 p-4">
			<article>
				<NavDrawer title="Product Outlet" />
				<NavFilterProduct
					selectedRowKeys={selectedRowKeys}
					setSelectedRowKeys={setSelectedRowKeys}
					pagination={pagination}
				/>
			</article>
			<TableProduct
				selectedRowKeys={selectedRowKeys}
				setSelectedRowKeys={setSelectedRowKeys}
				openEditProduct={openEditProduct}
				dataProduct={dataProduct}
				pagination={pagination}
				loadProduct={loadProduct}
			/>
			{isOpenEditProduct && (
				<FormEditProduct
					closeEditProduct={closeEditProduct}
					isOpenEditProduct={isOpenEditProduct}
				/>
			)}
		</main>
	);
};

export default ViewProductPage;
