import React, { ReactNode } from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import RightBar from '@/templates/rightbar'
import Sidebar from '@/templates/sidebar'

type OrganismsLayoutProps = {
  children: ReactNode
}

const OrganismsLayout = ({ children }: OrganismsLayoutProps) => (
  <ProSidebarProvider>
    <main className="h-screen max-h-screen overflow-auto py-4">
      <section className="flex w-full h-full gap-4">
        <Sidebar />
        <div className="flex-1 overflow-y-scroll p-8 bg-neutral-10 rounded-2xl">
          {children}
        </div>
        <RightBar />
      </section>
    </main>
  </ProSidebarProvider>
)

export default OrganismsLayout
