'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User, Grid, PlusSquare, Settings, LogOut } from 'lucide-react'
import { SignOutButton } from './auth/buttons'

export function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-blue-500 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Copernic Spacemart
          </Link>
          <div className="hidden md:flex space-x-2">
            <NavLink href="/payload/children">Your assets</NavLink>
            <NavLink href="/account/create">Profile</NavLink>
            <NavLink href="/collections">Collections</NavLink>
            <UserMenu />
          </div>
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-2">
              <NavLink href="/payload/children">Your assets</NavLink>
              <NavLink href="/account/create">Profile</NavLink>
              <NavLink href="/collections">Collections</NavLink>
              <UserMenu />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="block px-4 py-2 text-blue-600 bg-white border-2 border-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200"
    >
      {children}
    </Link>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="text-blue-600 border-blue-600 hover:bg-blue-50">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <Link href="">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="">
            <Grid className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="payload/create">
            <PlusSquare className="mr-2 h-4 w-4" />
            <span>New Child Asset</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="collections/create">
            <Settings className="mr-2 h-4 w-4" />
            <span>Create Colection</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}