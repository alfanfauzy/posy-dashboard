import { useRouter } from 'next/router'
import React from 'react'
import { BsList } from 'react-icons/bs'
import { Sidebar, useProSidebar } from 'react-pro-sidebar'

import Logo from '@/atoms/logo'
import { links } from '@/config/link'
import useViewportListener from '@/hooks/useViewportListener'
import PersonIcon from '@/icons/person'
import Menu from '@/molecules/menu'
import { useAppDispatch } from '@/store/hooks'
import { onLogout, setShowSidebar } from '@/store/slices/auth'

const TemplatesSidebar = () => {
  const { width } = useViewportListener()
  const { collapseSidebar, collapsed } = useProSidebar()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(onLogout())
    router.replace('/auth/login')
  }

  const onCollapse = () => {
    dispatch(setShowSidebar(collapsed))
    collapseSidebar()
  }

  return (
    <Sidebar
      defaultCollapsed={width < 1200}
      className="z-0 h-full overflow-hidden rounded-r-2xl bg-neutral-10"
      width="250px"
    >
      <aside
        className={`flex h-[12%] w-full items-center transition-all duration-300 ease-in-out sm:justify-start ${
          collapsed ? 'px-6' : 'pl-12 pt-2'
        }`}
      >
        {!collapsed ? (
          <Logo onClick={onCollapse} titleProps="text-xl" />
        ) : (
          <BsList
            size={28}
            onClick={onCollapse}
            className="fill-primary cursor-pointer"
          />
        )}
      </aside>

      <aside className="h-[75%] overflow-y-auto">
        {links.map((item) => (
          <Menu key={item.title} item={item} collapse={collapsed} />
        ))}
      </aside>

      <aside className="h-[13%]">
        <aside
          className={`${
            collapsed ? 'w-[85%]' : 'w-[90%]'
          } flex h-3/4 items-center justify-center rounded-r-2xl bg-neutral-30`}
        >
          <div
            className={`flex items-center gap-2 ${
              collapsed ? '-ml-1.5 justify-center' : 'ml-5 justify-start'
            }`}
          >
            <div>
              <PersonIcon height={24} width={24} />
            </div>
            {!collapsed && (
              <div
                role="button"
                onClick={handleLogout}
                onKeyDown={handleLogout}
                tabIndex={0}
                className="text-m-semibold line-clamp-1"
              >
                Cyntia Simmon junior junior
              </div>
            )}
          </div>
        </aside>
      </aside>
    </Sidebar>
  )
}

export default TemplatesSidebar
