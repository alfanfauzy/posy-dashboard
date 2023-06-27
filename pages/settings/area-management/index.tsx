import ViewAreaManagementPage from '@/view/area-management/components/pages';
import {Guard} from '@/view/auth/components/organisms/rbac/Guard';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';

const Page: NextPageWithLayout = () => (
	// <Guard action="read" on="setting_tax_service">
	<>
		<MetaHeader
			title="Posy Resto - Area Management"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewAreaManagementPage />
	</>
	// </Guard>
);

export default Page;
