import {SEO} from '@/constants/seo';
import MetaHeader from '@/molecules/meta-header';
import type {NextPageWithLayout} from '@/types/index';
import ViewReportPage from '@/view/report/components/pages';

const Page: NextPageWithLayout = () => (
	<>
		<MetaHeader
			title="Posy Resto - Report"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewReportPage />
	</>
);

export default Page;
