import React from 'react'
import { useRouter } from 'next/router'
import { Button } from 'posy-fnb-core'
import Logo from '@/atoms/logo'

const OrganismsFormVerifyAccount = () => {
  const router = useRouter()

  return (
    <article className="flex h-full flex-col items-center justify-center overflow-y-auto p-14 lg:p-16 xl:p-24">
      <Logo />
      <div className="mt-10 w-full rounded-3xl p-10 shadow-basic">
        <p className="text-xxl-semibold text-primary-main">Email sent</p>
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-l-regular text-primary-main">
            We sent an email to <b>l*******a@gmail.com </b> with a link to get
            back into your account.
          </p>
        </div>
        <Button
          variant="secondary"
          size="l"
          fullWidth
          className="mt-6"
          onClick={() => router.push('create-new-password')}
        >
          Ok
        </Button>
      </div>
    </article>
  )
}

export default OrganismsFormVerifyAccount