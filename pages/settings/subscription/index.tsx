import {Guard} from '@/view/auth/components/organisms/rbac/Guard';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import ViewSubscriptionPage from '@/view/subscription/components/pages';

const Page = () => (
	<Guard action="read" on="setting_subscription">
		<MetaHeader
			title="Posy Resto - General Settings"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewSubscriptionPage />
	</Guard>
);

export default Page;
