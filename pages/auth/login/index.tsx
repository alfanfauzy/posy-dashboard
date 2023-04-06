import {SEO} from '@/constants/seo';
import MetaHeader from '@/molecules/meta-header';
import AuthLayout from '@/templates/layout/auth-layout';
import type {NextPageWithLayout} from '@/types/index';
import PagesLogin from '@/view/auth/components/pages/login';

const Page: NextPageWithLayout = () => (
	<>
		<MetaHeader
			title="Posy Resto - Login"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<PagesLogin />
	</>
);

Page.getLayout = page => <AuthLayout>{page}</AuthLayout>;

export default Page;
