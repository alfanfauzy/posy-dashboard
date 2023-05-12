import {Guard} from '@/view/auth/components/organisms/rbac/Guard';
import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';
import ViewReportPage from '@/view/report/components/pages';

const Page: NextPageWithLayout = () => (
	<Guard action="read" on="transaction_report">
		<MetaHeader
			title="Posy Resto - Report"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewReportPage />
	</Guard>
);

export default Page;
