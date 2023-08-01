export const playAudio = (play: () => void) => {
	const button = document.createElement('button');
	button.addEventListener('click', play);
	button.click();
};
