import { ReactNode, FC } from 'react'
import { useRouter } from 'next/router'
import Transition from '@/atoms/animations/transition'

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { asPath } = useRouter()

  return (
    <div className="flex max-h-screen min-h-screen items-center overflow-hidden bg-gray-50">
      <div className="mx-auto h-screen min-h-screen flex-1 rounded-lg bg-white shadow-xl">
        <div className="h-4 w-full bg-red-accent shadow-md" />
        <div className="flex min-h-screen flex-col md:flex-row">
          <div
            className="hidden h-32 bg-cover bg-center md:flex md:h-auto md:w-1/2"
            style={{
              backgroundImage: 'url(/images/auth-bg.png)',
            }}
          />
          <div className="h-screen bg-[#f9f9f9] md:w-1/2">
            <Transition asPath={asPath}>{children}</Transition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
