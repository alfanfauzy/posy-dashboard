import React from 'react'
import type { IconType } from '@/types/icon'

export const Logo = ({
  fill = '#FC5454',
  width = 44,
  height = 44,
  onClick,
  className,
}: IconType) => (
  <svg
    onClick={onClick}
    className={className}
    width={width}
    height={height}
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="43.7683" height="43.7683" rx="9.21438" fill={fill} />
    <path
      d="M19.8596 34.5542V25.2292C20.9654 25.3398 22.4397 25.3398 23.2137 25.3398C29.3689 25.3398 32.6492 21.3592 32.6492 16.9731C32.6492 12.7345 30.2535 8.68018 22.6608 8.68018C20.8548 8.68018 16.7636 8.75389 15.3262 8.75389V34.5542H19.8596ZM23.1031 12.9188C26.1991 12.9188 27.8577 14.2457 27.8577 16.9363C27.8577 19.8111 25.7568 21.1012 23.0662 21.1012C22.0342 21.1012 20.9285 21.0274 19.8596 20.9169V12.9925C21.0759 12.9556 22.1817 12.9188 23.1031 12.9188Z"
      fill="white"
    />
  </svg>
)

export default Logo
