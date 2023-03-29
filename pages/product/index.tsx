import {SEO} from '@/constants/seo';
import MetaHeader from '@/molecules/meta-header';
import type {NextPageWithLayout} from '@/types/index';
import ViewProductPage from '@/view/product/components/pages';

const Page: NextPageWithLayout = () => (
	<>
		<MetaHeader
			title="Posy Resto - Product"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewProductPage />
	</>
);

export default Page;
