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
import { Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateProduct } from '@/hooks/mutations/product/create'

const productSchema = z.object({
  title: z.string({ required_error: 'Este campo é obrigatório.' }),
  description: z.string({ required_error: 'Este campo é obrigatório.' }),
  file: z.custom<File>(
    (v) => v instanceof File && v.size > 0,
    'Este campo é obrigatório.',
  ),
})

type IProductForm = z.infer<typeof productSchema>

interface Props {
  isEditing: boolean
}

export function Content({ isEditing }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const {
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IProductForm>({
    resolver: zodResolver(productSchema),
  })

  const { mutate: handleCreateProduct } = useCreateProduct()

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
    const payload = { title, description, thumbnail: file }

    handleCreateProduct(
      { product: payload },
      {
        onSuccess() {
          router.push('/products')
        },
      },
    )
  }

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
              Adicionar Produto
            </h1>

            <div className="ml-auto flex items-center justify-center gap-2">
              <Button color="danger">Descartar</Button>
              <Button type="submit" form="product-form" color="primary">
                Salvar Produto
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
                        {...field}
                        label="Nome"
                        isInvalid={!!errors.title}
                        errorMessage={errors.title?.message}
                      />
                    )}
                  />

                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Descrição"
                        placeholder="Enter your description"
                        minRows={10}
                        isInvalid={!!errors.description}
                        errorMessage={errors.description?.message}
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
