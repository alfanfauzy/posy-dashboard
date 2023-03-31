import Table from '@/atoms/table';
import {useAppSelector} from '@/store/hooks';
import {useGetOutletProductsViewModel} from '@/view/product/view-models/GetOutletProductsViewModel';
import {useRouter} from 'next/router';
import React, {Key} from 'react';

import ProductColumns from './Columns';

type OrganismsTableProductProps = {
	selectedRowKeys: Array<Key>;
	setSelectedRowKeys: (key: Array<Key>) => void;
	openEditProduct: () => void;
};

const OrganismsTableProduct = ({
	selectedRowKeys,
	setSelectedRowKeys,
	openEditProduct,
}: OrganismsTableProductProps) => {
	const {query} = useRouter();
	const {outletId} = useAppSelector(state => state.auth);

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

	const onSelectChange = (newSelectedRowKeys: Array<Key>) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	return (
		<article className="mt-6">
			<Table
				columns={ProductColumns(openEditProduct)}
				dataSource={dataProduct}
				paginationData={pagination}
				rowKey={record => record.uuid}
				rowSelection={rowSelection}
				scroll={{y: '54vh', x: 1100}}
				loading={loadProduct}
			/>
		</article>
	);
};

export default OrganismsTableProduct;
