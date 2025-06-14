"use client"

import { useSession } from "next-auth/react"
import { Navigation } from "@/components/Navigation"
import { MultiCurrencyBalance } from "@/components/MultiCurrencyBalance"
import { QuickActions } from "@/components/QuickActions"
import { TransactionList } from "@/components/TransactionList"
import { Hero } from "@/components/Hero"

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <main>
        <Navigation />
        <Hero />
      </main>
    )
  }

  return (
    <main>
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back, {session.user?.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your money, mobile payments, and virtual cards all in one place
            </p>
          </div>

          <div className="grid gap-8">
            <MultiCurrencyBalance />
            <QuickActions />
            <TransactionList />
          </div>
        </div>
      </div>
    </main>
  )
}
