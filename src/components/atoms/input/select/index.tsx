import React from 'react'

interface AtomsInputSelect extends React.HTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string | number; hide?: boolean }[]
}

const AtomsInputSelect = ({
  onChange,
  options,
  className,
}: AtomsInputSelect) => (
  <select
    onChange={onChange}
    className={`${
      className || ''
    } h-8 w-[200px] rounded-full border border-neutral-40 px-3 text-m-medium placeholder:text-neutral-80 hover:border-neutral-100 focus:outline-none`}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value} hidden={option.hide}>
        {option.label}
      </option>
    ))}
  </select>
)

export default AtomsInputSelect
