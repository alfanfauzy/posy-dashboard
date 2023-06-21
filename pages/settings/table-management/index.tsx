import {Guard} from '@/view/auth/components/organisms/rbac/Guard';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';
import ViewTableManagementPage from '@/view/table-management/components/pages';

const Page: NextPageWithLayout = () => (
	// <Guard action="read" on="setting_tax_service">
	<>
		<MetaHeader
			title="Posy Resto - Table Management"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewTableManagementPage />
	</>
	// </Guard>
);

export default Page;
