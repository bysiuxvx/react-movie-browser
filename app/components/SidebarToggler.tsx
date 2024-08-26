"use client"

import { useAtom } from "jotai"
import React from "react"

import { Button, Icon } from "semantic-ui-react"
import { sidebarVisibleAtom } from "../../store/store"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

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
        <Button
          icon
          color="grey"
          className="sidebar-toggle-sm"
          onClick={() => setSidebarVisible(true)}
        >
          <i className="star icon yellow"></i>
        </Button>
      </SignedIn>
      <SignedOut>
        <button className="sidebar-toggle">
          <SignInButton />
        </button>
      </SignedOut>
    </>
  )
}

export default SidebarToggler
