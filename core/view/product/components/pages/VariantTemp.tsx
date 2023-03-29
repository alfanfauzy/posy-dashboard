/* eslint-disable react/jsx-props-no-spreading */
import {ValidationSchemaProductType} from '@/view/product/schemas/update-product';
import {Button, Input} from 'posy-fnb-core';
import React from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';

type VariantTempProps = {
	addonIdx: number;
};

const VariantTemp = ({addonIdx}: VariantTempProps) => {
	const {
		control,
		register,
		formState: {errors},
	} = useFormContext<ValidationSchemaProductType>();

	const {fields, append} = useFieldArray({
		control,
		name: `addon.${addonIdx}.addon_variants`,
	});

	return (
		<div>
			{fields.map((variant, variantIdx) => (
				<aside key={variant.id} className="mt-6 flex w-full items-center gap-6">
					<div className="w-1/2">
						<Input
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
						<Input
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
				</aside>
			))}
			<div className="mt-5 flex justify-end">
				<Button
					variant="secondary"
					size="xs"
					//   onClick={() => handleAddAddOnVariant(addonIdx)}
					onClick={() =>
						append({
							variant_name: '',
							variant_price: '',
						})
					}
				>
					Add variant
				</Button>
			</div>
		</div>
	);
};

export default VariantTemp;
