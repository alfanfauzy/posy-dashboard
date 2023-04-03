import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';
import {ValidationSchemaApplyDiscountType} from '@/view/transaction/schemas/apply-discount';

export type CreateApplyDiscountInput = {
	transaction_uuid: string;
	restaurant_outlet_uuid: string;
	discount_percentage: number;
};

export type CreateApplyDiscountBasedInput = {
	restaurant_outlet_uuid: string;
	transaction_uuid: string;
};

export type CreateApplyDiscountResult = ResultMutation<
	{uuid: string; metadata: Metadata} | undefined
>;

export type CreateApplyDiscountRepository = {
	createApplyDiscount(
		input: ValidationSchemaApplyDiscountType & CreateApplyDiscountBasedInput,
	): void;
} & CreateApplyDiscountResult;
