import {InputVariables} from '@/domain/vo/BaseInput';
import {Metadata} from '@/domain/vo/BaseMetadata';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {PaymentMethods, PaymentMethod} from '../model';

export type GetPaymentMethodsInput = InputVariables<
	keyof Metadata,
	keyof Pick<PaymentMethod, 'name'>
> & {payment_method_category_uuid: string};

export type GetPaymentMethodsResult = ResultQuery<
	PaymentMethods | undefined
> & {
	pagination: Pagination | undefined;
};
