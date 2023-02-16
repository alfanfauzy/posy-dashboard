import { SEO } from '@/constants/seo'
import ContainerCreateNewPassword from '@/containers/auth/create-new-password'
import PlainLayout from '@/templates/layout/plain-layout'
import MetaHeader from '@/molecules/meta-header'
import type { NextPageWithLayout } from '@/types/index'

const Page: NextPageWithLayout = () => (
  <>
    <MetaHeader
      title="Posy Resto - Create New Password"
      description={SEO.description}
      keywords={SEO.keywords}
      image={SEO.image}
    />
    <ContainerCreateNewPassword />
  </>
)

Page.getLayout = (page) => <PlainLayout>{page}</PlainLayout>

export default Page
