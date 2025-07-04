'use client'

import { Button, Form, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateUser } from '@/modules/users/mutations/create'

const createAccountSchema = z
  .object({
    name: z
      .string({ required_error: 'Este campo é obrigatório' })
      .min(8, { message: 'Deve ter pelo menos 8 caracteres.' }),
    email: z
      .string({ required_error: 'Este campo é obrigatório.' })
      .email({ message: 'Insira um endereço de e-mail válido.' }),
    password: z
      .string({ required_error: 'Este campo é obrigatório' })
      .min(8, { message: 'Deve ter pelo menos 8 caracteres.' })
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.',
      }),
    verifyPassword: z
      .string({ required_error: 'Este campo é obrigatório' })
      .min(8, { message: 'Deve ter pelo menos 8 caracteres.' }),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirm_password'],
  })

type ICreateAccountForm = z.infer<typeof createAccountSchema>

export function FormCreateAccount() {
  const router = useRouter()

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ICreateAccountForm>({
    resolver: zodResolver(createAccountSchema),
  })

  const { mutate: handleCreateUser } = useCreateUser()

  async function onSubmit({
    email,
    name,
    verifyPassword,
    password,
  }: ICreateAccountForm) {
    const payload = { email, name, verifyPassword, password }

    handleCreateUser(
      { user: payload },
      {
        onSuccess: () => {
          router.push(`/login`)
        },
      },
    )
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      className="mx-auto w-full max-w-md space-y-6"
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Nome"
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />
        )}
      />

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

      <Controller
        name="verifyPassword"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Confirmar Senha"
            type="password"
            isInvalid={!!errors.verifyPassword}
            errorMessage={errors.verifyPassword?.message}
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
        Registrar
      </Button>
    </Form>
  )
}
