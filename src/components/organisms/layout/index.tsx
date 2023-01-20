import React, { ReactNode } from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import RightBar from '@/templates/rightbar'
import Sidebar from '@/templates/sidebar'

type OrganismsLayoutProps = {
  children: ReactNode
}

const OrganismsLayout = ({ children }: OrganismsLayoutProps) => (
  <ProSidebarProvider>
    <main className="h-screen bg-neutral-30 max-h-screen overflow-auto py-4">
      <section className="flex w-full h-full gap-4">
        <Sidebar />
        <div className="flex-1 overflow-y-scroll px-6 py-10 bg-neutral-10 rounded-2xl">
          {children}
        </div>
        <RightBar />
      </section>
    </main>
  </ProSidebarProvider>
)

export default OrganismsLayout
