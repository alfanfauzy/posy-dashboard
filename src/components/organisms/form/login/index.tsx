import React from 'react'
import { useRouter } from 'next/router'
import { Button, Input, Select } from 'posy-fnb-core'
import * as reactHookForm from 'react-hook-form'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { useAppDispatch } from 'store/hooks'
import { authSuccess } from 'store/slices/auth'
import { ValidationSchemaType, validationSchema } from 'src/schemas/login'
import { useForm } from '@/hooks/useForm'
import { useDisclosure } from '@/hooks/useDisclosure'
import Logo from '@/atoms/logo'

const OrganismsFormLogin = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [showPassword, { toggle }] = useDisclosure({ initialState: false })

  const {
    register,
    handleSubmit,
    watch,
    // setValue,
    formState: { errors },
  } = useForm({
    schema: validationSchema,
  })

  console.log(watch())

  const goDashboard = () => router.push('/transaction')
  const onSubmit: reactHookForm.SubmitHandler<ValidationSchemaType> = () => {
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
        className="mt-16 w-full rounded-3xl p-10 shadow-basic"
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
          {/* <Select
            options={[
              { label: 'Email', value: 'test' },
              { label: 'Address', value: 'test 2' },
              { label: 'password', value: 'test 3' },
            ]}
            labelText="Email Address"
            placeholder="Enter a valid email"
            error={!!errors?.type}
            helperText={errors?.type?.message}
            // {...register('type.value')}
            // onChange={(e) => setValue('type', e)} // assign onChange event
            // onBlur={onBlur} // assign onBlur event
            name="type" // assign name prop
            // ref={ref} // a
          /> */}
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
          <p className="cursor-pointer self-end text-m-semibold text-red-caution hover:text-opacity-75">
            Forget Password
          </p>
        </div>
        <Button
          variant="red-accent"
          size="l"
          fullWidth
          className="mt-4"
          type="submit"
        >
          Login
        </Button>
      </form>
    </article>
  )
}

export default OrganismsFormLogin
