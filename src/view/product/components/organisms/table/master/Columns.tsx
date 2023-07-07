import {Product} from '@/domain/product/model/ProductOutlet';
import {useAbility} from '@/view/auth/components/organisms/rbac';
import {useAppDispatch} from '@/view/common/store/hooks';
import {onChangeProductId} from '@/view/common/store/slices/product';
import useProductActions from '@/view/common/store/zustand/Product/ProductAction';
import {toRupiah} from '@/view/common/utils/common';
import {ColumnsType} from 'antd/es/table';
import {BiEdit} from 'react-icons/bi';
import {RiDeleteBinLine} from 'react-icons/ri';

const MasterProductColumns = (): ColumnsType<Product> => {
	const dispatch = useAppDispatch();
	const ability = useAbility();
	const {openForm, setIsEdit, openConfirmation} = useProductActions();

	const onOpenEditProduct = (product_uuid: string) => {
		openForm();
		setIsEdit(true);
		dispatch(onChangeProductId(product_uuid));
	};

	const handleOpenConfirmation = (value: string) => {
		openConfirmation();
		dispatch(onChangeProductId(value));
	};

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
			key: 'edit',
			width: '60px',
			fixed: 'right',
			render: (val, record) => (
				<aside className="flex gap-5 flex-row">
					{ability.can('update', 'product') && (
						<div className="flex items-center justify-center">
							<BiEdit
								onClick={() => onOpenEditProduct(record.uuid)}
								size={18}
								className="cursor-pointer text-neutral-70 hover:opacity-70"
							/>
						</div>
					)}
					{ability.can('delete', 'product') && (
						<div className="flex items-center justify-center">
							<RiDeleteBinLine
								onClick={() => handleOpenConfirmation(record.uuid as string)}
								size={23}
								className="cursor-pointer text-neutral-70 hover:opacity-70"
							/>
						</div>
					)}
				</aside>
			),
		},
	];
};

export default MasterProductColumns;
