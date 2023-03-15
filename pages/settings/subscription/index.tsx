import { checkSubscription } from 'pages/api/middleware'

import { SEO } from '@/constants/seo'
import MetaHeader from '@/molecules/meta-header'
import ViewSubscriptionPage from '@/view/settings/subscription/components/pages'

interface Props {
  isSubscription: boolean
}

const Page = ({ isSubscription }: Props) => (
  <>
    <MetaHeader
      title="Posy Resto - Subscription"
      description={SEO.description}
      keywords={SEO.keywords}
      image={SEO.image}
    />
    <ViewSubscriptionPage isSubscription={isSubscription} />
  </>
)

export async function getServerSideProps() {
  const res = await checkSubscription()

  return {
    props: {
      isSubscription: res.props.isSubscription,
    },
  }
}

export default Page
