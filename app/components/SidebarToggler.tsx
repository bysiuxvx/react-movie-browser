"use client"

import { useAtom } from "jotai"
import React from "react"

import { Button } from "semantic-ui-react"
import { sidebarVisibleAtom } from "../../store/store"

const SidebarToggler = () => {
  const [, setSidebarVisible] = useAtom(sidebarVisibleAtom)

  return (
    <>
      <Button
        color="grey"
        className="sidebar-toggle"
        onClick={() => setSidebarVisible(true)}
      >
        Show favorites
      </Button>
      <Button
        icon
        color="grey"
        className="sidebar-toggle-sm"
        onClick={() => setSidebarVisible(true)}
      >
        <i className="star icon yellow"></i>
      </Button>
    </>
  )
}

export default SidebarToggler
