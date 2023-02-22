import React from 'react'

import type { IconType } from '@/types/icon'

export const PlusCircleIcon = ({
  fill = '#9E9E9E',
  width = 90,
  height = 90,
  onClick,
  className,
}: IconType) => (
  <svg
    onClick={onClick}
    className={className}
    width={width}
    height={height}
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44.7474 28.0469V61.7135M27.9141 44.8802H61.5807M86.8307 44.8802C86.8307 68.1222 67.9894 86.9635 44.7474 86.9635C21.5054 86.9635 2.66406 68.1222 2.66406 44.8802C2.66406 21.6382 21.5054 2.79688 44.7474 2.79688C67.9894 2.79688 86.8307 21.6382 86.8307 44.8802Z"
      stroke={fill}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default PlusCircleIcon
