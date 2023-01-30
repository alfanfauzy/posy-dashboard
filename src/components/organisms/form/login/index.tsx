import React, { useState } from 'react'
import { Button, Input } from 'posy-fnb-ds'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import Logo from '@/atoms/logo'
import { useRouter } from 'next/router'

const OrganismsFormLogin = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const goDashboard = () => router.push('/transaction')

  return (
    <article className="flex h-full flex-col items-center justify-center overflow-y-auto p-14 lg:p-16 xl:p-24">
      <Logo />
      <section className="mt-16 w-full rounded-3xl p-10 shadow-basic">
        <p className="text-xxl-semibold">Hello, Welcome Back!</p>
        <div className="mt-4 flex flex-col gap-4">
          <Input labelText="Email Address" placeholder="Enter a valid email" />
          <Input
            type={showPassword ? 'text' : 'password'}
            labelText="Password"
            placeholder="Input Password"
            endAdornment={
              showPassword ? (
                <AiOutlineEyeInvisible
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiOutlineEye onClick={() => setShowPassword(!showPassword)} />
              )
            }
          />
          <p className="text-m-semibold cursor-pointer self-end text-red-caution hover:text-opacity-75">
            Forget Password
          </p>
        </div>
        <Button
          variant="red-accent"
          size="xl"
          fullWidth
          className="mt-4"
          onClick={goDashboard}
        >
          Login
        </Button>
      </section>
    </article>
  )
}

export default OrganismsFormLogin
