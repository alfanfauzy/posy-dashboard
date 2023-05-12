type UserRole = 'OWNER' | 'MANAGER' | 'CASHIER' | 'WAITRESS' | undefined;

export type Role = {
	name: UserRole;
	uuid: string;
};
