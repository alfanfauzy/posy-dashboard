import MetaHeader from '@/molecules/meta-header'
import ContainerLogin from 'containers/login'
import { SEO } from '@/constants/seo'

const Page = () => (
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

export default Page
