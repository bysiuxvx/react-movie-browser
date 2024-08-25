import type { Metadata } from "next"
import React from "react"

import "semantic-ui-css/semantic.min.css"
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs"
import { Toaster, ToasterProps } from "react-hot-toast"

import "../style/style.scss"

export const metadata: Metadata = {
  title: "Movie and series browser",
  description: "Web site created with Next.js.",
  authors: {
    name: "Patryk Byszek",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const toasterProps: ToasterProps = {
    position: "top-right",
    reverseOrder: false,
    toastOptions: {
      duration: 3500,
    },
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div>
            <Toaster {...toasterProps} />
          </div>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </header>
          <SignedIn>
            <UserButton />
            <main>{children}</main>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  )
}
