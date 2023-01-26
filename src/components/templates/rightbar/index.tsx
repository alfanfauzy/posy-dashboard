import React from 'react'
import NoOrderIcon from 'src/assets/icons/noOrder'

const TemplatesRightBar = () => (
  <main className="xl:w-[320px] w-[215px] bg-neutral-10 rounded-2xl px-5 py-9 lg:block hidden">
    <article className="flex flex-col h-full">
      <p className="text-xxl-bold">Transaction Details</p>

      <aside className="h-full flex justify-center">
        <div className="flex flex-col gap-4 items-center justify-center">
          <NoOrderIcon />
          <p className="text-l-medium">There’s no order yet</p>
        </div>
      </aside>
    </article>
  </main>
)

export default TemplatesRightBar
