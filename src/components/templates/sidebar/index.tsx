import React from 'react'
import { useRouter } from 'next/router'
import { Sidebar, useProSidebar } from 'react-pro-sidebar'
import { BsList } from 'react-icons/bs'
import { onLogout, setShowSidebar } from 'store/slices/auth'
import useViewportListener from '@/hooks/useViewportListener'
import PersonIcon from 'src/assets/icons/person'
import { useAppDispatch } from 'store/hooks'
import { links } from 'config/link'
import Menu from '@/molecules/menu'
import Logo from '@/atoms/logo'

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
      className="z-0 h-full rounded-r-2xl bg-neutral-10"
      width="250px"
    >
      <aside
        className={`flex w-full items-center pt-6 transition-all duration-300 ease-in-out sm:justify-start ${
          collapsed ? 'px-6' : 'pl-12'
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

      <aside className="my-6">
        {links.map((item) => (
          <Menu key={item.title} item={item} collapse={collapsed} />
        ))}
      </aside>

      <aside className="absolute bottom-6 w-[90%] rounded-r-2xl bg-neutral-30 py-6">
        <div
          className={`flex gap-2 ${
            collapsed ? 'justify-center' : 'ml-7 justify-start'
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
    </Sidebar>
  )
}

export default TemplatesSidebar
