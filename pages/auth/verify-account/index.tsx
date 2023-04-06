import {SEO} from '@/constants/seo';
import MetaHeader from '@/molecules/meta-header';
import AuthLayout from '@/templates/layout/auth-layout';
import type {NextPageWithLayout} from '@/types/index';
import PagesVerifyAccount from '@/view/auth/components/pages/verify-account';

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
