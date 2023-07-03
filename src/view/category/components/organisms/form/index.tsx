import {mapTopUpdateCategory} from '@/data/category/mappers/CategoryMapper';
import {GetCategoriesQueryKey} from '@/data/category/sources/GetCategoriesQuery';
import {
	FormCategoryValidation,
	validateSchemaFormCategory,
} from '@/view/category/schema/category-schema';
import {useCreateCategoryViewModel} from '@/view/category/view-models/CreateCategoryViewModel';
import {useUpdateCategoryViewModel} from '@/view/category/view-models/UpdateCategoryViewModel';
import {useForm} from '@/view/common/hooks/useForm';
import useCategoryActions from '@/view/common/store/zustand/Category/CategoryAction';
import useCategoryState from '@/view/common/store/zustand/Category/CategoryZustand';
import {useQueryClient} from '@tanstack/react-query';
import {Button, Input, Modal, Toggle} from 'posy-fnb-core';
import React, {useEffect} from 'react';
import {Controller} from 'react-hook-form';

const OrganismsFormCategory = () => {
	const queryClient = useQueryClient();

	const {isEdit, isOpenForm, selectedCategory} = useCategoryState();
	const {closeForm, setIsEdit, setSelectedCategory} = useCategoryActions();

	const onCloseFormCategory = () => {
		setIsEdit(false);
		closeForm();
		setSelectedCategory({
			category_name: '',
			is_active: false,
			uuid: '',
			restaurant_uuid: '',
		});
	};

	const methods = useForm({
		mode: 'onChange',
		schema: validateSchemaFormCategory,
		defaultValues: {
			is_active: true,
		},
	});

	const {
		control,
		formState: {isValid},
		setValue,
	} = methods;

	const {createCategory, isLoading: isLoadingCreate} =
		useCreateCategoryViewModel({
			onSuccess: () => {
				queryClient.invalidateQueries([GetCategoriesQueryKey]);
				onCloseFormCategory();
			},
		});

	const {updateCategory, isLoading: isLoadingUpdate} =
		useUpdateCategoryViewModel({
			onSuccess: () => {
				queryClient.invalidateQueries([GetCategoriesQueryKey]);
				onCloseFormCategory();
			},
		});

	const onSubmit = (data: FormCategoryValidation) => {
		if (isEdit) {
			const editPayload = mapTopUpdateCategory(data, selectedCategory);

			updateCategory(editPayload);
		} else {
			createCategory(data);
		}
	};

	useEffect(() => {
		if (isEdit) {
			setValue('category_name', selectedCategory.category_name, {
				shouldValidate: true,
			});
			setValue('is_active', selectedCategory.is_active, {
				shouldValidate: true,
			});
		}
	}, [isEdit]);

	const TitleModal = isEdit ? 'Edit category' : 'Add new category';

	return (
		<Modal
			title={TitleModal}
			style={{
				height: 'auto',
				maxWidth: '40%',
				width: '80%',
				padding: 0,
			}}
			isForm
			handleSubmit={methods.handleSubmit(onSubmit)}
			showCloseButton
			open={isOpenForm}
			handleClose={onCloseFormCategory}
			confirmButton={
				<div className="flex w-full items-center justify-center gap-4">
					<Button
						isLoading={isLoadingCreate || isLoadingUpdate}
						disabled={!isValid}
						type="submit"
						fullWidth
					>
						Save
					</Button>
				</div>
			}
		>
			<aside className="flex p-6 flex-col gap-4">
				<div>
					<Controller
						control={control}
						name="category_name"
						render={({field: {value, onChange}}) => (
							<Input
								fullwidth
								labelText="Product Name"
								onChange={onChange}
								value={value}
								placeholder="Input category name"
								className="text-m-regular"
							/>
						)}
					/>
				</div>
				<div>
					<p className="mb-4 text-m-regular">Recommendation</p>
					<Controller
						control={control}
						name="is_active"
						render={({field: {value}}) => (
							<Toggle
								value={value}
								onChange={() => setValue('is_active', !value)}
							/>
						)}
					/>
				</div>
			</aside>
		</Modal>
	);
};

export default OrganismsFormCategory;
