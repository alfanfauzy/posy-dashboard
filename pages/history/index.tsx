import { SEO } from '@/constants/seo'
import ContainerHistory from '@/containers/history'
import MetaHeader from '@/molecules/meta-header'
import type { NextPageWithLayout } from '@/types/index'

const Page: NextPageWithLayout = () => (
  <>
    <MetaHeader
      title="Posy Resto - History"
      description={SEO.description}
      keywords={SEO.keywords}
      image={SEO.image}
    />
    <ContainerHistory />
  </>
)

export default Page
