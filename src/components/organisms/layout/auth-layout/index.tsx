import { ReactNode, FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

const variants = {
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.25,
    },
  },
  out: {
    opacity: 0,
    scale: 1,
    y: 40,
    transition: {
      duration: 0.5,
    },
  },
}

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { asPath } = useRouter()

  return (
    <div className="flex max-h-screen min-h-screen items-center overflow-hidden bg-gray-50">
      <div className="mx-auto h-screen min-h-screen flex-1 rounded-lg bg-white shadow-xl">
        <div className="flex min-h-screen flex-col md:flex-row">
          <div
            className="hidden h-32 bg-cover bg-center md:flex md:h-auto md:w-1/2"
            style={{
              backgroundImage: 'url(/images/auth-bg.png)',
            }}
          >
            {/* <div className="px-24 min-h-screen w-full h-full flex flex-col justify-center backdrop-brightness-75">
              <div
                className="text-4xl lg:text-6xl text-neutral-10"
                style={{
                  lineHeight: 1.25,
                }}
              >
                Take responsibility for
                <br />
                your carbon footprint.
                <br />
                Invest in climate
                <br />
                justice.
              </div>
              <div className="text-lg lg:text-2xl text-neutral-10 mt-3">
                All our projects are independently audited and
                <br />
                must reduce emissions and alleviate poverty.
              </div>
            </div> */}
          </div>
          <div className="h-screen bg-[#f9f9f9] md:w-1/2">
            <AnimatePresence initial>
              <motion.div
                key={`an${asPath}`}
                variants={variants}
                animate="in"
                initial="out"
                exit="out"
                className="h-full w-full bg-slate-50"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
