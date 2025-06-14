import { Poppins, Inter } from 'next/font/google'
import { Metadata } from 'next'
import { Providers } from '@/components/Providers'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Lumo | Digital Banking for Africa",
  description: "Digital Banking for Africa - Seamless mobile money services, multi-currency support, and secure international payments",
  keywords: "digital banking, mobile money, Africa, currency exchange, international payments",
  openGraph: {
    title: "Lumo | Digital Banking for Africa",
    description: "Digital Banking for Africa - Seamless mobile money services, multi-currency support, and secure international payments",
    siteName: "Lumo",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-lumo-cream font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
