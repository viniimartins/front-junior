'use client'

import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Form,
  Input,
  Textarea,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateProduct } from '@/hooks/mutations/product/create'
import { useUpdateProduct } from '@/hooks/mutations/product/update'
import type { IProduct } from '@/hooks/query/products/types'

const baseProductSchema = z.object({
  title: z.string({ required_error: 'Este campo é obrigatório.' }),
  description: z.string({ required_error: 'Este campo é obrigatório.' }),
})

const formProductSchema = baseProductSchema.extend({
  file: z.custom<File>(
    (v) => v instanceof File && v.size > 0,
    'Este campo é obrigatório.',
  ),
})

const formEditProductSchema = baseProductSchema.extend({
  file: z
    .custom<File>(
      (v) => v === undefined || (v instanceof File && v.size > 0),
      'Este campo deve ser um arquivo válido ou pode ser omitido.',
    )
    .optional(),
})

type CreateProductForm = z.infer<typeof formProductSchema>
type EditProductForm = z.infer<typeof formEditProductSchema>

type IProductForm = CreateProductForm | EditProductForm

interface Props {
  isEditing: boolean
  data: IProduct | null
}

export function Content({ isEditing, data }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const {
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IProductForm>({
    resolver: zodResolver(
      isEditing ? formEditProductSchema : formProductSchema,
    ),
  })

  const { mutate: handleCreateProduct } = useCreateProduct()

  const { mutate: handleEditProduct } = useUpdateProduct()

  function handleUploadClick() {
    fileInputRef.current?.click()
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    setValue('file', file, { shouldValidate: true })
  }

  async function onSubmit({ title, description, file }: IProductForm) {
    const payload = { title, description, thumbnail: file ?? null }

    if (!isEditing && file) {
      handleCreateProduct(
        { product: payload },
        {
          onSuccess() {
            router.push('/products')
          },
        },
      )
    }

    if (isEditing && data) {
      handleEditProduct(
        {
          id: data?.id,
          product: payload,
        },
        {
          onSuccess() {
            router.push('/products')
          },
        },
      )
    }
  }

  useEffect(() => {
    if (isEditing && data) {
      reset({
        title: data.title,
        description: data.description,
      })

      setImagePreview(data.thumbnail.url as string)
    }
  }, [isEditing, data, reset])

  return (
    <>
      <Breadcrumbs variant="solid">
        <BreadcrumbItem href="/">Painel</BreadcrumbItem>
        <BreadcrumbItem href="/products">Produtos</BreadcrumbItem>
        <BreadcrumbItem>
          {isEditing ? 'Editar Produto' : 'Adicionar Produto'}
        </BreadcrumbItem>
      </Breadcrumbs>

      <div className="grid flex-1 items-start gap-4">
        <div className="grid flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <h1 className="flex-1 shrink-0 text-xl font-semibold tracking-tight whitespace-nowrap sm:grow-0">
              {isEditing ? 'Editar Produto' : 'Adicionar Produto'}
            </h1>

            <div className="ml-auto flex items-center justify-center gap-2">
              <Button color="danger">Descartar</Button>
              <Button type="submit" form="product-form" color="primary">
                {isEditing ? 'Editar' : 'Salvar'} Produto
                {isSubmitting && (
                  <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </div>
          </div>

          <Card>
            <CardBody>
              <Form
                id="product-form"
                onSubmit={handleSubmit(onSubmit)}
                onReset={() => reset()}
                className="grid w-full grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Nome"
                        isInvalid={!!errors.title}
                        errorMessage={errors.title?.message}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        label="Descrição"
                        placeholder="Enter your description"
                        minRows={10}
                        isInvalid={!!errors.description}
                        errorMessage={errors.description?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col justify-center gap-2">
                  <div
                    onClick={handleUploadClick}
                    className="bg-default-100 rounded-medium relative flex aspect-square h-[17rem] w-full cursor-pointer px-3 py-2 transition-colors hover:opacity-80"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col">
                        <span className="text-default-600 text-small text-left">
                          Imagem do Produto
                        </span>

                        <div className="flex flex-grow items-center justify-center">
                          <Upload className="text-muted-foreground h-5 w-5" />
                        </div>
                      </div>
                    )}
                    <span className="sr-only">Upload</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                  {errors.file && (
                    <span className="text-danger text-sm">
                      {errors.file.message}
                    </span>
                  )}
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}
