import { SEO } from '@/constants/seo'
import ContainerProduct from '@/containers/product'
import MetaHeader from '@/molecules/meta-header'
import type { NextPageWithLayout } from '@/types/index'

const Page: NextPageWithLayout = () => (
  <>
    <MetaHeader
      title="Posy Resto - Product"
      description={SEO.description}
      keywords={SEO.keywords}
      image={SEO.image}
    />
    <ContainerProduct />
  </>
)

export default Page
