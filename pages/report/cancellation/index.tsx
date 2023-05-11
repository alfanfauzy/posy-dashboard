import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';
import ViewReportCancellationPage from '@/view/report/components/pages/cancellation';

const Page: NextPageWithLayout = () => (
	<>
		<MetaHeader
			title="Posy Resto - Report"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewReportCancellationPage />
	</>
);

export default Page;
