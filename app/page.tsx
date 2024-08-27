"use client"

import React, { useEffect } from "react"

import { useAtom } from "jotai"
import {
  favoritesAtom,
  mediaListAtom,
  sidebarVisibleAtom,
  userRatingsAtom,
} from "../store/store"

import { Segment } from "semantic-ui-react"
import MediaList from "./components/MediaList"
import SidebarToggler from "./components/SidebarToggler"
import PageDimmer from "./components/Dimmer"

import { MediaDetails } from "../models/MediaDetails"
import Search from "./Components/Search"
import MediaModal from "./Components/Modal"
import UserSidebar from "./components/UserSidebar"
import { useUser } from "@clerk/nextjs"

const HomePage = () => {
  const [mediaList] = useAtom<MediaDetails[]>(mediaListAtom)
  const { user } = useUser()

  const [, setFavorites] = useAtom(favoritesAtom)
  const [, setRatings] = useAtom(userRatingsAtom)
  const [, setSidebarVisible] = useAtom(sidebarVisibleAtom)

  useEffect(() => {
    if (!user) {
      setFavorites([])
      setRatings([])
      setSidebarVisible(false)
    }
  }, [user, setFavorites, setRatings, setSidebarVisible])

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
