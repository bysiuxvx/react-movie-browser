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
import { SignedIn } from "@clerk/nextjs"

const HomePage = () => {
  const [mediaList] = useAtom<MediaDetails[]>(mediaListAtom)

  return (
    <>
      <UserSidebar />
      <Segment basic className="app-container">
        <Search />
      </Segment>
      {mediaList ? (
        <Segment basic className="app-container">
          <MediaList />
        </Segment>
      ) : null}
      <MediaModal />
      <SignedIn>
        <Segment basic>
          <SidebarToggler />
        </Segment>
      </SignedIn>
      <PageDimmer />
    </>
  )
}

export default HomePage
