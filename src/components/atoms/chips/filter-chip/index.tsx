import React from 'react'

interface AtomsFilterChipProps {
  label: string
  onClick?: (e: any) => void
}

const AtomsFilterChip = ({ label, onClick }: AtomsFilterChipProps) => (
  <div
    tabIndex={0}
    role="button"
    onClick={onClick}
    onKeyDown={onClick}
    className="w-fit rounded-full border border-neutral-50 px-4 py-[6px] text-m-semibold text-neutral-80"
  >
    <p className="whitespace-nowrap">{label}</p>
  </div>
)

export default AtomsFilterChip
