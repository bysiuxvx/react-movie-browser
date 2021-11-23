import React from "react"

import useStore from "../Store/store"

import { Button } from "semantic-ui-react"

const SidebarToggler = () => {
  const sidebarVidisble = useStore((state) => state.sidebarVisible)
  const setSidebarVisible = useStore((state) => state.setSidebarVisible)

  if (sidebarVidisble) {
    return (
      <Button
        inverted
        color="grey"
        className="sidebar-toggle"
        onClick={() => setSidebarVisible(false)}
      >
        Hide favorites
      </Button>
    )
  } else
    return (
      <Button
        inverted
        color="grey"
        className="sidebar-toggle"
        onClick={() => setSidebarVisible(true)}
      >
        Show favorites
      </Button>
    )
}

export default SidebarToggler
