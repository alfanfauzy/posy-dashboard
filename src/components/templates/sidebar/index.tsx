/* eslint-disable no-nested-ternary */
import React from 'react'
import { Sidebar, useProSidebar } from 'react-pro-sidebar'
import { isMobile } from 'react-device-detect'
import { BsList } from 'react-icons/bs'
import { links } from 'config/link'
import Menu from '@/molecules/menu'

const TemplatesSidebar = () => {
  const { collapseSidebar, collapsed } = useProSidebar()

  return (
    <Sidebar
      className={`h-full rounded-r-2xl bg-neutral-10 ${
        isMobile && collapsed ? 'hidden' : ''
      }`}
      width={
        isMobile && !collapsed ? '700px' : isMobile && collapsed ? '0' : '256px'
      }
    >
      <div className="pt-10 px-6 flex w-full items-center sm:justify-center">
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
      </div>

      <div className="my-6">
        {links.map((item) => (
          <Menu
            key={item.title}
            item={item}
            handleCollapseSidebar={() => collapseSidebar()}
            collapse={collapsed}
          />
        ))}
      </div>
    </Sidebar>
  )
}

export default TemplatesSidebar
