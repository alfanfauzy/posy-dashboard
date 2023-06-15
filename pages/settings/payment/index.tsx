import {Guard} from '@/view/auth/components/organisms/rbac/Guard';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import ViewPaymentSettingPage from '@/view/payment-setting/components/pages';

const Page = () => (
	<Guard action="read" on="setting_subscription">
		<MetaHeader
			title="Posy Resto - Payment"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewPaymentSettingPage />
	</Guard>
);

export default Page;
