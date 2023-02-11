import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdCancel } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { onClearSearch } from 'store/slices/transaction'

interface AtomsInputSearchProps {
  isOpen: boolean
  open: () => void
  close: () => void
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const AtomsInputSearch = ({
  isOpen,
  open,
  close,
  onSearch,
}: AtomsInputSearchProps) => {
  const dispatch = useAppDispatch()
  const { search } = useAppSelector((state) => state.transaction)

  const onClear = () => {
    dispatch(onClearSearch())
    close()
  }

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
            search.length === 0
              ? () => setTimeout(() => onClear(), 100)
              : () => undefined
          }
          onChange={onSearch}
          value={search}
          type="text"
          placeholder={isOpen ? 'Search' : ''}
          className={`h-8 rounded-full border border-neutral-70 pl-10 text-m-medium placeholder:text-neutral-80 focus:outline-neutral-50 ${
            isOpen ? 'w-full pr-10' : 'w-10'
          } `}
        />
        {search.length > 0 && (
          <div className="absolute right-4">
            <MdCancel
              size={20}
              className="cursor-pointer fill-neutral-60"
              onClick={onClear}
            />
          </div>
        )}
      </span>
    </div>
  )
}

export default AtomsInputSearch
