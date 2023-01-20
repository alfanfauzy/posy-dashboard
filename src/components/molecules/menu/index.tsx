/* eslint-disable no-console */
import React from 'react'
import { useRouter } from 'next/router'
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { isMobile } from 'react-device-detect'

interface MoleculesMenuProps {
  item: {
    title: string
    path: string
    icon: JSX.Element
    subMenu?: { title: string; path: string }[]
  }
  handleCollapseSidebar: () => void
  collapse: boolean
}

const MoleculesMenu = ({
  item,
  handleCollapseSidebar,
  collapse,
}: MoleculesMenuProps) => {
  const { pathname } = useRouter()

  const handleLogout = () => {
    console.log('logout will be trigger here')
  }

  return (
    <Menu
      key={item.path}
      className={`w-full transition duration-300 ease-in-out py-1 ${
        !collapse ? 'px-6' : ''
      }`}
    >
      {Array.isArray(item.subMenu) && item.subMenu.length > 0 && (
        <SubMenu
          label={item.title}
          icon={item.icon}
          className="-mt-3 py-1 pl-0.5 font-semibold"
        >
          {item.subMenu.map((el) => (
            <MenuItem key={el.title}>{el.title}</MenuItem>
          ))}
        </SubMenu>
      )}
      {!Array.isArray(item.subMenu) && (
        <MenuItem
          className={`text-xxl-semibold py-2  ${
            pathname.indexOf(item.path) !== -1
              ? 'text-primary'
              : 'hover:bg-neutral-20 hover:rounded-lg'
          }`}
          icon={item.icon}
          onClick={isMobile ? handleCollapseSidebar : () => undefined}
        >
          <p
            role="presentation"
            onClick={item.path === 'login' ? handleLogout : () => undefined}
          >
            {item.title}
          </p>
        </MenuItem>
      )}
    </Menu>
  )
}

export default MoleculesMenu
