import { useRouter } from 'next/router'
import React from 'react'
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar'

interface MoleculesMenuProps {
  item: {
    title: string
    path: string
    icon: JSX.Element
    subMenu?: { title: string; path: string }[]
  }
  collapse: boolean
}

const MoleculesMenu = ({ item, collapse }: MoleculesMenuProps) => {
  const { pathname, push } = useRouter()

  const linkTo = (path: string) => {
    push(`/${path}`)
  }

  return (
    <Menu key={item.path} className={`w-full py-1 ${!collapse ? 'px-6' : ''}`}>
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
          className={`py-1.5 text-xxl-semibold transition-all duration-300 ease-in-out ${
            pathname.indexOf(item.path) !== -1
              ? 'rounded-lg bg-neutral-20'
              : 'hover:rounded-lg hover:bg-neutral-20'
          }`}
          icon={item.icon}
          onClick={() => linkTo(item.path)}
          // onClick={item.path === 'login' ? handleLogout : () => undefined}
        >
          <p>{item.title}</p>
        </MenuItem>
      )}
    </Menu>
  )
}

export default MoleculesMenu
