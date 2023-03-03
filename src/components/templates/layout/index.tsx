import { useRouter } from 'next/router'
import { Loading } from 'posy-fnb-core'
import React, { ReactNode, useEffect, useState } from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'

import Transition from '@/atoms/animations/transition'
import { useAppSelector } from '@/store/hooks'
import Sidebar from '@/templates/sidebar'

interface OrganismsLayoutProps {
  children: ReactNode
}

const OrganismsLayout = ({ children }: OrganismsLayoutProps) => {
  const router = useRouter()
  const { isLoggedIn } = useAppSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)
  // const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    // if (!firstRender) {
    if (!isLoggedIn) router.replace('/auth/login')
    else if (router.asPath === '/') {
      router.replace('/transaction')
      setLoading(false)
    } else {
      setLoading(false)
    }
    // } else {
    //   setFirstRender(false)
    // }
  }, [isLoggedIn, router])

  if (loading) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <Loading backgroundColor="#2F265B" color="#2F265B" size={100} />
      </main>
    )
  }

  return (
    <ProSidebarProvider>
      <main className="h-screen max-h-screen overflow-x-auto overflow-y-hidden bg-neutral-30 py-4">
        <section className="flex h-full w-full">
          <Sidebar />
          <div className="h-full flex-1 overflow-y-scroll">
            <Transition asPath={router.asPath}>{children}</Transition>
          </div>
        </section>
      </main>
    </ProSidebarProvider>
  )
}

export default OrganismsLayout
