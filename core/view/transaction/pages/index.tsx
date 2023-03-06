import React, { useRef } from 'react'

import useViewportListener from '@/hooks/useViewportListener'
import OrganismsContentsTransaction from '@/organisms/content/transaction'
import { useAppSelector } from '@/store/hooks'
import TemplatesRightBar from '@/templates/rightbar'

const ViewTransactionPage = () => {
  const componentRef = useRef<any>()
  const { width } = useViewportListener()
  const { showSidebar } = useAppSelector((state) => state.auth)
  return (
    <main className="flex h-full gap-4 overflow-hidden">
      <OrganismsContentsTransaction componentRef={componentRef} />

      {width > 1200 && <TemplatesRightBar qrRef={componentRef} />}
      {width <= 1200 && !showSidebar && (
        <TemplatesRightBar qrRef={componentRef} />
      )}
    </main>
  )
}

export default ViewTransactionPage
