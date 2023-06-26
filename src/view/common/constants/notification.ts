export const listNotificationTabs: Array<{
	label: string;
	value: number;
	key: 'transaction' | 'inbox';
}> = [
	{label: 'Transaction', value: 0, key: 'transaction'},
	{label: 'Inbox', value: 1, key: 'inbox'},
];
