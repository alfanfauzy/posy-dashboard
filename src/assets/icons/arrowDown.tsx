import React from 'react'

import type { IconType } from '@/types/icon'

export const ArrowDownIcon = ({
  fill = '#424242',
  width = 8,
  height = 6,
  onClick,
  className,
}: IconType) => (
  <svg
    onClick={onClick}
    className={className}
    width={width}
    height={height}
    viewBox="0 0 8 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.234315 0.83429C0.546734 0.521871 1.05327 0.521871 1.36569 0.83429L4 3.4686L6.63431 0.83429C6.94673 0.521871 7.45327 0.521871 7.76569 0.83429C8.07811 1.14671 8.07811 1.65324 7.76569 1.96566L4.56569 5.16566C4.25327 5.47808 3.74673 5.47808 3.43431 5.16566L0.234315 1.96566C-0.0781049 1.65324 -0.0781049 1.14671 0.234315 0.83429Z"
      fill={fill}
    />
  </svg>
)

export default ArrowDownIcon
