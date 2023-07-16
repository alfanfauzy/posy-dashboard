import {Ratings} from '@/domain/rating/model';
import {Reviews} from '@/domain/rating/model/review';

import {GetDetailRatingsDataResponse} from '../types/GetDetailRatingsType';
import {GetTransactionRatingsDataResponse} from '../types/GetTransactionRatingsType';

export const mapToTransactionRatingsModel = (
	datas: Array<GetTransactionRatingsDataResponse>,
): Ratings =>
	datas.map(data => ({
		uuid: data.uuid,
		avg_rating: data.avg_rating,
		is_show: data.is_show,
		rating: data.rating,
		restaurant_outlet_uuid: data.restaurant_outlet_uuid,
		review: data.review,
		review_note: data.review_note,
		transaction_uuid: data.transaction_uuid,
		customer_info: data.customer_info,
		metadata: {
			created_at: data.metadata.created_at.seconds,
		},
	}));

export const mapToDetailRatingsModel = (
	datas: Array<GetDetailRatingsDataResponse>,
): Reviews =>
	datas.map(data => ({
		uuid: data.uuid,
		food_rating_uuid: data.food_rating_uuid,
		product_name: data.product_name,
		product_uuid: data.product_uuid,
		rating: data.rating,
		review: data.review,
		addon_information: data.addon_information,
	}));
