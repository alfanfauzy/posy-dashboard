import React from 'react'
import type { IconType } from '@/types/icon'

export const Logo = ({
  fill = '#FC5454',
  width = 38,
  height = 38,
  onClick,
  className,
}: IconType) => (
  <svg
    onClick={onClick}
    className={className}
    width={width}
    height={height}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="38" height="38" rx="8" fill={fill} />
    <path
      d="M7 8H12.6889L18.6974 22.6591H18.9531L24.9616 8H30.6506V29.8182H26.1761V15.6172H25.995L20.3487 29.7116H17.3018L11.6555 15.5639H11.4744V29.8182H7V8Z"
      fill="white"
    />
  </svg>
)

export default Logo
