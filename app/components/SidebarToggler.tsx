"use client"

import { useAtom } from "jotai"
import React from "react"

import { Button, Icon } from "semantic-ui-react"
import { sidebarVisibleAtom } from "../../store/store"

import CustomSignInButton from "./CustomSignIn"

import { SignedIn, SignedOut } from "@clerk/nextjs"

const SidebarToggler = () => {
  const [, setSidebarVisible] = useAtom(sidebarVisibleAtom)

  return (
    <>
      <SignedIn>
        <Button
          color="grey"
          className="sidebar-toggle"
          onClick={() => setSidebarVisible(true)}
        >
          <Icon size="large" name="bars"></Icon>
        </Button>
      </SignedIn>
      <SignedOut>
        <CustomSignInButton />
      </SignedOut>
    </>
  )
}

export default SidebarToggler
