import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {useRouter} from 'next/router';
import React, {Key, useState} from 'react';

import {useGetOutletProductsViewModel} from '../../view-models/GetOutletProductsViewModel';
import FormEditProduct from '../organisms/form/edit-product';
import NavFilterProduct from '../organisms/nav-filter';
import TableProduct from '../organisms/table';

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
		],
		sort: {field: 'created_at', value: 'desc'},
	});

	return (
		<main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-6">
			<article>
				<aside className="flex items-start">
					<p className="text-xxl-semibold text-neutral-100 lg:text-heading-s-semibold">
						Product
					</p>
				</aside>
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
