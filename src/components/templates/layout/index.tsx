import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '@/templates/sidebar'
import Loading from '@/atoms/loading'
import { useAppSelector } from 'store/hooks'

export const variants = {
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
  out: {
    opacity: 0,
    scale: 1,
    y: 40,
    transition: {
      duration: 0.5,
    },
  },
}

interface OrganismsLayoutProps {
  children: ReactNode
}

const OrganismsLayout = ({ children }: OrganismsLayoutProps) => {
  const router = useRouter()
  const { isLoggedIn } = useAppSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    if (!firstRender) {
      if (!isLoggedIn) router.replace('/auth/login')
      else {
        setLoading(false)
        // router.replace('/transaction')
      }
    } else {
      setFirstRender(false)
    }
  }, [firstRender, isLoggedIn, router])

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
          <div className="flex-1">
            <AnimatePresence initial>
              <motion.div
                key={`an${router.asPath}`}
                variants={variants}
                animate="in"
                initial="out"
                exit="out"
                className="h-full w-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
    </ProSidebarProvider>
  )
}

export default OrganismsLayout
