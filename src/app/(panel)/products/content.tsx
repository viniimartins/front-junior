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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Skeleton,
} from '@heroui/react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import Link from 'next/link'

import { useDeleteProduct } from '@/hooks/mutations/product/delete'
import { useGetProducts } from '@/hooks/query/products/get'
import type { IProduct } from '@/hooks/query/products/types'
import { useModal } from '@/hooks/use-modal'

export function Content() {
  const { actions, isOpen, target } = useModal<IProduct>()

  const {
    data: products,
    isFetching,
    queryKey,
  } = useGetProducts({
    page: 1,
    pageSize: 10,
  })

  const { mutate: deleteProduct } = useDeleteProduct({ queryKey })

  const handleDeleteTask = (id: string) => {
    deleteProduct({ id })

    actions.close()
  }

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
          products.data.map((product, index) => {
            const { title, description, id } = product

            return (
              <Card key={index}>
                <CardHeader className="flex justify-between p-2">
                  <span className="text-large truncate font-medium">
                    {title}
                  </span>

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
                        href={`/products/${id}/edit`}
                        startContent={
                          <Edit className="text-default-500 h-4 w-4" />
                        }
                      >
                        Editar
                      </DropdownItem>
                      <DropdownItem
                        key="remove"
                        className="text-danger text-sm"
                        onClick={() => actions.open(product)}
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
            )
          })}
      </div>

      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
        isOpen={isOpen}
        onOpenChange={actions.close}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Exlcuir Produto
              </ModalHeader>
              <ModalBody>
                <p>
                  Tem certeza que deseja excluir este produto? Essa ação não
                  poderá ser desfeita.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Sair
                </Button>
                <Button
                  color="primary"
                  onClick={() => target && handleDeleteTask(target.id)}
                >
                  Excluir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
