import React from 'react'
import type { IconType } from '@/types/icon'

export const NotificationIcon = ({
  fill = '#424242',
  width = 16,
  height = 16,
  onClick,
  className,
}: IconType) => (
  <svg
    onClick={onClick}
    className={className}
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.15333 13.9997C9.03613 14.2017 8.8679 14.3694 8.66548 14.486C8.46307 14.6026 8.23359 14.664 8 14.664C7.76641 14.664 7.53693 14.6026 7.33452 14.486C7.13211 14.3694 6.96387 14.2017 6.84667 13.9997M12 5.33301C12 4.27214 11.5786 3.25473 10.8284 2.50458C10.0783 1.75444 9.06087 1.33301 8 1.33301C6.93913 1.33301 5.92172 1.75444 5.17157 2.50458C4.42143 3.25473 4 4.27214 4 5.33301C4 9.99967 2 11.333 2 11.333H14C14 11.333 12 9.99967 12 5.33301Z"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default NotificationIcon
