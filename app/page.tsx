"use client"

import React, { useEffect } from "react"

import { useAtom } from "jotai"
import {
  favoritesAtom,
  mediaListAtom,
  sidebarVisibleAtom,
  userRatingsAtom,
} from "../store/store"

import { MediaDetails } from "../models/MediaDetails"
import { useUser } from "@clerk/nextjs"

import UserSidebar from "./components/UserSidebar"
import MediaList from "./components/MediaList"
import SidebarToggler from "./components/SidebarToggler"
import PageDimmer from "./components/Dimmer"
import Search from "./components/Search"
import MediaModal from "./components/Modal"

import { Segment } from "semantic-ui-react"

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
