"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Mobile Money", href: "/mobile" },
  { name: "Currency", href: "/convert" },
  { name: "Virtual Cards", href: "/cards" },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/login")
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-lumo-navy shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-lumo-cream/80 hover:bg-lumo-midnight hover:text-lumo-cream"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-lumo-orange rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl font-serif">L</span>
                </div>
                <span className="text-xl font-bold text-white font-serif">lumo</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium",
                    pathname === item.href
                      ? "border-b-2 border-lumo-orange text-white"
                      : "text-lumo-cream/80 hover:border-b-2 hover:border-lumo-teal hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {status === "authenticated" ? (
              <>
                <button
                  type="button"
                  className="rounded-full bg-lumo-midnight/50 p-2 text-lumo-cream/80 hover:text-white"
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <div className="ml-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex rounded-full bg-lumo-midnight/50 text-sm focus:outline-none">
                      <div className="h-8 w-8 rounded-full bg-lumo-teal flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {session.user?.name?.[0]?.toUpperCase() || "U"}
                        </span>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-lumo-navy border-lumo-midnight">
                      <div className="px-4 py-3">
                        <p className="text-sm text-lumo-cream/80">Signed in as</p>
                        <p className="truncate text-sm font-medium text-white">
                          {session.user?.email}
                        </p>
                      </div>
                      <DropdownMenuSeparator className="bg-lumo-midnight" />
                      <DropdownMenuItem onClick={() => router.push("/profile")} className="text-lumo-cream/80 hover:text-white hover:bg-lumo-midnight">
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push("/settings")} className="text-lumo-cream/80 hover:text-white hover:bg-lumo-midnight">
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-lumo-midnight" />
                      <DropdownMenuItem onClick={handleSignOut} className="text-lumo-cream/80 hover:text-white hover:bg-lumo-midnight">
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-lumo-cream/80 hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-lumo-orange px-4 py-2 text-sm font-medium text-white hover:bg-lumo-yellow hover:text-lumo-navy transition-all"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden bg-lumo-midnight`}>
        <div className="space-y-1 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block px-3 py-2 text-base font-medium",
                pathname === item.href
                  ? "bg-lumo-navy border-l-4 border-lumo-orange text-white"
                  : "text-lumo-cream/80 hover:bg-lumo-navy hover:text-white"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {status === "authenticated" ? (
          <div className="border-t border-lumo-navy pb-3 pt-4">
            <div className="flex items-center px-4">
              <div className="h-8 w-8 rounded-full bg-lumo-teal flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {session.user?.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-lumo-cream/80">{session.user?.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                href="/profile"
                className="block px-4 py-2 text-base font-medium text-lumo-cream/80 hover:bg-lumo-navy hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-base font-medium text-lumo-cream/80 hover:bg-lumo-navy hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleSignOut()
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-lumo-cream/80 hover:bg-lumo-navy hover:text-white"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-lumo-navy pb-3 pt-4 space-y-1">
            <Link
              href="/login"
              className="block px-4 py-2 text-base font-medium text-lumo-cream/80 hover:bg-lumo-navy hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="block px-4 py-2 text-base font-medium text-lumo-orange hover:text-lumo-yellow"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
