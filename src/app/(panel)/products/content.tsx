'use client'

import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ScrollShadow,
  Skeleton,
} from '@heroui/react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import Link from 'next/link'

import { useGetProducts } from '@/hooks/query/products/get'

export function Content() {
  const {
    data: products,
    isFetching,
  } = useGetProducts({
    page: 1,
    pageSize: 10,
  })

  return (
    <>
      <Breadcrumbs variant="solid">
        <BreadcrumbItem href="/">Painel</BreadcrumbItem>
        <BreadcrumbItem href="/products">Produtos</BreadcrumbItem>
      </Breadcrumbs>

      <div className="ml-auto">
        <Link href="/products/create">
          <Button>Adicionar Produto</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {products?.data.length === 0 && (
          <p className="text-2xl">
            Nenhum{' '}
            <span className="text-muted-foreground font-semibold">Produto</span>{' '}
            encontrado!
          </p>
        )}

        {isFetching &&
          products?.data.map(({ id }) => {
            return <Skeleton key={id} className="rounded-medium h-96 w-full" />
          })}

        {products &&
          !isFetching &&
          products.data.map(({ title, description }, index) => (
            <Card key={index}>
              <CardHeader className="flex justify-between">
                <span className="text-large font-medium">{title}</span>

                <Dropdown>
                  <DropdownTrigger className="hover:cursor-pointer">
                    <div className="p-2">
                      <MoreHorizontal className="h-4 w-4" />
                    </div>
                  </DropdownTrigger>

                  <DropdownMenu aria-label="Ações do Produto" variant="flat">
                    <DropdownItem
                      key="edit"
                      className="text-sm"
                      startContent={
                        <Edit className="text-default-500 h-4 w-4" />
                      }
                    >
                      Editar
                    </DropdownItem>
                    <DropdownItem
                      key="remove"
                      className="text-danger text-sm"
                      startContent={<Trash className="h-4 w-4" />}
                    >
                      Excluir
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardHeader>
              <CardBody className="flex flex-col gap-2 p-2">
                <ScrollShadow className="text-small text-primary-foreground h-64 text-start font-normal">
                  {description}
                </ScrollShadow>
              </CardBody>
            </Card>
          ))}
      </div>
    </>
  )
}
