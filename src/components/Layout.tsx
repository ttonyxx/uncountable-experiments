import { FC, PropsWithChildren } from "react"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const RootLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>{children}</main>
  )
}

export default RootLayout