import {SEO} from '@/constants/seo';
import ContainerVerifyAccount from '@/containers/auth/verify-account';
import MetaHeader from '@/molecules/meta-header';
import AuthLayout from '@/templates/layout/auth-layout';
import type {NextPageWithLayout} from '@/types/index';

const Page: NextPageWithLayout = () => (
	<>
		<MetaHeader
			title="Posy Resto - Verify Account"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ContainerVerifyAccount />
	</>
);

Page.getLayout = page => <AuthLayout>{page}</AuthLayout>;

export default Page;
