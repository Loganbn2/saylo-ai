import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Simula Ads Demo",
  description: "Created with v0",
  generator: "v0.app",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-4IBtIEbfqo88iVt2SwqXksWZ7nDTsp.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-[#0a0613]`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
