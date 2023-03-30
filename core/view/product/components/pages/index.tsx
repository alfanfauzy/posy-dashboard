import useDisclosure from '@/hooks/useDisclosure';
import React, {Key, useState} from 'react';

import FormEditProduct from '../organisms/form/edit-product';
import NavFilterProduct from '../organisms/nav-filter';
import TableProduct from '../organisms/table';

const ViewProductPage = () => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<Array<Key>>([]);

	const [isOpenEditProduct, {open: openEditProduct, close: closeEditProduct}] =
		useDisclosure({initialState: false});

	return (
		<main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-6">
			<article>
				<aside className="flex items-start">
					<p className="text-xxl-semibold text-primary-main lg:text-heading-s-semibold">
						Product
					</p>
				</aside>
				<NavFilterProduct
					selectedRowKeys={selectedRowKeys}
					setSelectedRowKeys={setSelectedRowKeys}
				/>
			</article>
			<TableProduct
				selectedRowKeys={selectedRowKeys}
				setSelectedRowKeys={setSelectedRowKeys}
				openEditProduct={openEditProduct}
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
