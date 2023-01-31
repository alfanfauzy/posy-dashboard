import React from 'react'
import { useRouter } from 'next/router'
import { Sidebar, useProSidebar } from 'react-pro-sidebar'
import { BsList } from 'react-icons/bs'
import { links } from 'config/link'
import PersonIcon from 'src/assets/icons/person'
import Menu from '@/molecules/menu'
import { useAppDispatch } from 'store/hooks'
import { onLogout } from 'store/slices/auth'

const TemplatesSidebar = () => {
  const { collapseSidebar, collapsed } = useProSidebar()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(onLogout())
    router.replace('/auth/login')
  }

  return (
    <Sidebar className="h-full rounded-r-2xl bg-neutral-10" width="250px">
      <aside className="flex w-full items-center px-6 pt-10 sm:justify-center">
        {!collapsed ? (
          <p
            role="presentation"
            onClick={() => collapseSidebar()}
            className="cursor-pointer text-3xl font-bold text-red-accent transition duration-500 ease-in-out"
          >
            Posy Resto
          </p>
        ) : (
          <BsList
            size={28}
            onClick={() => collapseSidebar()}
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
