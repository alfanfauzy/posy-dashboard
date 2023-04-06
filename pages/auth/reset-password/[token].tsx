import {SEO} from '@/constants/seo';
import MetaHeader from '@/molecules/meta-header';
import PlainLayout from '@/templates/layout/plain-layout';
import type {NextPageWithLayout} from '@/types/index';
import PagesCreateNewPassword from '@/view/auth/components/pages/reset-password';

const Page: NextPageWithLayout = () => (
	<>
		<MetaHeader
			title="Posy Resto - Create New Password"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<PagesCreateNewPassword />
	</>
);

Page.getLayout = page => <PlainLayout>{page}</PlainLayout>;

export default Page;
