import PagesCreateNewPassword from '@/view/auth/components/pages/reset-password';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import PlainLayout from '@/view/common/components/templates/layout/plain-layout';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';

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
