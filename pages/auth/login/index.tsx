import { SEO } from '@/constants/seo'
import ContainerLogin from '@/containers/auth/login'
import MetaHeader from '@/molecules/meta-header'
import AuthLayout from '@/templates/layout/auth-layout'
import type { NextPageWithLayout } from '@/types/index'

const Page: NextPageWithLayout = () => (
  <>
    <MetaHeader
      title="Posy Resto - Login"
      description={SEO.description}
      keywords={SEO.keywords}
      image={SEO.image}
    />
    <ContainerLogin />
  </>
)

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default Page
