import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdCancel } from 'react-icons/md'

import { useAppSelector } from '@/store/hooks'

interface AtomsInputSearchProps {
  isOpen: boolean
  open?: () => void
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearSearch?: () => void
  placeholder?: string
}
const AtomsInputSearch = ({
  isOpen,
  open,
  onSearch,
  onClearSearch,
  placeholder,
}: AtomsInputSearchProps) => {
  const { search } = useAppSelector((state) => state.transaction)

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isOpen ? 'w-full' : 'w-fit'
      }`}
    >
      <span className="relative flex h-full items-center justify-start">
        <div className="absolute left-3">
          <FiSearch size={16} className="stroke-neutral-90" onClick={open} />
        </div>
        <input
          onFocus={open}
          onBlur={
            onClearSearch && search.length === 0
              ? () => setTimeout(() => onClearSearch(), 100)
              : () => undefined
          }
          onChange={onSearch}
          value={search}
          type="text"
          placeholder={placeholder || ''}
          className={`h-8 rounded-full border border-neutral-70 pl-10 text-m-medium placeholder:text-neutral-80 focus:outline-neutral-50 ${
            isOpen ? 'w-full pr-10' : 'w-10'
          } `}
        />
        {search.length > 0 && (
          <div className="absolute right-4">
            <MdCancel
              size={20}
              className="cursor-pointer fill-neutral-60"
              onClick={onClearSearch}
            />
          </div>
        )}
      </span>
    </div>
  )
}

export default AtomsInputSearch
