import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import RightBar from '@/templates/rightbar'
import Sidebar from '@/templates/sidebar'
import { useAppSelector } from 'store/hooks'

const variants = {
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.25,
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

type OrganismsLayoutProps = {
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
      }
    } else {
      setFirstRender(false)
    }
  }, [firstRender, isLoggedIn, router])

  if (loading) {
    return <p className="bg-red-500">load...</p>
  }

  return (
    <ProSidebarProvider>
      <main className="h-screen max-h-screen overflow-auto bg-neutral-30 py-4">
        <section className="flex h-full w-full gap-4">
          <Sidebar />
          <div className="flex-1 overflow-y-scroll rounded-2xl bg-neutral-10 px-6 py-10">
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
          <RightBar />
        </section>
      </main>
    </ProSidebarProvider>
  )
}

export default OrganismsLayout
