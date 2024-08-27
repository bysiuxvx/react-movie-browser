"use client"

import React from "react"

import { Dimmer } from "semantic-ui-react"
import { sidebarVisibleAtom } from "../../store/store"
import { useAtom } from "jotai"

const PageDimmer = () => {
  const [sidebarVidisble, setSidebarVisible] = useAtom(sidebarVisibleAtom)

  return (
    <Dimmer
      active={sidebarVidisble}
      onClickOutside={() => setSidebarVisible(!sidebarVidisble)}
      page
    />
  )
}
export default PageDimmer
