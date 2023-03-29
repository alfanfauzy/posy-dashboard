import {
	mapToTaxModel,
	mapToUpdateTaxPayload,
} from '@/data/tax/mappers/TaxMapper';
import {useForm} from '@/hooks/useForm';
import {useAppSelector} from '@/store/hooks';
import {Skeleton} from 'antd';
import {
	validationSchemaUpdateTax,
	type ValidationSchemaUpdateTaxType,
} from 'core/view/tax-and-service/schemas/UpdateTaxSchema';
import {useGetTaxViewModel} from 'core/view/tax-and-service/view-models/GetTaxViewModel';
import {useUpdateTaxViewModel} from 'core/view/tax-and-service/view-models/UpdateTaxViewModel';
import {Button, Input, Toggle} from 'posy-fnb-core';
import React, {useEffect} from 'react';
import {Controller} from 'react-hook-form';
import * as reactHookForm from 'react-hook-form';

const ViewTaxAndServicePage = () => {
	const {outletId} = useAppSelector(state => state.auth);

	const {
		register,
		control,
		formState: {errors, isValid},
		watch,
		handleSubmit,
		setValue,
	} = useForm({
		mode: 'onChange',
		schema: validationSchemaUpdateTax,
		defaultValues: {
			tax_type: 'TAX_AFTER_DISCOUNT',
			is_service_charge_taxable: true,
		},
	});

	const {data, isLoading: loadData} = useGetTaxViewModel(
		{
			restaurant_outlet_uuid: outletId,
		},
		{
			onSuccess: data => {
				const mappedData = mapToTaxModel(data.data);
				setValue('is_service_charge', mappedData.is_service_charge);
				setValue('is_tax', mappedData.is_tax);
				setValue('tax_percentage', mappedData.tax_percentage.toString());
				setValue(
					'service_charge_percentage',
					mappedData.service_charge_percentage.toString(),
				);
			},
		},
	);

	const {updateTax, isLoading: loadUpdateTax} = useUpdateTaxViewModel();

	const onSubmit: reactHookForm.SubmitHandler<
		ValidationSchemaUpdateTaxType
	> = form => {
		const mappedForm = mapToUpdateTaxPayload(form);
		updateTax(mappedForm);
	};

	useEffect(() => {
		setValue('restaurant_outlet_uuid', outletId);
	}, [outletId]);

	return (
		<main className="flex h-full gap-4 overflow-hidden">
			<section className="relative h-full flex-1 overflow-hidden rounded-2xl bg-neutral-10 p-6">
				<aside className="flex items-start justify-between">
					<p className="text-xxl-semibold text-primary-main lg:text-heading-s-semibold">
						Tax & service
					</p>
				</aside>

				<section className="mt-6 rounded-3xl border border-neutral-30 p-6 lg:w-3/5">
					{loadData && (
						<div className="flex gap-4">
							<Skeleton paragraph={{rows: 10}} />
							<Skeleton paragraph={{rows: 10}} />
						</div>
					)}
					{data && (
						<form onSubmit={handleSubmit(onSubmit)}>
							<article className="flex gap-6">
								<aside className="w-1/2 rounded-3xl border border-neutral-30 p-6">
									<p className="text-l-semibold">Tax Settings</p>
									<div className="mt-3 border border-neutral-30" />
									<div className="mt-3 flex  items-center justify-between">
										<p>Tax (PB1)</p>
										<Controller
											control={control}
											name="is_tax"
											render={({field: {value}}) => (
												<Toggle
													onChange={() => setValue('is_tax', !value)}
													value={value}
												/>
											)}
										/>
									</div>
									<div className="mt-3">
										<Input
											size="m"
											labelText="Input amount"
											helperText="Some restaurants may be subject to custom tax percentages that vary depending on their location and other factors."
											disabled={!watch('is_tax')}
											{...register('tax_percentage')}
											error={!!errors.tax_percentage}
										/>
									</div>
								</aside>

								<aside className="w-1/2 rounded-3xl border border-neutral-30 p-6">
									<p className="text-l-semibold">Charge Settings</p>
									<div className="mt-3 border border-neutral-30" />
									<div className="mt-3 flex  items-center justify-between">
										<p>Service charge</p>
										<Controller
											control={control}
											name="is_service_charge"
											render={({field: {value}}) => (
												<Toggle
													onChange={() => setValue('is_service_charge', !value)}
													value={value}
												/>
											)}
										/>
									</div>
									<div className="mt-3">
										<Input
											size="m"
											labelText="Input amount"
											helperText="Some restaurants may be subject to custom service percentages that vary depending on their location and other factors."
											{...register('service_charge_percentage')}
											error={!!errors.service_charge_percentage}
											disabled={!watch('is_service_charge')}
										/>
									</div>
								</aside>
							</article>
							<aside className="mt-20 flex justify-end gap-4">
								<Button variant="secondary" size="m">
									Discard
								</Button>
								<Button
									type="submit"
									disabled={!isValid}
									isLoading={loadUpdateTax}
									variant="primary"
									size="m"
								>
									Save Changes
								</Button>
							</aside>
						</form>
					)}
				</section>
			</section>
		</main>
	);
};

export default ViewTaxAndServicePage;
