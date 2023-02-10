import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { useAppSelector } from 'store/hooks'
import Sidebar from '@/templates/sidebar'
import Loading from '@/atoms/loading'
import Transition from '@/atoms/animations/transition'

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
        <Loading size={96} />
      </main>
    )
  }

  return (
    <ProSidebarProvider>
      <main className="h-screen max-h-screen overflow-x-auto overflow-y-hidden bg-neutral-30 py-4">
        <section className="flex h-full w-full gap-4">
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
