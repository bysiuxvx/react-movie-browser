"use client"

import React from "react"
import { Segment } from "semantic-ui-react"

import FavoritesSidebar from "./components/FavoritesSidebar"
import Search from "./components/Search"

import MediaList from "./components/MediaList"
import MediaModal from "./components/Modal"
import SidebarToggler from "./components/SidebarToggler"
import PageDimmer from "./components/Dimmer"

import { mediaListAtom } from "../store/store"

import { useAtom } from "jotai"
import { MediaDetails } from "../models/MediaDetails"
import { useFavorites } from "./utils/favorites-actions"

const HomePage = () => {
  const [mediaList] = useAtom<MediaDetails[]>(mediaListAtom)

  const { favorites, isLoading, isError } = useFavorites()

  return (
    <div className="App">
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
    </div>
  )
}

export default HomePage
