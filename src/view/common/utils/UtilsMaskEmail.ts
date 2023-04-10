export const maskEmail = (email: string) => {
	if (!email?.includes('@')) {
		return email;
	}

	const parts = email.split('@');
	const [username, domain] = parts;

	const maskedUsername =
		username.charAt(0) +
		'*'.repeat(username.length - 2) +
		username.charAt(username.length - 1);

	return maskedUsername + '@' + domain;
};
