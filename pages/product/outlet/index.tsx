import {Guard} from '@/view/auth/components/organisms/rbac/Guard';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';
import ViewProductPage from '@/view/product/components/pages/outlet';

const Page: NextPageWithLayout = () => (
	<Guard action="read" on="product_outlet">
		<MetaHeader
			title="Posy Resto - Product"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewProductPage />
	</Guard>
);

export default Page;
