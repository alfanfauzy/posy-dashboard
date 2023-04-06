import {SEO} from '@/constants/seo';
import MetaHeader from '@/molecules/meta-header';
import AuthLayout from '@/templates/layout/auth-layout';
import type {NextPageWithLayout} from '@/types/index';
import PagesForgetPassword from '@/view/auth/components/pages/forget-password';

const Page: NextPageWithLayout = () => (
	<>
		<MetaHeader
			title="Posy Resto - Forgot Password"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<PagesForgetPassword />
	</>
);

Page.getLayout = page => <AuthLayout>{page}</AuthLayout>;

export default Page;
