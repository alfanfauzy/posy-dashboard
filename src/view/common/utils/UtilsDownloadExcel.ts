export const DownloadFile = (data: any, fileName = 'excel') => {
	const url = window.URL.createObjectURL(new Blob([data]));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `${fileName}.xlsx`);
	document.body.appendChild(link);
	link.click();
	link.remove();
};
