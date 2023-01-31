import MetaHeader from '@/molecules/meta-header'
import ContainerLogin from 'containers/login'
import { SEO } from '@/constants/seo'
import AuthLayout from '@/organisms/layout/auth-layout'
import type { NextPageWithLayout } from '@/types/index'

const Page: NextPageWithLayout = () => (
  <>
    <MetaHeader
      title="Posy Fnb - Login"
      description={SEO.description}
      keywords={SEO.keywords}
      image={SEO.image}
    />
    <ContainerLogin />
  </>
)

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default Page
