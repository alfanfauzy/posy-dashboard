import React from 'react'
import NoOrderIcon from 'src/assets/icons/noOrder'

const TemplatesRightBar = () => (
  <main className="hidden w-[215px] rounded-2xl bg-neutral-10 px-5 py-9 lg:block xl:w-[320px]">
    <article className="flex h-full flex-col">
      <p className="text-xxl-bold">Transaction Details</p>

      <aside className="flex h-full justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <NoOrderIcon />
          <p className="text-l-medium">There’s no order yet</p>
        </div>
      </aside>
    </article>
  </main>
)

export default TemplatesRightBar
