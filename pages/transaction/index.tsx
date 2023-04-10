import MetaHeader from '@/view/common/components/molecules/meta-header';
import {SEO} from '@/view/common/constants/seo';
import type {NextPageWithLayout} from '@/view/common/types/index';
import ViewTransactionPage from '@/view/transaction/components/pages';

const Page: NextPageWithLayout = () => (
	<>
		<MetaHeader
			title="Posy Resto - Transaction"
			description={SEO.description}
			keywords={SEO.keywords}
			image={SEO.image}
		/>
		<ViewTransactionPage />
	</>
);

export default Page;
