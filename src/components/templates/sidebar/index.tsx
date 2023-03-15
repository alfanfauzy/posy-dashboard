import { Select } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { BsList } from 'react-icons/bs'
import { Sidebar, useProSidebar } from 'react-pro-sidebar'

import Logo from '@/atoms/logo'
import { PROTECT_ROUTES } from '@/config/link'
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

  const outletOptions = [
    { label: 'Select outlet: A', value: 'A' },
    { label: 'Select outlet: B', value: 'B' },
    { label: 'Select outlet: C', value: 'C' },
  ]

  return (
    <Sidebar
      defaultCollapsed={width < 1200}
      className="relative z-0 h-full overflow-hidden rounded-r-2xl bg-neutral-10"
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

      <aside className="h-[70%] overflow-y-auto pb-6">
        {PROTECT_ROUTES.map((route) => (
          <Menu key={route.title} item={route} collapse={collapsed} />
        ))}
      </aside>

      <aside className="absolute bottom-0 w-full items-center">
        <aside
          className={`w-full ${
            collapsed ? 'items-center' : 'items-start'
          } flex h-[112px] flex-col justify-start rounded-t-2xl bg-[#F2F1F9] p-6`}
        >
          <div
            className={`flex items-center gap-2 ${
              collapsed ? '-ml-1.5 justify-center' : 'justify-start'
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
                Cyntia Simmons
              </div>
            )}
          </div>
          <Select
            className={`mt-2.5 -ml-1.5 ${collapsed ? 'w-16' : '!w-[164px]'}`}
            options={outletOptions}
            value={outletOptions[0]}
            // onChange={onChange}
          />
        </aside>
      </aside>
    </Sidebar>
  )
}

export default TemplatesSidebar
