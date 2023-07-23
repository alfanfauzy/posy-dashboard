import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

import {CreateProductInput} from './CreateMenuProductRepository';

export type UpdateProductInput = {
	productId: string;
	payload: CreateProductInput;
};

export type UpdateProductResponse = {uuid: string; metadata: Metadata};

export type UpdateProductResult = ResultMutation<null | undefined>;

export type UpdateProductRepository = {
	updateProduct(input: UpdateProductInput): void;
} & UpdateProductResult;
