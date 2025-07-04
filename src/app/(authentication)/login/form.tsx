'use client'

import { addToast, Button, Form, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Este campo é obrigatório.' })
    .email({ message: 'Insira um endereço de e-mail válido.' }),
  password: z
    .string({ required_error: 'Este campo é obrigatório.' })
    .min(8, { message: 'Deve ter pelo menos 8 caracteres.' })
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.',
    }),
})

type ILoginForm = z.infer<typeof loginSchema>

export function FormLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit({ email, password }: ILoginForm) {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    const callbackUrl = searchParams.get('callbackUrl')

    if (res?.ok) {
      return router.replace(callbackUrl || '/')
    }

    addToast({
      title: 'Erro de autenticação',
      description: 'Email ou senha incorretos. Por favor, tente novamente.',
    })
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      className="mx-auto w-full max-w-md space-y-6"
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Email"
            type="email"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Senha"
            type="password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        color="primary"
        className="w-full"
      >
        {isSubmitting && <LoaderCircle size={18} className="animate-spin" />}
        Login
      </Button>
    </Form>
  )
}
