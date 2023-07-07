import Image from 'next/image';
import React from 'react';

type AtomImagesProps = {
	width: number;
	height: number;
	url: string;
	alt: string;
	onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const noImage = require('/public/images/empty-image-product.png');

const AtomImages = ({
	width,
	height,
	url,
	alt,
	onChangeImage,
}: AtomImagesProps) => {
	const imageSource = url === '' ? noImage : url;

	return (
		<div>
			<Image
				src={imageSource}
				width={width}
				height={height}
				className="rounded-tl-lg rounded-tr-lg border object-cover object-center"
				alt={alt}
			/>
			<button
				className="w-full flex justify-center bg-primary-main text-s-regular text-center text-white rounded-bl-lg rounded-br-lg p-2"
				type="button"
			>
				Change Photo
				<input
					onChange={e => onChangeImage(e)}
					accept="image/png, image/jpeg,"
					type="file"
					className="absolute h-fit w-[192px] cursor-pointer opacity-0"
				/>
			</button>
		</div>
	);
};

export default AtomImages;
