import { SEO } from '@/constants/seo'
import ContainerTransaction from '@/containers/transaction'
import MetaHeader from '@/molecules/meta-header'
import type { NextPageWithLayout } from '@/types/index'

const Page: NextPageWithLayout = () => (
  <>
    <MetaHeader
      title="Posy Resto - Transaction"
      description={SEO.description}
      keywords={SEO.keywords}
      image={SEO.image}
    />
    <ContainerTransaction />
  </>
)

export default Page
