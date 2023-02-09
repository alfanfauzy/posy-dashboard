import MetaHeader from '@/molecules/meta-header'
import ContainerLogin from 'containers/login'
import { SEO } from '@/constants/seo'
import AuthLayout from '@/templates/layout/auth-layout'
import type { NextPageWithLayout } from '@/types/index'

const Page: NextPageWithLayout = () => (
  <>
    <MetaHeader
      title="Monu - Login"
      description={SEO.description}
      keywords={SEO.keywords}
      image={SEO.image}
    />
    <ContainerLogin />
  </>
)

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default Page
