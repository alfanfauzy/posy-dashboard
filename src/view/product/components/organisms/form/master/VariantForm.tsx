/* eslint-disable react/jsx-props-no-spreading */
import InputNumeric from '@/view/common/components/atoms/input/numeric/InputNumeric';
import {ValidationSchemaProductOutletType} from '@/view/product/schemas/update-product';
import {Button, Input} from 'posy-fnb-core';
import React from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {CgTrash} from 'react-icons/cg';

type VariantTempProps = {
	addonIdx: number;
};

const VariantTemp = ({addonIdx}: VariantTempProps) => {
	const {
		control,
		register,
		watch,
		formState: {errors},
	} = useFormContext<ValidationSchemaProductOutletType>();

	const {fields, append, remove} = useFieldArray({
		control,
		name: `addon.${addonIdx}.addon_variants`,
	});

	return (
		<div>
			{fields.map((variant, variantIdx) => (
				<aside key={variant.id} className="mt-6 flex w-full items-center gap-6">
					<div className="w-1/2">
						<Input
							placeholder="Level 0"
							fullwidth
							labelText="Variant name"
							{...register(
								`addon.${addonIdx}.addon_variants.${variantIdx}.variant_name`,
							)}
							error={
								!!errors.addon?.[addonIdx]?.addon_variants?.[variantIdx]
									?.variant_name
							}
							helperText={
								errors.addon?.[addonIdx]?.addon_variants?.[variantIdx]
									?.variant_name?.message
							}
						/>
					</div>
					<div className="w-1/2">
						<InputNumeric
							placeholder="0"
							value={watch(
								`addon.${addonIdx}.addon_variants.${variantIdx}.variant_price`,
							)}
							labelText="Set price"
							{...register(
								`addon.${addonIdx}.addon_variants.${variantIdx}.variant_price`,
							)}
							error={
								!!errors.addon?.[addonIdx]?.addon_variants?.[variantIdx]
									?.variant_price
							}
							helperText={
								errors.addon?.[addonIdx]?.addon_variants?.[variantIdx]
									?.variant_price?.message
							}
						/>
					</div>
					<CgTrash
						size={20}
						className="mt-5 hover:opacity-70 cursor-pointer"
						onClick={() => remove(addonIdx)}
					/>
				</aside>
			))}
			<div className="mt-5 flex justify-end">
				<Button
					variant="secondary"
					size="xs"
					onClick={() =>
						append(
							{
								variant_name: '',
								variant_price: '',
							},
							{
								shouldFocus: false,
							},
						)
					}
				>
					Add variant
				</Button>
			</div>
		</div>
	);
};

export default VariantTemp;
