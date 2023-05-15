import {Guard} from '@/view/auth/components/organisms/rbac/Guard';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';
import ViewTaxAndServicePage from '@/view/tax-and-service/components/pages';

const Page: NextPageWithLayout = () => (
	<Guard action="read" on="setting_tax_service">
		<MetaHeader
			title="Posy Resto - Tax and Service"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewTaxAndServicePage />
	</Guard>
);

export default Page;
