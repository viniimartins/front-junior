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
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const productSchema = z.object({
  name: z.string({ required_error: 'Este campo é obrigatório.' }),
  description: z.string({ required_error: 'Este campo é obrigatório.' }),
})

type IProductForm = z.infer<typeof productSchema>

interface Props {
  isEditing: boolean
}

export function Content({ isEditing }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProductForm>({
    resolver: zodResolver(productSchema),
  })

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
  }

  async function onSubmit({ name, description }: IProductForm) {
    console.log(name, description)
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
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}
