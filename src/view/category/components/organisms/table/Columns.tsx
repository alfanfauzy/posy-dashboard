import {GetCategoriesQueryKey} from '@/data/category/sources/GetCategoriesQuery';
import {Category} from '@/domain/category/model';
import {UpdateCategoryResponse} from '@/domain/category/repositories/UpdateCategoryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useAbility} from '@/view/auth/components/organisms/rbac';
import {useUpdateCategoryViewModel} from '@/view/category/view-models/UpdateCategoryViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {ColumnsType} from 'antd/es/table';
import {Toggle} from 'posy-fnb-core';
import {BiEdit} from 'react-icons/bi';
import {RiDeleteBinLine} from 'react-icons/ri';

const CategoryColumns = (
	openConfirmaiton: () => void,
	setSelectedCategoryId: (value: string) => void,
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
	setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>,
	openForm: () => void,
): ColumnsType<Category> => {
	const queryClient = useQueryClient();
	const ability = useAbility();

	const {updateCategory} = useUpdateCategoryViewModel({
		onSuccess: _data => {
			const data = _data as Response<UpdateCategoryResponse>;
			if (data) queryClient.invalidateQueries([GetCategoriesQueryKey]);
		},
	});

	const handleOpenConfirmation = (value: string) => {
		openConfirmaiton();
		setSelectedCategoryId(value);
	};

	const handleOpenForm = (data: Category) => {
		openForm();
		setSelectedCategory(data);
		setIsEdit(true);
	};

	return [
		{
			title: 'Category name',
			dataIndex: 'category_name',
			key: 'category_name',
			fixed: 'left',
			width: '300px',
			render: text => <p className="line-clamp-1">{text}</p>,
		},
		{
			align: 'center',
			title: 'Show Category',
			dataIndex: 'is_active',
			key: 'is_active',
			width: '128px',
			render: (val, record) => (
				<div className="flex items-center justify-center">
					<Toggle
						disabled={!ability.can('update', 'product_category')}
						value={val}
						onChange={() =>
							updateCategory({
								categoryId: record.uuid,
								payload: {category_name: record.category_name, is_active: !val},
							})
						}
					/>
				</div>
			),
		},
		{
			align: 'center',
			title: '',
			key: 'edit',
			width: '60px',
			fixed: 'right',
			render: (val, record) => (
				<aside className="flex gap-5 flex-row">
					{ability.can('update', 'product_category') && (
						<div className="flex items-center justify-center">
							<BiEdit
								onClick={() => handleOpenForm(record)}
								size={23}
								className="cursor-pointer text-neutral-70 hover:opacity-70"
							/>
						</div>
					)}
					{ability.can('delete', 'product_category') && (
						<div className="flex items-center justify-center">
							<RiDeleteBinLine
								onClick={() => handleOpenConfirmation(record.uuid as string)}
								size={23}
								className="cursor-pointer text-neutral-70 hover:opacity-70"
							/>
						</div>
					)}
				</aside>
				//
			),
		},
	];
};

export default CategoryColumns;
