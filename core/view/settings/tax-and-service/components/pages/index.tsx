import { Button, Input, Toggle } from 'posy-fnb-core'
import React from 'react'

const ViewTaxAndServicePage = () => (
  <main className="flex h-full gap-4 overflow-hidden">
    <section className="relative h-full flex-1 overflow-hidden rounded-2xl bg-neutral-10 p-6">
      <aside className="flex items-start justify-between">
        <p className="text-xxl-semibold text-primary-main lg:text-heading-s-semibold">
          Tax & service
        </p>
      </aside>

      <section className="mt-6 rounded-3xl border border-neutral-30 p-6 lg:w-3/5">
        <article className="flex gap-6">
          <aside className="w-1/2 rounded-3xl border border-neutral-30 p-6">
            <p className="text-l-semibold">Tax Settings</p>
            <div className="mt-3 border border-neutral-30" />
            <div className="mt-3 flex  items-center justify-between">
              <p>Tax (PB1)</p>
              <Toggle onChange={() => undefined} value />
            </div>
            <div className="mt-3">
              <Input
                labelText="Input amount"
                size="m"
                helperText="Some restaurants may be subject to custom tax percentages that vary depending on their location and other factors."
              />
            </div>
          </aside>

          <aside className="w-1/2 rounded-3xl border border-neutral-30 p-6">
            <p className="text-l-semibold">Charge Settings</p>
            <div className="mt-3 border border-neutral-30" />
            <div className="mt-3 flex  items-center justify-between">
              <p>Service charge</p>
              <Toggle onChange={() => undefined} value />
            </div>
            <div className="mt-3">
              <Input
                labelText="Input amount"
                size="m"
                helperText="Some restaurants may be subject to custom service percentages that vary depending on their location and other factors."
              />
            </div>
          </aside>
        </article>
        <aside className="mt-20 flex justify-end gap-4">
          <Button variant="secondary" size="m">
            Discard
          </Button>
          <Button variant="primary" size="m">
            Save Changes
          </Button>
        </aside>
      </section>
    </section>
  </main>
)

export default ViewTaxAndServicePage
