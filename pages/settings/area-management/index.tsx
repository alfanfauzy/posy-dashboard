import ViewAreaManagementPage from '@/view/area-management/components/pages';
import {Guard} from '@/view/auth/components/organisms/rbac/Guard';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';
import React from 'react';
import ReactGA from 'react-ga4';

const Page: NextPageWithLayout = () => {
	React.useEffect(() => {
		ReactGA.event({
			category: 'area_management',
			action: 'area_management_view',
			label: 'area_management_view',
		});
	}, []);

	return (
		<Guard action="view" on="area_management">
			<MetaHeader
				title="Posy Resto - Area Management"
				description={SEO.description}
				keywords={SEO.keywords}
				image={SEO.image}
			/>
			<ViewAreaManagementPage />
		</Guard>
	);
};

export default Page;
