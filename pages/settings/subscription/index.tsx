import {SEO} from '@/constants/seo';
import MetaHeader from '@/molecules/meta-header';
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
