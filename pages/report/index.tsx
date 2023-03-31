import {SEO} from '@/constants/seo';
import MetaHeader from '@/molecules/meta-header';
import type {NextPageWithLayout} from '@/types/index';
// import ViewReportPage from '@/view/Report/components/pages';

const Page: NextPageWithLayout = () => (
	<>
		<MetaHeader
			title="Posy Resto - Report"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		{/* <ViewReportPage /> */}
		<main className="mt-20 text-s-semibold bg-slate-500 text-3xl">report</main>
	</>
);

export default Page;
