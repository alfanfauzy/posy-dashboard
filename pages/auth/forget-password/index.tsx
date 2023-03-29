import {SEO} from '@/constants/seo';
import ContainerForgetPassword from '@/containers/auth/forget-password';
import MetaHeader from '@/molecules/meta-header';
import AuthLayout from '@/templates/layout/auth-layout';
import type {NextPageWithLayout} from '@/types/index';

const Page: NextPageWithLayout = () => (
	<>
		<MetaHeader
			title="Posy Resto - Forget Password"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ContainerForgetPassword />
	</>
);

Page.getLayout = page => <AuthLayout>{page}</AuthLayout>;

export default Page;
