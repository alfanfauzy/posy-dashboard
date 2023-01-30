import React, { ReactNode } from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import RightBar from '@/templates/rightbar'
import Sidebar from '@/templates/sidebar'

type OrganismsLayoutProps = {
  children: ReactNode
}

const OrganismsLayout = ({ children }: OrganismsLayoutProps) => (
  <ProSidebarProvider>
    <main className="h-screen max-h-screen overflow-auto bg-neutral-30 py-4">
      <section className="flex h-full w-full gap-4">
        <Sidebar />
        <div className="flex-1 overflow-y-scroll rounded-2xl bg-neutral-10 px-6 py-10">
          {children}
        </div>
        <RightBar />
      </section>
    </main>
  </ProSidebarProvider>
)

export default OrganismsLayout
