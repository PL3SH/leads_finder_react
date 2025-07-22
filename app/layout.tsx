import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SpeedlyLab - Business Lead Generation Dashboard",
  description: "Find and analyze business leads with advanced scoring and insights",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-main font-sans">
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-main">{children}</main>
        </div>
      </body>
    </html>
  )
}
