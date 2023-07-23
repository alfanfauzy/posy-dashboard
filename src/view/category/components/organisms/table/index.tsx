import {Categories} from '@/domain/category/model';
import {Pagination} from '@/domain/vo/BasePagination';
import Table from '@/view/common/components/atoms/table';
import React from 'react';

import CategoryColumns from './Columns';

type OrganismsTableCategoryProps = {
	dataCategory: Categories | undefined;
	loadCategory: boolean;
	pagination: Pagination | undefined;
};

const OrganismsTableCategory = ({
	dataCategory,
	loadCategory,
	pagination,
}: OrganismsTableCategoryProps) => {
	return (
		<article className="mt-6">
			<Table
				columns={CategoryColumns()}
				dataSource={dataCategory}
				paginationData={pagination}
				scroll={{y: '54vh', x: 1100}}
				loading={loadCategory}
			/>
		</article>
	);
};

export default OrganismsTableCategory;
