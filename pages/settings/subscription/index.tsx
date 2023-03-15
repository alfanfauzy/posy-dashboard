import { SEO } from '@/constants/seo'
import { SubscriptionSection } from '@/domain/subscription/model'
import MetaHeader from '@/molecules/meta-header'
import ViewSubscriptionPage from '@/view/settings/subscription/components/pages'
import { GetSubscriptionSectionServerViewModel } from '@/view/subscription/view-models/GetSubscriptionSectionViewModel'

interface Props {
  data: SubscriptionSection
}

const Page = ({ data }: Props) => (
  <>
    <MetaHeader
      title="Posy Resto - Subscription"
      description={SEO.description}
      keywords={SEO.keywords}
      image={SEO.image}
    />
    <ViewSubscriptionPage data={data} />
  </>
)

export async function getServerSideProps() {
  const data = await GetSubscriptionSectionServerViewModel()

  return {
    props: {
      data,
    },
  }
}

export default Page
