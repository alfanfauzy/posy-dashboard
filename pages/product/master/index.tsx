import {Guard} from '@/view/auth/components/organisms/rbac/Guard';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';
import ViewMasterProductPage from '@/view/product/components/pages/master';

const Page: NextPageWithLayout = () => (
	<Guard action="read" on="product">
		<MetaHeader
			title="Posy Resto - Product Master"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewMasterProductPage />
	</Guard>
);

export default Page;
