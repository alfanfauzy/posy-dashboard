import { SEO } from '@/constants/seo'
import MetaHeader from '@/molecules/meta-header'
import type { NextPageWithLayout } from '@/types/index'
import ViewTransactionPage from '@/view/transaction/pages'

const Page: NextPageWithLayout = () => (
  <>
    <MetaHeader
      title="Posy Resto - Subscription"
      description={SEO.description}
      keywords={SEO.keywords}
      image={SEO.image}
    />
    <div>subs</div>
  </>
)

export default Page
