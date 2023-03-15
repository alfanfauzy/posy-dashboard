import Image from 'next/image'
import { Button, Modal } from 'posy-fnb-core'
import RenewSubs from 'public/images/renew-subscription.png'
import subsNeeded from 'public/images/subscription-needed.png'
import React from 'react'

import useDisclosure from '@/hooks/useDisclosure'

interface ViewSubscriptionPageProps {
  isSubscription: boolean
}

const ViewSubscriptionPage = ({
  isSubscription,
}: ViewSubscriptionPageProps) => {
  const [isOpen, { close }] = useDisclosure({ initialState: !isSubscription })

  return (
    <main className="flex h-full w-full">
      <article className="flex h-full w-full flex-col rounded-2xl bg-neutral-10 p-6">
        <section className="flex items-start justify-between">
          <p className="text-xxl-semibold text-primary-main lg:text-heading-s-semibold">
            Subscription
          </p>
        </section>

        <section className="mt-6 flex gap-6 xl:w-[90%]">
          <aside className="w-1/3 rounded-3xl border border-neutral-30 p-6 shadow-md">
            <div>
              <p className="text-l-semibold">Subscription Status</p>
              <p
                className={`text-l-semibold ${
                  isSubscription ? 'text-green-success' : 'text-red-caution'
                }`}
              >
                {isSubscription ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div className="mt-3 border border-neutral-30" />
            <div className="mt-3">
              <p className="text-m-semibold">Subscription Plan</p>
              <p className="text-m-regular">Basic</p>
            </div>
            <div className="mt-3">
              <p className="text-m-semibold">Expired Date</p>
              <p
                className={`text-m-regular ${
                  isSubscription ? 'text-green-success' : 'text-red-caution'
                }`}
              >
                March 07, 2023
              </p>
            </div>
          </aside>

          <aside className="w-2/3 rounded-3xl border border-neutral-30 p-6 shadow-md">
            <div className="flex flex-col items-center gap-6 lg:flex-row">
              <Image
                src={RenewSubs}
                alt="renew-subscription"
                width={253}
                height={201}
                priority
              />
              <div>
                <h2 className="text-xxl-bold">Only 199K / Month</h2>
                <p className="mt-2 text-l-regular text-primary-main">
                  Looking for a powerful and user-friendly POS system for your
                  food and beverage business? Our subscription service has got
                  you covered!
                </p>
                <Button className="mt-10" fullWidth>
                  Renew Subscription
                </Button>
              </div>
            </div>
          </aside>
        </section>
      </article>

      <Modal
        closeOverlay
        open={isOpen}
        handleClose={close}
        className="!w-1/2 !p-12"
      >
        <section className="flex w-full items-center justify-center gap-4">
          <div className="w-1/2">
            <h1 className="text-heading-s-bold text-primary-main">
              Subscription Needed
            </h1>
            <p className="mt-4 text-l-regular text-primary-main">
              We’re sorry that you need to subscribe to access the application.
              Please renew the subscription first.
            </p>
            <Button className="mt-10" fullWidth>
              Renew Subscription
            </Button>
          </div>
          <div className="w-1/2">
            <Image priority src={subsNeeded} alt="subscription-needed" />
          </div>
        </section>
      </Modal>
    </main>
  )
}

export default ViewSubscriptionPage
