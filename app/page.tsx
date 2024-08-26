"use client"

import React from "react"

import { useAtom } from "jotai"
import { mediaListAtom } from "../store/store"
import { useFavorites } from "./utils/favorites-actions"

import FavoritesSidebar from "./components/FavoritesSidebar"

import { Segment } from "semantic-ui-react"
import MediaList from "./components/MediaList"
import SidebarToggler from "./components/SidebarToggler"
import PageDimmer from "./components/Dimmer"

import { MediaDetails } from "../models/MediaDetails"
import Search from "./Components/Search"
import MediaModal from "./Components/Modal"

const HomePage = () => {
  const [mediaList] = useAtom<MediaDetails[]>(mediaListAtom)

  const { favorites, isLoading, isError } = useFavorites()

  return (
    <>
      <FavoritesSidebar />
      <Segment basic className="app-container">
        <Search />
      </Segment>
      {mediaList ? (
        <Segment basic className="app-container">
          <MediaList />
        </Segment>
      ) : null}
      <MediaModal />
      {favorites?.length ? (
        <Segment basic>
          <SidebarToggler />
        </Segment>
      ) : null}
      <PageDimmer />
    </>
  )
}

export default HomePage
