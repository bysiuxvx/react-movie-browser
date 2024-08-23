import type { Metadata } from "next"
import React from "react"

import "../style/style.scss"
import "semantic-ui-css/semantic.min.css"
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "Movie Browser",
  description: "Web site created with Next.js.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
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
