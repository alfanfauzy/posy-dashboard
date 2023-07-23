export const requestFullScreen = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const element: any = document.body;

	const requestMethod =
		element.requestFullscreen ||
		element.webkitRequestFullScreen ||
		element.mozRequestFullScreen ||
		element.msRequestFullScreen;

	if (requestMethod) {
		requestMethod?.call(element);
	}
};
