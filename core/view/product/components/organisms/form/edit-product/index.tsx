/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-imports */
import {useForm} from '@/hooks/useForm';
import {useAppDispatch} from '@/store/hooks';
import {onChangeProductId} from '@/store/slices/product';
import {validationSchemaProduct} from '@/view/product/schemas/update-product';
import Image from 'next/image';
import {Button, Input, Modal, Textarea, Toggle} from 'posy-fnb-core';
import React from 'react';
import {FormProvider, useFieldArray} from 'react-hook-form';

import VariantTemp from '../../../pages/VariantTemp';

type OrganismsFormEditProductProps = {
	closeEditProduct: () => void;
	isOpenEditProduct: boolean;
};

const OrganismsFormEditProduct = ({
	closeEditProduct,
	isOpenEditProduct,
}: OrganismsFormEditProductProps) => {
	const dispatch = useAppDispatch();
	const methods = useForm({schema: validationSchemaProduct});
	const {
		control,
		formState: {errors},
	} = methods;

	const {register} = methods;

	const {fields, append} = useFieldArray({
		control,
		name: 'addon',
	});

	const onCloseEditProduct = () => {
		closeEditProduct();
		dispatch(onChangeProductId(''));
	};

	const onSubmit = () => {
		// console.log(e, 'data')
	};
	return (
		<Modal
			className="!p-0"
			isForm
			handleSubmit={methods.handleSubmit(onSubmit)}
			showCloseButton
			open={isOpenEditProduct}
			handleClose={onCloseEditProduct}
			confirmButton={
				<div className="flex w-full items-center justify-center gap-4">
					<Button variant="secondary" type="submit" fullWidth>
						Savessss
					</Button>
				</div>
			}
		>
			<FormProvider {...methods}>
				<div className="px-6 py-4">
					<aside className="flex gap-6">
						<div>
							<Image
								src="/images/logo.png"
								alt="product image"
								width={142}
								height={142}
							/>
						</div>

						<div className="flex-1">
							<div>
								<Input
									fullwidth
									labelText="Product Name"
									{...register('product_name')}
									error={!!errors?.product_name}
									helperText={errors?.product_name?.message}
								/>
							</div>
							<div className="mt-4">
								<Input fullwidth labelText="Category" />
							</div>
						</div>
					</aside>
					<aside className="mt-6">
						<div>
							<Input labelText="Price" />
						</div>
					</aside>

					<aside className="mt-6 grid grid-cols-3 gap-6">
						<div>
							<p className="mb-4">Activate Discount</p>
							<Toggle value onChange={() => undefined} />
						</div>
						<div>
							<Input labelText="Discount (%)" />
						</div>
						<div>
							<Input labelText="Price after discount" />
						</div>
					</aside>

					<aside className="mt-6">
						<Textarea labelText="Description" />
					</aside>

					<aside className="mt-6 border-b-2 border-b-neutral-30 pb-6">
						<div className="text-l-semibold">View setup</div>
						<aside className="mt-6 grid grid-cols-3 gap-6">
							<div>
								<p className="mb-4">Activate Discount</p>
								<Toggle value onChange={() => undefined} />
							</div>
							<div>
								<p className="mb-4">Product Available</p>
								<Toggle value onChange={() => undefined} />
							</div>
							<div>
								<p className="mb-4">Recommendation</p>
								<Toggle value onChange={() => undefined} />
							</div>
						</aside>
					</aside>

					{/* {product.addon?.map((addon, addonIdx) => ( */}
					{fields.map((addon, addonIdx) => (
						<aside key={addon.id} className="mt-6">
							<div className="flex items-center justify-between text-l-semibold">
								Add on details
								{/* <CgTrash
  className="cursor-pointer text-neutral-70"
  size={20}
  onClick={handleDeleteAddOn}
/> */}
							</div>
							<div className="mt-6">
								<Input
									labelText="Addon name"
									{...register(`addon.${addonIdx}.addon_name`)}
									error={errors?.addon && !!errors?.addon[addonIdx]?.addon_name}
									helperText={
										errors?.addon &&
										errors?.addon[addonIdx]?.addon_name?.message
									}
								/>
							</div>
							<aside className="mt-6 grid grid-cols-3 gap-6">
								<div>
									<p className="mb-4">Required</p>
									<Toggle value onChange={() => undefined} />
								</div>
								<div>
									<p className="mb-4">Choose multiple</p>
									<Toggle value onChange={() => undefined} />
								</div>
							</aside>

							<VariantTemp addonIdx={addonIdx} />
						</aside>
					))}

					<aside className="mt-6 flex items-center justify-center ">
						<p
							role="presentation"
							// onClick={handleAddAddOn}
							onClick={() =>
								append({
									addon_name: '',
									addon_variants: [
										{
											variant_name: '',
											variant_price: '',
										},
									],
								})
							}
							className="cursor-pointer text-l-semibold text-secondary-main hover:opacity-70"
						>
							+ Add addon
						</p>
					</aside>
				</div>
			</FormProvider>
		</Modal>
	);
};

export default OrganismsFormEditProduct;
