"use client"

import React from "react"

import { useAtom } from "jotai"
import { mediaListAtom } from "../store/store"

import { Segment } from "semantic-ui-react"
import MediaList from "./components/MediaList"
import SidebarToggler from "./components/SidebarToggler"
import PageDimmer from "./components/Dimmer"

import { MediaDetails } from "../models/MediaDetails"
import Search from "./Components/Search"
import MediaModal from "./Components/Modal"
import UserSidebar from "./components/UserSidebar"

const HomePage = () => {
  const [mediaList] = useAtom<MediaDetails[]>(mediaListAtom)

  return (
    <>
      <UserSidebar />
      <Segment basic>
        <Search />
      </Segment>
      {mediaList && (
        <Segment basic>
          <MediaList />
        </Segment>
      )}
      <MediaModal />
      <Segment basic>
        <SidebarToggler />
      </Segment>
      <PageDimmer />
    </>
  )
}

export default HomePage
