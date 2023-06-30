import {Categories, Category} from '@/domain/category/model';
import {Pagination} from '@/domain/vo/BasePagination';
import Table from '@/view/common/components/atoms/table';
import React from 'react';

import CategoryColumns from './Columns';

type OrganismsTableCategoryProps = {
	openConfirmaiton: () => void;
	setselectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
	dataCategory: Categories | undefined;
	loadCategory: boolean;
	pagination: Pagination | undefined;
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
	openForm: () => void;
};

const OrganismsTableCategory = ({
	setselectedCategoryId,
	openConfirmaiton,
	dataCategory,
	loadCategory,
	pagination,
	setIsEdit,
	setSelectedCategory,
	openForm,
}: OrganismsTableCategoryProps) => {
	return (
		<article className="mt-6">
			<Table
				columns={CategoryColumns(
					openConfirmaiton,
					setselectedCategoryId,
					setIsEdit,
					setSelectedCategory,
					openForm,
				)}
				dataSource={dataCategory}
				paginationData={pagination}
				scroll={{y: '54vh', x: 1100}}
				loading={loadCategory}
			/>
		</article>
	);
};

export default OrganismsTableCategory;
