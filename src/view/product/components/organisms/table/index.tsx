import {Products} from '@/domain/product/model/ProductOutlet';
import {Pagination} from '@/domain/vo/BasePagination';
import Table from '@/view/common/components/atoms/table';
import React, {Key} from 'react';

import ProductColumns from './Columns';

type OrganismsTableProductProps = {
	selectedRowKeys: Array<Key>;
	setSelectedRowKeys: (key: Array<Key>) => void;
	openEditProduct: () => void;
	dataProduct: Products | undefined;
	loadProduct: boolean;
	pagination: Pagination | undefined;
};

const OrganismsTableProduct = ({
	selectedRowKeys,
	setSelectedRowKeys,
	openEditProduct,
	dataProduct,
	loadProduct,
	pagination,
}: OrganismsTableProductProps) => {
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
