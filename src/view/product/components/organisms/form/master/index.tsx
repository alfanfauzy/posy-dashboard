import {useGetCategoriesUsecase} from '@/data/category/usecases/GetCategoriesUsecase';
import {UploadFilePublicResponse} from '@/data/file-upload/types';
import {
	mapToDetailProductModel,
	mapToPayloadMasterProduct,
} from '@/data/product/mappers/ProductMapper';
import {GetMasterProductsQueryKey} from '@/data/product/sources/GetMasterProductsMutation';
import {UpdateProductInput} from '@/domain/product/repositories/UpdateMenuProductRepository';
import {UpdateOutletProduct} from '@/domain/product/repositories/UpdateOutletProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import AtomImages from '@/view/common/components/atoms/images';
import InputNumeric from '@/view/common/components/atoms/input/numeric/InputNumeric';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeProductId} from '@/view/common/store/slices/product';
import useProductActions from '@/view/common/store/zustand/Product/ProductAction';
import useProductState from '@/view/common/store/zustand/Product/ProductZustand';
import {
	formatCurrencyTextInput,
	removeFormatRupiah,
} from '@/view/common/utils/UtilsCurrencyFormater';
import {FilterOption} from '@/view/common/utils/UtilsFilterOption';
import {useUploadImagePublicViewModal} from '@/view/file-upload/view-modals/UploadImagePublicViewModels';
import {useGetOutletSelectionViewModel} from '@/view/outlet/view-models/GetOutletSelectionViewModel';
import {
	ProductMasterSchema,
	ValidationSchemaMasterProductType,
} from '@/view/product/schemas/product-master';
import {useCreateProductViewModel} from '@/view/product/view-models/CreateMenuProductViewModel';
import {useGetMasterProductViewModel} from '@/view/product/view-models/GetMasterProductViewModel';
import {useUpdateProductViewModel} from '@/view/product/view-models/UpdateMenuProductViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Button, Input, Loading, Modal, Textarea, Toggle} from 'posy-fnb-core';
import React, {useEffect, useMemo, useState} from 'react';
import {Controller, FormProvider, useFieldArray} from 'react-hook-form';
import {CgTrash} from 'react-icons/cg';
import Select from 'react-select';

import VariantForm from './VariantForm';

type OrganismsFormMasterProductProps = {
	closeEditProduct: () => void;
	isOpenEditProduct: boolean;
};

const OrganismsFormMasterProduct = ({
	closeEditProduct,
	isOpenEditProduct,
}: OrganismsFormMasterProductProps) => {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const {selectedProductId} = useAppSelector(state => state.product);

	const {isEdit} = useProductState();
	const {setIsEdit} = useProductActions();

	const [imageProduct, setImageProduct] = useState('');

	const methods = useForm({
		mode: 'onChange',
		schema: ProductMasterSchema,
		defaultValues: {
			is_show: true,
			is_available: true,
			is_discount: false,
			is_active_cooking_duration: false,
			is_favourite: false,
		},
	});

	const {
		control,
		formState: {errors, isValid},
		resetField,
		setValue,
		getValues,
		watch,
		reset,
		register,
		clearErrors,
		setFocus,
	} = methods;

	const {fields, append, remove} = useFieldArray({
		control,
		name: 'addon',
	});

	const onCloseEditProduct = () => {
		dispatch(onChangeProductId(''));
		reset();
		closeEditProduct();
		setIsEdit(false);
	};

	const {isLoading: loadingDetailMasterData} = useGetMasterProductViewModel(
		selectedProductId,
		{
			enabled: isEdit && !!selectedProductId,
			onSuccess: data => {
				if (data.message === 'OK' && data.data) {
					const mapperProductDetail = mapToDetailProductModel(data.data);
					setValue('force_outlet_update', false, {shouldValidate: true});
					setImageProduct(mapperProductDetail.product_image_url ?? '');
					setValue('product_image_url', mapperProductDetail.product_image_url, {
						shouldValidate: true,
					});
					setValue('product_name', mapperProductDetail.product_name, {
						shouldValidate: true,
					});
					setValue(
						'cooking_duration',
						mapperProductDetail.cooking_duration.toString(),
						{shouldValidate: true},
					);
					setValue(
						'product_description',
						mapperProductDetail.product_description,
						{shouldValidate: true},
					);
					setValue('price', mapperProductDetail.price.toString(), {
						shouldValidate: true,
					});
					setValue('is_show', mapperProductDetail.is_show ?? false, {
						shouldValidate: true,
					});
					setValue('is_available', mapperProductDetail.is_available ?? false, {
						shouldValidate: true,
					});
					setValue('is_favourite', mapperProductDetail.is_favourite, {
						shouldValidate: true,
					});
					setValue('category_uuids', mapperProductDetail.categories, {
						shouldValidate: true,
					});
					setValue(
						'restaurant_outlet_uuids',
						mapperProductDetail.restaurant_outlets,
						{shouldValidate: true},
					);
					setValue(
						'price_after_discount',
						mapperProductDetail.price_after_discount.toString(),
						{shouldValidate: true},
					);
					setValue(
						'price_discount_percentage',
						mapperProductDetail.price_discount_percentage.toString(),
						{shouldValidate: true},
					);

					if (mapperProductDetail?.addons) {
						setValue('addon', [], {shouldValidate: true});
						mapperProductDetail?.addons.forEach(addon => {
							append({
								addon_name: addon.addon_name,
								can_choose_multiple: addon.can_choose_multiple,
								is_optional: addon.is_optional,
								variants: addon.variants.map(variant => ({
									variant_name: variant.variant_name,
									variant_price: variant?.variant_price
										? variant?.variant_price.toString()
										: '0',
									variant_priority: variant?.variant_priority ?? 0,
								})),
							});
						});
					}
				}
			},
		},
	);

	const {data: dataOutletSelection, isLoading: isLoadingOutlet} =
		useGetOutletSelectionViewModel({
			enabled: isOpenEditProduct,
		});

	const OptionsOutlet = useMemo(() => {
		if (!dataOutletSelection) return [];

		return Object.values(dataOutletSelection).map(outlet => ({
			label: outlet.outlet_name,
			value: outlet.uuid,
		}));
	}, [dataOutletSelection]);

	const {data: dataCategory, isLoading: isLoadingCategory} =
		useGetCategoriesUsecase(
			{
				search: [{field: 'is_active', value: 'true'}],
				sort: {field: 'created_at', value: 'desc'},
				page: 1,
				limit: 0,
			},
			{
				enabled: isOpenEditProduct,
			},
		);

	const OptionsCategories = useMemo(() => {
		if (!dataCategory) return [];

		return Object.values(dataCategory)
			.filter(data => data.category_name !== 'All')
			.map(category => ({
				label: category.category_name,
				value: category.uuid,
			}));
	}, [dataCategory]);

	const {updateProduct, isLoading: loadUpdateProduct} =
		useUpdateProductViewModel({
			onSuccess: _data => {
				const data = _data as UpdateOutletProduct;
				if (data.success) {
					queryClient.invalidateQueries([GetMasterProductsQueryKey]);
					setTimeout(() => {
						onCloseEditProduct();
					}, 500);
				}
			},
		});

	const {createProduct, isLoading: isLoadingCreate} = useCreateProductViewModel(
		{
			onSuccess: _data => {
				const data = _data as UpdateOutletProduct;
				if (data.success) {
					queryClient.invalidateQueries([GetMasterProductsQueryKey]);
					setTimeout(() => {
						onCloseEditProduct();
					}, 500);
				}
			},
		},
	);

	const {uploadImagePublic} = useUploadImagePublicViewModal({
		onSuccess(data: Response<UploadFilePublicResponse>) {
			setValue('product_image_url', data.data.url, {shouldValidate: true});
		},
	});

	const handleUploadImage = (
		event: React.ChangeEvent<HTMLInputElement>,
		prefix: string,
	) => {
		if (event.target.files && event.target.files[0]) {
			const formDataUploadImagePublic = new FormData();

			setImageProduct(URL.createObjectURL(event.target.files[0]));

			formDataUploadImagePublic.append('image_filename_prefix', prefix);
			formDataUploadImagePublic.append('image_file', event.target.files[0]);

			uploadImagePublic(formDataUploadImagePublic);
		}
	};

	const handleChangeIamge = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleUploadImage(e, 'product_image_url');
	};

	const onToggleActiveDiscount = (value: boolean) => {
		setValue('is_discount', !value, {shouldValidate: true});
		setValue('price_after_discount', '', {shouldValidate: true});
		setValue('price_discount_percentage', '', {shouldValidate: true});
	};

	const onToggleActiveCookingDuration = (value: boolean) => {
		setValue('is_active_cooking_duration', !value, {shouldValidate: true});
		resetField('cooking_duration');
		setValue('cooking_duration', '', {shouldValidate: true});
	};

	const onSubmit = (data: ValidationSchemaMasterProductType) => {
		const payload = mapToPayloadMasterProduct(data);

		if (isEdit) {
			const updatePayload: UpdateProductInput = {
				productId: selectedProductId,
				payload: payload,
			};
			updateProduct(updatePayload);
		} else {
			createProduct(payload);
		}
	};

	useEffect(() => {
		setFocus('product_name');
	}, [setFocus]);

	const titleModal = isEdit ? 'Edit product' : 'Add new product';

	console.log(watch());
	console.log(errors);

	return (
		<Modal
			className="!p-0 !max-w-[650px]"
			isForm
			title={titleModal}
			handleSubmit={methods.handleSubmit(onSubmit)}
			showCloseButton
			open={isOpenEditProduct}
			handleClose={onCloseEditProduct}
			confirmButton={
				<div className="flex w-full items-center justify-center gap-4">
					<Button
						isLoading={isLoadingCreate || loadUpdateProduct}
						disabled={!isValid}
						variant="primary"
						type="submit"
						fullWidth
					>
						Save
					</Button>
				</div>
			}
		>
			{isEdit && loadingDetailMasterData ? (
				<div className="mx-auto h-full flex justify-center">
					<Loading size={60} />
				</div>
			) : (
				<FormProvider {...methods}>
					<div className="px-6 py-4">
						<aside className="flex gap-6">
							<div>
								<AtomImages
									url={imageProduct}
									width={149}
									height={149}
									alt="product-image"
									onChangeImage={handleChangeIamge}
								/>
							</div>

							<div className="flex-1">
								<div>
									<Controller
										name="product_name"
										control={control}
										render={({field: {name, value, onChange}}) => (
											<Input
												name={name}
												value={value}
												onChange={onChange}
												fullwidth
												labelText="Product Name"
												placeholder="e.g. Fried Rice"
												error={!!errors?.product_name}
												helperText={errors?.product_name?.message}
											/>
										)}
									/>
								</div>
								<div className="mt-4">
									<label className="mb-1 block text-m-regular">Category</label>
									<Controller
										name="category_uuids"
										control={control}
										render={({field: {name, value}}) => (
											<Select
												name={name}
												isLoading={isLoadingCategory}
												options={OptionsCategories}
												placeholder={'Choose category'}
												value={value}
												filterOption={FilterOption}
												isMulti
												onChange={e => {
													setValue(
														'category_uuids',
														e as Array<{label: string; value: string}>,
														{shouldValidate: true},
													);
												}}
											/>
										)}
									/>
									{errors && errors?.category_uuids && (
										<small className="mt-1 block text-m-regular text-red-caution">
											{errors?.category_uuids && 'This field cannot be empty'}
										</small>
									)}
								</div>
							</div>
						</aside>

						<aside className="mt-6">
							<Controller
								name="product_description"
								control={control}
								render={({field: {name, value, onChange}}) => (
									<Textarea
										name={name}
										onChange={onChange}
										labelText="Description"
										value={value}
										placeholder="e.g. fried rice is a combination of long grained rice and eggs."
									/>
								)}
							/>
						</aside>

						<aside className="mt-6">
							<label className="mb-1 block text-m-regular">Outlet</label>
							<Controller
								name="restaurant_outlet_uuids"
								control={control}
								render={({field: {name, value}}) => (
									<Select
										name={name}
										isLoading={isLoadingOutlet}
										options={OptionsOutlet}
										placeholder={'Choose Outlet'}
										value={value}
										filterOption={FilterOption}
										isMulti
										onChange={e => {
											setValue(
												'restaurant_outlet_uuids',
												e as Array<{label: string; value: string}>,
												{shouldValidate: true},
											);
											if (watch('restaurant_outlet_uuids').length === 0) {
												reset({restaurant_outlet_uuids: undefined});
											}
											clearErrors('restaurant_outlet_uuids');
										}}
									/>
								)}
							/>
							{errors && errors?.restaurant_outlet_uuids && (
								<small className="mt-1 block text-m-regular text-red-caution">
									{errors?.restaurant_outlet_uuids &&
										'This field cannot be empty'}
								</small>
							)}
						</aside>

						<aside className="mt-6">
							<div>
								<InputNumeric
									placeholder="0"
									value={watch('price')}
									labelText="Price"
									{...register('price', {
										onChange: () => {
											const priceAfterDiscount =
												+removeFormatRupiah(getValues('price')) -
												(+removeFormatRupiah(getValues('price')) *
													+removeFormatRupiah(
														getValues('price_discount_percentage') || '',
													)) /
													100;

											setValue(
												'price_after_discount',
												priceAfterDiscount.toString(),
												{shouldValidate: true},
											);
											clearErrors('price_after_discount');
										},
										setValueAs: v =>
											formatCurrencyTextInput(v.replace(/\D/, '')),
									})}
									error={!!errors.price}
									helperText={errors.price?.message}
								/>
							</div>
						</aside>

						<aside className="mt-6 grid grid-cols-3 gap-6">
							<div>
								<p className="mb-4">Activate discount</p>
								<Controller
									control={control}
									name="is_discount"
									render={({field: {value}}) => (
										<Toggle
											value={value}
											onChange={() => onToggleActiveDiscount(value)}
										/>
									)}
								/>
							</div>
							<div>
								<Input
									placeholder="0"
									{...register('price_discount_percentage', {
										onChange: e => {
											setValue(
												'price_discount_percentage',
												e.target.value.replace(/\D/, ''),
												{shouldValidate: true},
											);
											const priceAfterDiscount =
												+removeFormatRupiah(getValues('price')) -
												(+removeFormatRupiah(getValues('price')) *
													+removeFormatRupiah(
														getValues('price_discount_percentage') || '',
													)) /
													100;

											setValue(
												'price_after_discount',
												priceAfterDiscount.toString(),
												{shouldValidate: true},
											);
										},
									})}
									labelText="Discount (%)"
									error={!!errors.price_discount_percentage}
									helperText={errors.price_discount_percentage?.message}
									disabled={!watch('is_discount')}
									endAdornment={<p>%</p>}
								/>
							</div>
							<div>
								<InputNumeric
									placeholder="0"
									value={watch('price_after_discount')}
									labelText="Price after discount"
									{...register('price_after_discount')}
									error={!!errors.price_after_discount}
									helperText={errors.price_after_discount?.message}
									disabled
								/>
							</div>
						</aside>

						<aside className="mt-6 grid grid-cols-3 gap-6">
							<div>
								<p className="mb-4">Activate cooking duration</p>
								<Controller
									control={control}
									name="is_active_cooking_duration"
									render={({field: {value}}) => (
										<Toggle
											value={value}
											onChange={() => onToggleActiveCookingDuration(value)}
										/>
									)}
								/>
							</div>
							<div className="col-span-2">
								<Input
									fullwidth
									labelText="Cooking duration (minute)"
									disabled={!watch('is_active_cooking_duration')}
									error={!!errors.cooking_duration}
									helperText={errors.cooking_duration?.message}
									placeholder="0"
									{...register('cooking_duration')}
								/>
							</div>
						</aside>

						<aside className="mt-6 border-b-2 border-b-neutral-30 pb-6">
							<div className="text-l-semibold">View setup</div>
							<aside className="mt-6 grid grid-cols-3 gap-6">
								<div>
									<p className="mb-4">Show product</p>
									<Controller
										control={control}
										name="is_show"
										render={({field: {value}}) => (
											<Toggle
												value={value}
												onChange={() =>
													setValue('is_show', !value, {shouldValidate: true})
												}
											/>
										)}
									/>
								</div>
								<div>
									<p className="mb-4">Product Available</p>
									<Controller
										control={control}
										name="is_available"
										render={({field: {value}}) => (
											<Toggle
												value={value}
												onChange={() =>
													setValue('is_available', !value, {
														shouldValidate: true,
													})
												}
											/>
										)}
									/>
								</div>
								<div>
									<p className="mb-4">Recommendation</p>
									<Controller
										control={control}
										name="is_favourite"
										render={({field: {value}}) => (
											<Toggle
												value={value}
												onChange={() =>
													setValue('is_favourite', !value, {
														shouldValidate: true,
													})
												}
											/>
										)}
									/>
								</div>
							</aside>
						</aside>

						{fields.map((addon, addonIdx) => (
							<aside key={addon.id} className="mt-6">
								<div className="flex items-center justify-between text-l-semibold">
									<p>Add on details</p>

									<CgTrash
										size={20}
										className="hover:opacity-70 cursor-pointer"
										onClick={() => remove(addonIdx)}
									/>
								</div>
								<div className="mt-6">
									<Input
										placeholder="e.g. spicy level"
										labelText="Addon name"
										{...register(`addon.${addonIdx}.addon_name`)}
										error={
											errors?.addon && !!errors?.addon[addonIdx]?.addon_name
										}
										helperText={
											errors?.addon &&
											errors?.addon[addonIdx]?.addon_name?.message
										}
									/>
								</div>
								<aside className="mt-6 grid grid-cols-3 gap-6">
									<div>
										<p className="mb-4">Required</p>
										<Controller
											control={control}
											name={`addon.${addonIdx}.is_optional`}
											render={({field: {value}}) => (
												<Toggle
													value={value}
													onChange={() =>
														setValue(`addon.${addonIdx}.is_optional`, !value, {
															shouldValidate: true,
														})
													}
												/>
											)}
										/>
									</div>
									<div>
										<p className="mb-4">Choose multiple</p>
										<Controller
											control={control}
											name={`addon.${addonIdx}.can_choose_multiple`}
											render={({field: {value}}) => (
												<Toggle
													value={value}
													onChange={() =>
														setValue(
															`addon.${addonIdx}.can_choose_multiple`,
															!value,
															{shouldValidate: true},
														)
													}
												/>
											)}
										/>
									</div>
								</aside>

								<VariantForm addonIdx={addonIdx} />
							</aside>
						))}

						<aside className="mt-6 flex items-center justify-center ">
							<p
								role="presentation"
								onClick={() =>
									append(
										{
											addon_name: '',
											can_choose_multiple: true,
											is_optional: true,
											variants: [
												{
													variant_priority: 0,
													variant_name: '',
													variant_price: '',
												},
											],
										},
										{shouldFocus: false},
									)
								}
								className="cursor-pointer text-l-semibold text-secondary-main hover:opacity-70"
							>
								+ Add addon
							</p>
						</aside>
					</div>
				</FormProvider>
			)}
		</Modal>
	);
};

export default OrganismsFormMasterProduct;
