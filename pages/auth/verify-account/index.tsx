import PagesVerifyAccount from '@/view/auth/components/pages/verify-account';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import AuthLayout from '@/view/common/components/templates/layout/auth-layout';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';

const Page: NextPageWithLayout = () => (
	<>
		<MetaHeader
			title="Posy Resto - Verify Account"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<PagesVerifyAccount />
	</>
);

Page.getLayout = page => <AuthLayout>{page}</AuthLayout>;

export default Page;
