import {mapToOutletProductModel} from '@/data/product/mappers/ProductMapper';
import {GetOutletProductsQueryKey} from '@/data/product/sources/GetOutletProductsQuery';
import {UpdateOutletProduct} from '@/domain/product/repositories/UpdateOutletProductRepository';
import InputNumeric from '@/view/common/components/atoms/input/numeric/InputNumeric';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {removeFormatRupiah} from '@/view/common/utils/UtilsCurrencyFormater';
import {
	validationSchemaProductOutlet,
	ValidationSchemaProductOutletType,
} from '@/view/product/schemas/update-product';
import {useGetOutletProductViewModel} from '@/view/product/view-models/GetOutletProductViewModel';
import {useUpdateOutletProductViewModel} from '@/view/product/view-models/UpdateOutletProductViewModel';
import {useQueryClient} from '@tanstack/react-query';
import Image from 'next/image';
import {Button, Input, Modal, Textarea, Toggle} from 'posy-fnb-core';
import React from 'react';
import {Controller, FormProvider, useFieldArray} from 'react-hook-form';
import {CgTrash} from 'react-icons/cg';

import VariantForm from './VariantForm';

type OrganismsFormEditProductProps = {
	closeEditProduct: () => void;
	isOpenEditProduct: boolean;
};

const OrganismsFormEditProduct = ({
	closeEditProduct,
	isOpenEditProduct,
}: OrganismsFormEditProductProps) => {
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedProductId} = useAppSelector(state => state.product);

	const onCloseEditProduct = () => {
		// dispatch(onChangeProductId(''));
		closeEditProduct();
	};

	const methods = useForm({
		mode: 'onChange',
		schema: validationSchemaProductOutlet,
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
	} = methods;

	const {fields, append, remove} = useFieldArray({
		control,
		name: 'addon',
	});

	const {data: dataProduct, isLoading: loadDataProduct} =
		useGetOutletProductViewModel(
			{
				product_uuid: selectedProductId,
				restaurant_outlet_uuid: outletId,
			},
			{
				onSuccess: data => {
					if (data.message === 'OK' && data.data) {
						const mappedData = mapToOutletProductModel(data.data);
						reset({
							cooking_duration: mappedData.cooking_duration.toString(),
							is_active_cooking_duration: mappedData.cooking_duration > 0,
							is_available: mappedData.is_available,
							is_discount: mappedData.is_discount,
							is_favourite: mappedData.is_favourite,
							is_show: mappedData.is_show,
							price: mappedData.price.toString(),
							price_after_discount: mappedData.price_after_discount.toString(),
							price_discount_percentage:
								mappedData.price_discount_percentage.toString(),
							addon: mappedData?.addons?.map(addon => ({
								addon_name: addon.addon_name,
								is_required: !addon.is_optional,
								can_choose_multiple: addon.can_choose_multiple,
								addon_variants: addon.variants.map(variant => ({
									variant_name: variant.variant_name,
									variant_price: variant?.variant_price
										? variant?.variant_price.toString()
										: '0',
								})),
							})),
						});
						// setValue('price', mappedData.price.toString());
						// setValue('is_discount', mappedData.is_discount);
						// setValue('is_show', mappedData.is_show);
						// setValue('is_available', mappedData.is_available);
						// setValue('is_favourite', mappedData.is_favourite);
						// setValue('is_favourite', mappedData.is_favourite);
						// setValue(
						// 	'cooking_duration',
						// 	mappedData.cooking_duration.toString(),
						// );
						// setValue(
						// 	'is_active_cooking_duration',
						// 	mappedData.cooking_duration > 0,
						// );
						// setValue(
						// 	'price_after_discount',
						// 	mappedData.price_after_discount.toString(),
						// );
						// setValue(
						// 	'price_discount_percentage',
						// 	mappedData.price_discount_percentage.toString(),
						// );
						// if (mappedData?.addons) {
						// 	mappedData?.addons.forEach(addon => {
						// 		append({
						// 			addon_name: addon.addon_name,
						// 			can_choose_multiple: addon.can_choose_multiple,
						// 			is_required: !addon.is_optional,
						// 			addon_variants: addon.variants.map(variant => ({
						// 				variant_name: variant.variant_name,
						// 				variant_price: variant?.variant_price
						// 					? variant?.variant_price.toString()
						// 					: '0',
						// 			})),
						// 		});
						// 	});
						// }
					}
				},
			},
		);

	const {updateOutletProduct, isLoading: loadUpdateProduct} =
		useUpdateOutletProductViewModel({
			onSuccess: _data => {
				const data = _data as UpdateOutletProduct;
				if (data.success) {
					queryClient.invalidateQueries([GetOutletProductsQueryKey]);
					setTimeout(() => {
						onCloseEditProduct();
					}, 500);
				}
			},
		});

	const onToggleActiveDiscount = (value: boolean) => {
		setValue('is_discount', !value);
		// resetField('price_after_discount');
		// resetField('price_discount_percentage');
		setValue('price_after_discount', '');
		setValue('price_discount_percentage', '', {shouldValidate: true});
	};

	const onToggleActiveCookingDuration = (value: boolean) => {
		setValue('is_active_cooking_duration', !value);
		resetField('cooking_duration');
		setValue('cooking_duration', '', {shouldValidate: true});
	};

	const onSubmit = (data: ValidationSchemaProductOutletType) => {
		updateOutletProduct(data, {
			restaurant_outlet_uuid: outletId,
			product_uuid: selectedProductId,
		});
	};

	return (
		<Modal
			isLoading={loadDataProduct}
			className="!p-0 !max-w-[650px]"
			isForm
			handleSubmit={methods.handleSubmit(onSubmit)}
			showCloseButton
			open={isOpenEditProduct}
			handleClose={onCloseEditProduct}
			confirmButton={
				<div className="flex w-full items-center justify-center gap-4">
					<Button
						isLoading={loadUpdateProduct}
						disabled={!isValid}
						variant="secondary"
						type="submit"
						fullWidth
					>
						Save
					</Button>
				</div>
			}
		>
			{dataProduct && (
				<FormProvider {...methods}>
					<div className="px-6 py-4">
						<aside className="flex gap-6">
							<div className="rounded-lg shadow-sm">
								<Image
									src={dataProduct.product_image_url}
									alt={dataProduct.product_name}
									width={142}
									height={142}
								/>
							</div>

							<div className="flex-1">
								<div>
									<Input
										fullwidth
										labelText="Product Name"
										value={dataProduct.product_name}
										disabled
										placeholder="Special Fried Rice"
									/>
								</div>
								<div className="mt-4">
									<Input
										fullwidth
										labelText="Category"
										value={
											dataProduct.categories &&
											dataProduct.categories
												?.map(el => el.category_name)
												.join(', ')
										}
										disabled
										placeholder="Food, Promo"
									/>
								</div>
							</div>
						</aside>

						<aside className="mt-6">
							<Textarea
								labelText="Description"
								value={dataProduct.product_description}
								disabled
								placeholder="This section is for product Fried rice is a dish of cooked rice that has been stir-fried in a wok or a frying pan and is usually mixed with other ingredients such as eggs, vegetables, seafood, or meat."
							/>
						</aside>

						<aside className="mt-6">
							<div>
								<InputNumeric
									placeholder="50.000"
									value={watch('price')}
									labelText="Price"
									{...register('price', {
										onChange: e => {
											setValue('price', e.target.value);
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
											);
										},
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
									placeholder="10"
									{...register('price_discount_percentage', {
										onChange: e => {
											setValue(
												'price_discount_percentage',
												e.target.value.replace(/\D/, ''),
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
									placeholder="45.000"
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
									placeholder="60"
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
												onChange={() => setValue('is_show', !value)}
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
												onChange={() => setValue('is_available', !value)}
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
												onChange={() => setValue('is_favourite', !value)}
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
										placeholder="Spicy level"
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
											name={`addon.${addonIdx}.is_required`}
											render={({field: {value}}) => (
												<Toggle
													value={value}
													onChange={() =>
														setValue(`addon.${addonIdx}.is_required`, !value)
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
											is_required: true,
											addon_variants: [
												{
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

export default OrganismsFormEditProduct;
