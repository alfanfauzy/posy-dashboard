import {Products} from '@/domain/product/model/ProductOutlet';
import {Pagination} from '@/domain/vo/BasePagination';
import Table from '@/view/common/components/atoms/table';
import {Empty} from 'antd';
import React from 'react';

import ProductMasterColumns from './Columns';

type OrganismsTableMasterProductProps = {
	dataProduct: Products | undefined;
	loadProduct: boolean;
	pagination: Pagination | undefined;
};

const OrganismsTableMasterProduct = ({
	dataProduct,
	loadProduct,
	pagination,
}: OrganismsTableMasterProductProps) => {
	return (
		<article className="mt-6">
			<Table
				locale={{
					emptyText: (
						<Empty
							image="https://i.ibb.co/51VpL41/no-result.png"
							imageStyle={{height: 200}}
							className="flex justify-center"
							description=""
						/>
					),
				}}
				columns={ProductMasterColumns()}
				dataSource={dataProduct}
				paginationData={pagination}
				scroll={{y: '54vh', x: 1100}}
				loading={loadProduct}
			/>
		</article>
	);
};

export default OrganismsTableMasterProduct;
