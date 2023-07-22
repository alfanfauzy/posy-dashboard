import {Order, OrderDetail} from '@/domain/order/model';
import {generateStatusOrderDetail} from '@/view/common/utils/UtilsGenerateOrderStatus';
import {CancelOptions} from '@/view/transaction/constants';
import {ValidationSchemaCancelOrderType} from '@/view/transaction/schemas/cancel-order';
import {Checkbox, Divider, Select} from 'antd';
import {Textarea} from 'posy-fnb-core';
import React from 'react';
import {Controller, useFieldArray, useFormContext} from 'react-hook-form';

type CancelDetailOrderProps = {
	detail: OrderDetail;
	order: Order;
	idx: number;
	detailIdx: number;
	dataLength: number;
};

const CancelDetailOrder = ({
	detail,
	detailIdx,
	idx,
	dataLength,
	order,
}: CancelDetailOrderProps) => {
	const {control, getValues, setValue} =
		useFormContext<ValidationSchemaCancelOrderType>();

	const {update} = useFieldArray({
		control,
		name: `order.${idx}.order_detail`,
	});

	return (
		<div key={detail.uuid}>
			<div className="flex justify-between items-center bg-neutral-10 px-4 py-4 rounded-b-md">
				<div className="flex-1">
					<Controller
						control={control}
						name={`order.${idx}.order_detail.${detailIdx}.uuid`}
						render={() => (
							<Checkbox
								checked={
									getValues(`order.${idx}.order_detail.${detailIdx}.uuid`) ===
									detail.uuid
								}
								onChange={() => {
									if (
										getValues(`order.${idx}.order_detail`)?.some(
											el => el.uuid === detail.uuid,
										)
									) {
										setValue(`order.${idx}.uuid`, '');
										setValue(`order.${idx}.cancel_reason_order`, '');
										setValue(`order.${idx}.order_detail.${detailIdx}.uuid`, '');
										setValue(
											`order.${idx}.order_detail.${detailIdx}.cancel_reason_status`,
											'',
										);
										setValue(
											`order.${idx}.order_detail.${detailIdx}.cancel_reason_other`,
											'',
										);
									} else {
										update(detailIdx, {
											uuid: detail.uuid,
											cancel_reason_status: CancelOptions[0].value,
											cancel_reason_other: '',
										});
										setValue(`order.${idx}.uuid`, order.uuid);
									}
								}}
								className="w-full"
							>
								<p className="text-m-regular">
									{detail.product_name} x{detail.qty}
								</p>
								<div className="mt-1 text-m-medium flex gap-2">
									Current status
									{generateStatusOrderDetail(detail.status)}
								</div>
							</Checkbox>
						)}
					/>
				</div>
				<div className="w-60">
					<Select
						className="w-full"
						placeholder="Select reason"
						options={CancelOptions}
						value={getValues(
							`order.${idx}.order_detail.${detailIdx}.cancel_reason_status`,
						)}
						onChange={e => {
							if (e !== 'OTHERS') {
								setValue(
									`order.${idx}.order_detail.${detailIdx}.cancel_reason_other`,
									'',
								);
							}
							setValue(`order.${idx}.uuid`, order.uuid);
							setValue(
								`order.${idx}.order_detail.${detailIdx}.uuid`,
								detail.uuid,
								{
									shouldValidate: true,
								},
							);
							setValue(
								`order.${idx}.order_detail.${detailIdx}.cancel_reason_status`,
								e,
								{
									shouldValidate: true,
								},
							);
						}}
					/>
				</div>
			</div>
			{getValues(
				`order.${idx}.order_detail.${detailIdx}.cancel_reason_status`,
			) === 'OTHERS' && (
				<div className="px-4 pb-4">
					<Textarea
						labelText="Reason"
						value={getValues(
							`order.${idx}.order_detail.${detailIdx}.cancel_reason_other`,
						)}
						onChange={e => {
							setValue(
								`order.${idx}.order_detail.${detailIdx}.cancel_reason_other`,
								e.target.value,
								{
									shouldValidate: true,
								},
							);
						}}
					/>
				</div>
			)}
			{detailIdx !== dataLength - 1 && (
				<div className="px-4">
					<Divider className="my-0" />
				</div>
			)}
		</div>
	);
};

export default CancelDetailOrder;
