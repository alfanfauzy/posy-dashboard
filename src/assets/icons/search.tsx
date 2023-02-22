import React from 'react'

import type { IconType } from '@/types/icon'

export const SearchIcon = ({
  fill = '#424242',
  width = 13,
  height = 13,
  onClick,
  className,
}: IconType) => (
  <svg
    onClick={onClick}
    className={className}
    width={width}
    height={height}
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.8067 10.86L9.54 8.6C10.2713 7.66831 10.6681 6.51777 10.6667 5.33334C10.6667 4.2785 10.3539 3.24736 9.76784 2.37029C9.18181 1.49323 8.34885 0.809646 7.37431 0.405978C6.39978 0.00231083 5.32742 -0.103307 4.29285 0.102481C3.25829 0.308269 2.30798 0.81622 1.5621 1.5621C0.81622 2.30798 0.308269 3.25829 0.102481 4.29285C-0.103307 5.32742 0.00231083 6.39978 0.405978 7.37431C0.809646 8.34885 1.49323 9.18181 2.37029 9.76784C3.24736 10.3539 4.2785 10.6667 5.33334 10.6667C6.51777 10.6681 7.66831 10.2713 8.6 9.54L10.86 11.8067C10.922 11.8692 10.9957 11.9188 11.077 11.9526C11.1582 11.9864 11.2453 12.0039 11.3333 12.0039C11.4213 12.0039 11.5085 11.9864 11.5897 11.9526C11.671 11.9188 11.7447 11.8692 11.8067 11.8067C11.8692 11.7447 11.9188 11.671 11.9526 11.5897C11.9864 11.5085 12.0039 11.4213 12.0039 11.3333C12.0039 11.2453 11.9864 11.1582 11.9526 11.077C11.9188 10.9957 11.8692 10.922 11.8067 10.86ZM1.33334 5.33334C1.33334 4.54221 1.56793 3.76885 2.00746 3.11106C2.44698 2.45326 3.0717 1.94057 3.8026 1.63782C4.53351 1.33507 5.33777 1.25585 6.1137 1.41019C6.88962 1.56454 7.60235 1.9455 8.16176 2.50491C8.72117 3.06432 9.10214 3.77705 9.25648 4.55297C9.41082 5.3289 9.3316 6.13317 9.02885 6.86407C8.7261 7.59497 8.21341 8.21969 7.55562 8.65921C6.89782 9.09874 6.12446 9.33334 5.33334 9.33334C4.27247 9.33334 3.25505 8.91191 2.50491 8.16176C1.75476 7.41162 1.33334 6.3942 1.33334 5.33334Z"
      fill={fill}
    />
  </svg>
)

export default SearchIcon
