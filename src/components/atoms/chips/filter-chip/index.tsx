import React from 'react'

interface AtomsFilterChipProps {
  label: string
  onClick?: (e: any) => void
  openSearch?: boolean
}

const AtomsFilterChip = ({
  label,
  onClick,
  openSearch,
}: AtomsFilterChipProps) => (
  <div
    tabIndex={0}
    role="button"
    onClick={onClick}
    onKeyDown={onClick}
    className={`rounded-full border border-neutral-50 px-4 py-[6px] text-m-semibold text-neutral-80 transition-all duration-500 ease-in-out ${
      openSearch ? '-ml-40 opacity-0 ' : 'w-fit'
    }`}
  >
    <p className="whitespace-nowrap">{label}</p>
  </div>
)

export default AtomsFilterChip
