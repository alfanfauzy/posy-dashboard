import React from 'react'
import { Sidebar, useProSidebar } from 'react-pro-sidebar'
import { BsList } from 'react-icons/bs'
import { links } from 'config/link'
import PersonIcon from 'src/assets/icons/person'
import Menu from '@/molecules/menu'

const TemplatesSidebar = () => {
  const { collapseSidebar, collapsed } = useProSidebar()

  return (
    <Sidebar className="h-full rounded-r-2xl bg-neutral-10" width="250px">
      <aside className="pt-10 px-6 flex w-full items-center sm:justify-center">
        {!collapsed ? (
          <p
            role="presentation"
            onClick={() => collapseSidebar()}
            className="cursor-pointer font-bold text-red-accent text-3xl transition duration-500 ease-in-out"
          >
            Posy Resto
          </p>
        ) : (
          <BsList
            size={28}
            onClick={() => collapseSidebar()}
            className="cursor-pointer fill-primary"
          />
        )}
      </aside>

      <aside className="my-6">
        {links.map((item) => (
          <Menu key={item.title} item={item} collapse={collapsed} />
        ))}
      </aside>

      <aside className="absolute bottom-6 bg-neutral-30 w-[90%] py-6 rounded-r-2xl">
        <div
          className={`flex gap-2 ${
            collapsed ? 'justify-center' : 'justify-start ml-7'
          }`}
        >
          <div>
            <PersonIcon height={24} width={24} />
          </div>
          {!collapsed && (
            <p className="text-m-semibold line-clamp-1">
              Cyntia Simmon junior junior
            </p>
          )}
        </div>
      </aside>
    </Sidebar>
  )
}

export default TemplatesSidebar
