/* eslint-disable @typescript-eslint/no-unused-vars */
const access = [
	{
		uuid: 'da2733ba-1518-4f7a-ae35-d832d77a7882',
		name: 'Create Restaurant',
		key: 'restaurant:create',
		description: 'Can create a restaurant data',
		is_internal: false,
	},
	{
		uuid: 'da2733ba-1518-4f7a-ae35-1431315153135',
		name: 'Create User',
		key: 'user:create',
		description: 'Can create a user data',
		is_internal: false,
	},
	{
		uuid: 'da2733ba-1518-4f7a-ae35-d832d77a7882',
		name: 'Create Restaurant',
		key: 'restaurant:update',
		description: 'Can update a restaurant data',
		is_internal: false,
	},
	{
		uuid: 'da2733ba-1518-4f7a-ae35-d832d77a7882',
		name: 'Create Restaurant',
		key: 'restaurant:delete',
		description: 'Can update a restaurant data',
		is_internal: false,
	},
	{
		uuid: 'ed3ef9d2-52b8-4453-bf94-0712591f91a5',
		name: 'View Subscription History',
		key: 'subscription:history',
		description: 'Can view list of all subscription history',
		is_internal: false,
	},
	{
		uuid: '8349239e-5d86-4f2f-b1c1-3e5f2207c765',
		name: 'Assign Subscription',
		key: 'subscription:assign',
		description: 'Can assign a subscripton to restaurant',
		is_internal: false,
	},
	{
		uuid: 'd8a3a22e-1df8-4df7-98b7-ee933d935791',
		name: 'Create Subscription',
		key: 'subscription:create',
		description: 'Can create a subscripton data',
		is_internal: false,
	},
	{
		uuid: '21969c15-0481-4162-9407-be4d28a6669f',
		name: 'Delete Subscription',
		key: 'subscription:delete',
		description: 'Can delete a subscripton data',
		is_internal: false,
	},
	{
		uuid: 'e764d3cb-ef52-49a8-95b9-beb72750f462',
		name: 'View Subscription',
		key: 'subscription:read',
		description: 'Can view list of all subscriptions',
		is_internal: false,
	},
	{
		uuid: 'c9b2dcca-6638-4409-bddc-56afe2e240a6',
		name: 'Edit Subscription',
		key: 'subscription:update',
		description: 'Can update a subscripton data',
		is_internal: false,
	},
	{
		uuid: '402d2095-e461-4898-bd87-0b198bdaaf8b',
		name: 'Edit Admin Role',
		key: 'admin:update_role',
		description: 'Can update role of admin',
		is_internal: false,
	},
	{
		uuid: '7478bfdc-6454-411a-b8a2-41e05bfddf48',
		name: 'View Admin List',
		key: 'admin:read',
		description: 'Can view list of all administrator Users',
		is_internal: false,
	},
	{
		uuid: 'df2e4ce7-5b22-479c-a7e1-f09cfa4112c1',
		name: 'Delete Admin',
		key: 'admin:delete',
		description: 'Can delete an Administrator account.',
		is_internal: false,
	},
	{
		uuid: '26ce08be-2e70-4f0a-8c44-fb13a1c795b8',
		name: 'Edit Admin',
		key: 'admin:update',
		description: 'Can promote and demote Administrator Account',
		is_internal: false,
	},
	{
		uuid: '8b7e25d8-5155-4b7a-8630-b079039984fe',
		name: 'Create Admin',
		key: 'admin:create',
		description: 'Can create an administrator account',
		is_internal: false,
	},
	{
		uuid: 'b5f9f26d-f145-4b30-8198-97f5714ec07b',
		name: 'Subscription Report',
		key: 'report:subscription',
		description: 'Can view subscription history report',
		is_internal: false,
	},
	{
		uuid: '32bc6fde-5e46-40f8-94a8-a6c1e42d5d2f',
		name: 'Transaction Report',
		key: 'report:transaction',
		description: 'Can view transaction history report',
		is_internal: false,
	},
	{
		uuid: 'a724096d-ea34-460f-9e42-4bb2509df3e1',
		name: 'Create Role',
		key: 'role:create',
		description: 'Can create a role data',
		is_internal: false,
	},
	{
		uuid: 'e015f77e-a8c3-4c3a-b793-f81412840df6',
		name: 'Edit Role',
		key: 'role:update',
		description: 'Can edit a role data',
		is_internal: false,
	},
	{
		uuid: '4577344b-15f0-432e-b240-597e273f06fb',
		name: 'Delete Role',
		key: 'role:delete',
		description: 'Can delete a role data',
		is_internal: false,
	},
	{
		uuid: '0d0cbc0a-a0bc-485e-bb62-513f38f6e0f9',
		name: 'View Role',
		key: 'role:read',
		description: 'Can view list of all role data',
		is_internal: false,
	},
	{
		uuid: '827fa2f8-d9d5-4af6-b20b-ac1dd2845077',
		name: 'Switch Status Product Outlet',
		key: 'product_outlet:switch_status',
		description:
			'Can switch a status (active or available) product outlet data',
		is_internal: false,
	},
	{
		uuid: 'b9730bfb-fa63-4e2d-b4b8-36dd60080567',
		name: 'Edit Product Outlet',
		key: 'product_outlet:update',
		description: 'Can edit a product outlet data',
		is_internal: false,
	},
	{
		uuid: '016f4e95-97c1-43bb-8249-0dd6b65594c7',
		name: 'View Product Outlet',
		key: 'product_outlet:read',
		description: 'Can view list of all product outlet data',
		is_internal: false,
	},
	{
		uuid: 'ad83b4a0-bd56-4e2c-8369-f77beec51be7',
		name: 'View Product',
		key: 'product:read',
		description: 'Can view list of all product data',
		is_internal: false,
	},
	{
		uuid: '009c1b0b-e1a5-4af9-8a8d-f0e4b0a31b56',
		name: 'Delete Product',
		key: 'product:delete',
		description: 'Can delete a product data',
		is_internal: false,
	},
	{
		uuid: '37361975-a0e2-4bad-8237-f28449327d75',
		name: 'Create Product',
		key: 'product:create',
		description: 'Can create a product data',
		is_internal: false,
	},
	{
		uuid: '58e7227e-7b84-433b-b2d0-4a391aeff675',
		name: 'Edit Product',
		key: 'product:update',
		description: 'Can edit a product data',
		is_internal: false,
	},
	{
		uuid: 'acc91958-28e9-4841-9118-a3e588a5315e',
		name: 'Delete Outlet',
		key: 'restaurant_outlet:delete',
		description: 'Can delete an outlet data',
		is_internal: false,
	},
	{
		uuid: 'd5f6eb3f-8881-4e6a-a1ed-ad446f7397a3',
		name: 'Edit Outlet',
		key: 'restaurant_outlet:update',
		description: 'Can edit an outlet data',
		is_internal: false,
	},
	{
		uuid: '0abc0337-bf03-4ae3-9c6b-09587e336850',
		name: 'Create Outlet',
		key: 'restaurant_outlet:create',
		description: 'Can create an outlet data',
		is_internal: false,
	},
	{
		uuid: '9d0a9c78-5012-48fb-b04a-42d0c8482c3d',
		name: 'View Outlet',
		key: 'restaurant_outlet:read',
		description: 'Can view list of all outlet data',
		is_internal: false,
	},
	{
		uuid: '1fb1b92a-a477-4c1c-9198-90165fb41544',
		name: 'View Restaurant',
		key: 'restaurant:read',
		description: 'Can view list of all restaurant data',
		is_internal: false,
	},
	{
		uuid: 'fbd2c3bf-74e4-4083-a9cf-c296a19c855c',
		name: 'Delete Restaurant',
		key: 'restaurant:delete',
		description: 'Can delete a restaurant data',
		is_internal: false,
	},
	{
		uuid: '19c7dbfb-1e9a-4b90-89be-79e37705856b',
		name: 'Edit Restaurant',
		key: 'restaurant:update',
		description: 'Can update a restaurant data',
		is_internal: false,
	},
];

const result = access.reduce((acc, curr) => {
	const [subject, action] = curr.key.split(':');
	const existingItem = acc.find(item => item.actions === action);
	if (existingItem) {
		if (Array.isArray(existingItem.subject)) {
			existingItem.subject.push(subject);
		} else {
			existingItem.subject = [existingItem.subject, subject];
		}
	} else {
		acc.push({
			actions: action,
			subject,
		});
	}
	return acc;
}, []);
