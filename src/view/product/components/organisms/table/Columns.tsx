import {GetOutletProductsQueryKey} from '@/data/product/sources/GetOutletProductsQuery';
import {Product} from '@/domain/product/model/ProductOutlet';
import {UpdateOutletProductStatus} from '@/domain/product/repositories/UpdateOutletProductStatusRepository';
import {useAbility} from '@/view/auth/components/organisms/rbac';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeProductId} from '@/view/common/store/slices/product';
import {toRupiah} from '@/view/common/utils/common';
import {useUpdateOutletProductStatusViewModel} from '@/view/product/view-models/UpdateOutletProductStatusViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {ColumnsType} from 'antd/es/table';
import {Toggle} from 'posy-fnb-core';
import {BiEdit} from 'react-icons/bi';

const ProductColumns = (openEditProduct: () => void): ColumnsType<Product> => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);
	const ability = useAbility();

	const onOpenEditProduct = (product_uuid: string) => {
		openEditProduct();
		dispatch(onChangeProductId(product_uuid));
	};

	const {updateOutletProductStatus} = useUpdateOutletProductStatusViewModel({
		onSuccess: _data => {
			const data = _data as UpdateOutletProductStatus;
			if (data.success)
				queryClient.invalidateQueries([GetOutletProductsQueryKey]);
		},
	});

	return [
		{
			title: 'Product name',
			dataIndex: 'product_name',
			key: 'product_name',
			fixed: 'left',
			width: '300px',
			render: text => <p className="line-clamp-1">{text}</p>,
		},
		{
			title: 'Category',
			dataIndex: 'categories',
			key: 'category',
			width: '100px',
			render: text => (
				<p className="truncate">
					{text
						.map((el: {category_name: string}) => el.category_name)
						.join(', ')}
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
			render: (_, record) => (
				<p className="whitespace-nowrap text-m-regular">
					{toRupiah(record.price_final)}
				</p>
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
						disabled={!ability.can('change_show_product', 'product_outlet')}
						value={val}
						onChange={() =>
							updateOutletProductStatus({
								flag: !val,
								restaurant_outlet_uuid: outletId,
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
						disabled={
							!ability.can('change_available_product', 'product_outlet')
						}
						value={val}
						onChange={() =>
							updateOutletProductStatus({
								flag: !val,
								restaurant_outlet_uuid: outletId,
								status: 'is_available',
								product_uuids: [record.uuid],
							})
						}
					/>
				</div>
			),
		},
		{
			align: 'center',
			title: (
				<p className="cursor-pointer whitespace-nowrap hover:opacity-70">
					Action
				</p>
			),
			key: 'edit',
			width: '60px',
			fixed: 'right',
			render: (val, record) =>
				ability.can('update', 'product_outlet') && (
					<div className="flex items-center justify-center">
						<BiEdit
							onClick={() => onOpenEditProduct(record.uuid)}
							size={18}
							className="cursor-pointer text-neutral-70 hover:opacity-70"
						/>
					</div>
				),
		},
	];
};

export default ProductColumns;
