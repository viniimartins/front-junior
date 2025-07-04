'use client'

import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
} from '@heroui/react'
import Link from 'next/link'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export function Content() {
  const productData = [
    { name: 'iPhone 14 Pro', quantity: 120 },
    { name: 'Samsung Galaxy S23', quantity: 85 },
    { name: 'PlayStation 5', quantity: 150 },
    { name: 'Notebook Dell XPS', quantity: 70 },
    { name: 'AirPods Pro', quantity: 200 },
  ]

  return (
    <>
      <Breadcrumbs variant="solid">
        <BreadcrumbItem href="/">Painel</BreadcrumbItem>
      </Breadcrumbs>

      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Quantidade de estoque</h2>
          <Link href="/products">
            <Button color="primary">Acessar meus Produtos</Button>
          </Link>
        </CardHeader>
        <CardBody className="space-y-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={productData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e4e4e7',
                }}
                labelClassName="text-[hsl(var(--heroui-primary))] font-semibold"
              />
              <Bar dataKey="quantity" fill="hsl(var(--heroui-primary))" />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-center">
            <span className="text-2xl font-medium">20 Produtos cadastros</span>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
