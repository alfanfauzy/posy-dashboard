import {useRouter} from 'next/router';
import React, {useEffect} from 'react';

const Page = () => {
	const router = useRouter();

	useEffect(() => {
		router.push('/transaction');
	}, [router]);

	return <div />;
};

export default Page;
