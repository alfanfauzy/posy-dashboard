import MetaHeader from '@/molecules/meta-header'
import ContainerTransaction from 'containers/transaction'
import { SEO } from '@/constants/seo'
import type { NextPageWithLayout } from '@/types/index'

const Page: NextPageWithLayout = () => (
  <>
    <MetaHeader
      title="Monu - Transaction"
      description={SEO.description}
      keywords={SEO.keywords}
      image={SEO.image}
    />
    <ContainerTransaction />
  </>
)

export default Page
