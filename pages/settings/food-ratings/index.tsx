import {Guard} from '@/view/auth/components/organisms/rbac/Guard';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import ViewRatingPage from '@/view/rating/components/pages';

const Page = () => (
	<Guard action="read" on="setting_subscription">
		<MetaHeader
			title="Posy Resto - Food Ratings"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewRatingPage />
	</Guard>
);

export default Page;
