import { SEO } from '@/constants/seo'
import MetaHeader from '@/molecules/meta-header'
import type { NextPageWithLayout } from '@/types/index'
import ViewTaxAndServicePage from '@/view/settings/tax-and-service/components/pages'

const Page: NextPageWithLayout = () => (
  <>
    <MetaHeader
      title="Posy Resto - Tax and Service"
      description={SEO.description}
      keywords={SEO.keywords}
      image={SEO.image}
    />
    <ViewTaxAndServicePage />
  </>
)

export default Page
