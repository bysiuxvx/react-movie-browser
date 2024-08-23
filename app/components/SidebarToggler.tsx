"use client"

import React from "react"

import useStore from "../../store/store"

import { Button } from "semantic-ui-react"

const SidebarToggler = () => {
  const sidebarVidisble = useStore((state) => state.sidebarVisible)
  const setSidebarVisible = useStore((state) => state.setSidebarVisible)

  if (sidebarVidisble) {
    return (
      <Button
        color="grey"
        className="sidebar-toggle"
        onClick={() => setSidebarVisible(false)}
      >
        Hide favorites
      </Button>
    )
  } else
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
