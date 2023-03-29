import Table from '@/atoms/table';
import {GetOutletProductsQueryKey} from '@/data/product/sources/GetOutletProductsQuery';
import {Product} from '@/domain/product/model';
import {UpdateOutletProductStatusInput} from '@/domain/product/repositories/ProductRepository';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {onChangeProductId} from '@/store/slices/product';
import {toRupiah} from '@/utils/common';
import {useGetOutletProductsViewModel} from '@/view/product/view-models/GetOutletProductsViewModel';
import {useUpdateOutletProductStatusViewModel} from '@/view/product/view-models/UpdateOutletProductStatusViewModel';
import {useQueryClient} from '@tanstack/react-query';
import type {ColumnsType} from 'antd/es/table';
import {useRouter} from 'next/router';
import {Toggle} from 'posy-fnb-core';
import React, {Key} from 'react';

const columns = (
	updateOutletProductStatus: (input: UpdateOutletProductStatusInput) => void,
	restaurant_outlet_uuid: string,
): ColumnsType<Product> => [
	{
		title: 'Product name',
		dataIndex: 'product_name',
		key: 'product_name',
		fixed: 'left',
		width: '320px',
		render: text => <p className="line-clamp-1">{text}</p>,
	},
	{
		title: 'Category',
		dataIndex: 'categories',
		key: 'category',
		width: '100px',
		render: text => (
			<p className="truncate">
				{text.map((el: {category_name: string}) => el.category_name).join(', ')}
			</p>
		),
	},
	{
		title: (
			<p className="flex justify-center whitespace-nowrap">Selling price</p>
		),
		dataIndex: 'price',
		key: 'price_final',
		width: '118px',
		align: 'center',
		render: text => (
			<p className="whitespace-nowrap text-m-regular">{toRupiah(text)}</p>
		),
	},

	{
		align: 'center',
		title: <p className="whitespace-nowrap">Show product</p>,
		dataIndex: 'is_show',
		key: 'is_show',
		width: '128px',
		render: (val, record) => (
			<div className="flex items-center justify-center">
				<Toggle
					value={val}
					onChange={() =>
						updateOutletProductStatus({
							flag: !val,
							restaurant_outlet_uuid,
							status: 'is_show',
							product_uuids: [record.uuid],
						})
					}
				/>
			</div>
		),
	},
	{
		align: 'center',
		title: <p className="whitespace-nowrap">Product available</p>,
		dataIndex: 'is_available',
		key: 'is_available',
		width: '135px',
		render: (val, record) => (
			<div className="flex items-center justify-center">
				<Toggle
					value={val}
					onChange={() =>
						updateOutletProductStatus({
							flag: !val,
							restaurant_outlet_uuid,
							status: 'is_available',
							product_uuids: [record.uuid],
						})
					}
				/>
			</div>
		),
	},
	// {
	//   align: 'center',
	//   title: (
	//     <p
	//       role="presentation"
	//       onClick={() => console.log('tes')}
	//       className="cursor-pointer whitespace-nowrap hover:opacity-70"
	//     >
	//       +
	//     </p>
	//   ),
	//   key: 'edit',
	//   width: '60px',
	//   fixed: 'right',
	//   render: () => (
	//     <div className="flex items-center justify-center">
	//       {/* <BiEdit
	//         size={18}
	//         className="cursor-pointer text-neutral-70 hover:opacity-70"
	//       /> */}
	//     </div>
	//   ),
	// },
];

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
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);

	const {updateOutletProductStatus} = useUpdateOutletProductStatusViewModel({
		onSuccess: () => queryClient.invalidateQueries([GetOutletProductsQueryKey]),
	});

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

	const onOpenEditProduct = (product_uuid: string) => {
		openEditProduct();
		dispatch(onChangeProductId(product_uuid));
	};

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
				onRow={record => ({
					onClick: () => onOpenEditProduct(record.uuid),
				})}
				columns={columns(updateOutletProductStatus, outletId)}
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
