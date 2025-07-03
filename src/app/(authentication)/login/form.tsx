'use client'

import { useForm, Controller } from 'react-hook-form'
import { Form, Input, Button } from '@heroui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginSchema),
  })

  function onSubmit(data: ILoginForm) {
    console.log(data)
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      className="w-full max-w-md mx-auto space-y-6"
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Email"
            labelPlacement="outside"
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
            labelPlacement="outside"
            type="password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />
        )}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </Button>
    </Form>
  )
}
