import PagesForgetPassword from '@/view/auth/components/pages/forget-password';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import AuthLayout from '@/view/common/components/templates/layout/auth-layout';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';

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
