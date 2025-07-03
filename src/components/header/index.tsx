'use client'

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'

export function Header() {
  const { data: session } = useSession()
  const { setTheme } = useTheme()

  return (
    <header className="bg-background border-divider fixed top-0 z-10 flex h-20 w-full items-center border-b px-8">
      <div className="z-40 mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-semibold">TASKS</span>
        </Link>

        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2 text-center">
                <p className="text-xl font-medium">{session?.user.name}</p>
                <p className="font-medium">{session?.user.email}</p>
              </DropdownItem>

              <DropdownItem
                key="light"
                color="default"
                onClick={() => setTheme('light')}
              >
                Claro
              </DropdownItem>

              <DropdownItem
                key="dark"
                color="default"
                showDivider
                onClick={() => setTheme('dark')}
              >
                Escuro
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
