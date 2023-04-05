export type CreatedAt = {
	seconds: number;
	nanos?: number;
};

export type UpdatedAt = {
	seconds: number;
	nanos: number;
};

export type CancelAt = {
	seconds: number;
	nanos: number;
};

export type FirstOrderAt = {
	seconds: number;
	nanos: number;
};

export type PaidAt = {
	seconds: number;
	nanos: number;
};

export type Metadata = {
	created_at: CreatedAt;
	updated_at: UpdatedAt;
	cancel_at: CancelAt;
};
