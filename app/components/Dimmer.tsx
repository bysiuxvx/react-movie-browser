"use client"

import React from "react"

import useStore from "../../store/store"
import { Dimmer } from "semantic-ui-react"

const PageDimmer = () => {
  const sidebarVidisble = useStore((state) => state.sidebarVisible)
  const setSidebarVisible = useStore((state) => state.setSidebarVisible)

  return (
    <Dimmer
      active={sidebarVidisble}
      onClickOutside={() => setSidebarVisible(!sidebarVidisble)}
      page
    />
  )
}
export default PageDimmer
