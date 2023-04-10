import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import ViewSubscriptionPage from '@/view/subscription/components/pages';

const Page = () => (
	<>
		<MetaHeader
			title="Posy Resto - Subscription"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewSubscriptionPage />
	</>
);

export default Page;
