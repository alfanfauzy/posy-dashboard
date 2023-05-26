import {Products} from '@/domain/product/model/ProductOutlet';
import {Pagination} from '@/domain/vo/BasePagination';
import {useAbility} from '@/view/auth/components/organisms/rbac';
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
	const ability = useAbility();
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
				rowSelection={
					ability.can('change_available_product', 'product_outlet') ||
					ability.can('change_show_product', 'product_outlet')
						? rowSelection
						: undefined
				}
				scroll={{y: '54vh', x: 1100}}
				loading={loadProduct}
			/>
		</article>
	);
};

export default OrganismsTableProduct;
