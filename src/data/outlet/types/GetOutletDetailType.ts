export type GetOutletDetailResponse = {
	outlet: {
		uuid: string;
		restaurant_uuid: string;
		restaurant_code: string;
		restaurant_name: string;
		restaurant_email: string;
		outlet_name: string;
		outlet_code: string;
		region: {
			province_id: string;
			province_name: string;
			city_id: string;
			city_name: string;
			district_id: string;
			district_name: string;
			subdistrict_id: string;
			subdistrict_name: string;
			postal_code: string;
		};
		address: string;
		latitude: string;
		longitude: string;
		phone: string;
		email: string;
		logo_image_url: string;
		metadata: {
			created_at: {
				seconds: number;
				nanos: number;
			};
			updated_at: {
				seconds: number;
				nanos: number;
			};
		};
	};
};
