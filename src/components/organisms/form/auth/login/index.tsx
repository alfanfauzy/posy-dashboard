import { useRouter } from 'next/router'
import { Button, Input } from 'posy-fnb-core'
import React from 'react'
import * as reactHookForm from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import {
  validationSchemaLogin,
  ValidationSchemaLoginType,
} from 'src/schemas/auth'
import { useAppDispatch } from 'store/hooks'
import { authSuccess } from 'store/slices/auth'

import Logo from '@/atoms/logo'
import useDisclosure from '@/hooks/useDisclosure'
import { useForm } from '@/hooks/useForm'

const OrganismsFormLogin = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [showPassword, { toggle }] = useDisclosure({ initialState: false })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    schema: validationSchemaLogin,
  })

  const goDashboard = () => router.push('/transaction')
  const onSubmit: reactHookForm.SubmitHandler<
    ValidationSchemaLoginType
  > = () => {
    dispatch(
      authSuccess({
        expired_at: {
          nanos: 3353,
          seconds: 124412,
        },
        refresh_token: '214412',
        token: '314133',
        uuid: '14143',
      }),
    )
    goDashboard()
  }

  return (
    <article className="flex h-full flex-col items-center justify-center overflow-y-auto p-14 lg:p-16 xl:p-24">
      <Logo />
      <form
        className="mt-10 w-full rounded-3xl p-10 shadow-basic"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-xxl-semibold">Hello, Welcome Back!</p>
        <div className="mt-4 flex flex-col gap-4">
          <Input
            type="text"
            labelText="Email Address"
            placeholder="Enter a valid email"
            error={!!errors?.email}
            helperText={errors?.email?.message}
            {...register('email')}
          />
          <Input
            type={showPassword ? 'text' : 'password'}
            labelText="Password"
            placeholder="Input Password"
            endAdornment={
              showPassword ? (
                <AiOutlineEyeInvisible onClick={toggle} />
              ) : (
                <AiOutlineEye onClick={toggle} />
              )
            }
            {...register('password')}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />
          <p
            role="presentation"
            onClick={() => router.push('forget-password')}
            className="cursor-pointer self-end text-m-semibold text-primary-main hover:text-opacity-75"
          >
            Forget Password
          </p>
        </div>
        <Button
          variant="primary"
          size="l"
          fullWidth
          className="mt-6"
          type="submit"
        >
          Login
        </Button>
      </form>
    </article>
  )
}

export default OrganismsFormLogin
