import {Guard} from '@/view/auth/components/organisms/rbac/Guard';
import ViewCategoryProductPage from '@/view/category/components/pages';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';

const Page: NextPageWithLayout = () => (
	<Guard action="read" on="product_category">
		<MetaHeader
			title="Posy Resto - Product Category"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewCategoryProductPage />
	</Guard>
);

export default Page;
