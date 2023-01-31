import { useState } from 'react'

interface UseDisclosureType {
  initialState: boolean
  callbacks?: { onOpen?(): void; onClose?(): void }
}

export const useDisclosure = ({
  initialState,
  callbacks,
}: UseDisclosureType) => {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = () => {
    if (!isOpen) {
      setIsOpen(true)
      callbacks?.onOpen?.()
    }
  }

  const close = () => {
    if (isOpen) {
      setIsOpen(false)
      callbacks?.onClose?.()
    }
  }

  const toggle = () => {
    if (isOpen) {
      close()
    } else {
      open()
    }
  }

  return [isOpen, { open, close, toggle }] as const
}
